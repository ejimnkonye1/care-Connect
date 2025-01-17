/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Hidden,
} from "@mui/material";
import { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase';
import SkeletonLoader from "../reuseable/skelenton";
import  { MessageAlert } from "../alert";
import { format } from 'date-fns';

const AttendanceTable = () => {
  const [loading, setLoading] = useState(true); 
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState({}); 
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading to true while fetching data
      const usersRef = collection(firestore, 'users');
      console.time('Fetch users');
      const usersSnapshot = await getDocs(usersRef);
      console.timeEnd('Fetch users');

      const usersData = usersSnapshot.docs.map((doc) => doc.data());

      // Fetch attendance data for each child
      const attendanceRef = collection(firestore, 'attendance');
      const attendanceSnapshot = await getDocs(attendanceRef);
      const attendanceData = attendanceSnapshot.docs.reduce((acc, doc) => {
        const data = doc.data();
        acc[`${data.childName}_${data.date}`] = data.status; // Use date and child name as unique identifier
        return acc;
      }, {});

      // Update users' children with the attendance data
      const usersWithAttendance = usersData.map((user) => ({
        ...user,
        children: user.children.map((child) => ({
          ...child,
          status: attendanceData[`${child.name}_${new Date().toISOString().split('T')[0]}`] || undefined,
        })),
      }));

      setUsers(usersWithAttendance);
      setLoading(false); // Set loading to false after fetching data
    };

    fetchUsers();
  }, [firestore]);



  const handleAttendanceChange = async (userId, childName, status) => {
    const date = format(new Date(), 'yyyy-MM-dd'); // Get the current local date in YYYY-MM-DD format
  
    // Optimistic UI update
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.uid === userId
          ? {
              ...user,
              children: user.children.map((child) =>
                child.name === childName ? { ...child, status } : child
              ),
            }
          : user
      )
    );
  
    try {
      // Save attendance to Firestore
      await setDoc(doc(firestore, 'attendance', `${childName}_${date}`), {
        childName,
        status,
        date,
      });
      setSuccessMessage(`Attendance marked as ${status} for ${childName}`);
      console.log(`Attendance marked as ${status} for ${childName} on ${date}`);
    } catch (error) {
      console.error('Error updating attendance:', error);
  
      // Revert optimistic UI update if Firestore save fails
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uid === userId
            ? {
                ...user,
                children: user.children.map((child) =>
                  child.name === childName ? { ...child, status: undefined } : child
                ),
              }
            : user
        )
      );
    }
  };
  

  const statusColor = (status) => {
    switch (status) {
      case "present":
        return "green";
      case "absent":
        return "red";
      default:
        return "gray";
    }
  };

  return (
   


    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 ">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Mark Attandance
        </h3>
      
      </div>

 
      

      <div className="scrollbar mx-auto mt-7 w-full overflow-x-auto">
   
      <Table className="w-[90%] text-left">
  {loading ? (
    <>
      <SkeletonLoader height={20} count={4} />
      <SkeletonLoader height={20} count={4} />
    </>
  ) : (
    <>
      <TableHead>
        <TableRow>
          <TableCell className="dark:text-neutral-100">Name</TableCell>
          <TableCell className="dark:text-neutral-100">Present</TableCell>
          <TableCell className="dark:text-neutral-100">Absent</TableCell>
       <Hidden smDown>

     
  <TableCell className="dark:text-neutral-100">
    Status
  </TableCell>
  </Hidden>


        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user, index) =>
          user.children ? (
            user.children.map((child, childIndex) => (
              <TableRow key={`${index}-${childIndex}`}>
                {/* Name + Status on small screens */}
                <TableCell className="dark:text-neutral-100 text-sm">
                  {child.name}
                  <span className="block lg:hidden text-xs" style={{ color: statusColor(child.status) }}>
                    {child.status || "Not Marked"}
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() =>
                      handleAttendanceChange(user.uid, child.name, "present")
                    }
                    className="text-sm px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                               sm:px-3 sm:py-2 md:text-base md:px-4 md:py-3 transition-all max-w-full"
                  >
                    Present
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() =>
                      handleAttendanceChange(user.uid, child.name, "absent")
                    }
                    className="text-sm px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 
                               sm:px-3 sm:py-2 md:text-base md:px-4 md:py-3 transition-all max-w-full"
                  >
                     Absent
                  </button>
                </TableCell>
                <Hidden smDown>
                <TableCell className="">
                  <span style={{ color: statusColor(child.status) }}>
                    {child.status || "Not Marked"}
                  </span>
                </TableCell>
                </Hidden>
              </TableRow>
            ))
          ) : (
            <TableRow key={index}>
              <TableCell colSpan={4}>No children data available.</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </>
  )}
</Table>



</div>


      
   
           <MessageAlert
        open={!!successMessage}
        message={successMessage}
        onClose={() => setSuccessMessage("")}
      />
    </div>
    
  );
};

export default AttendanceTable;