/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase';
import SkeletonLoader from "../reuseable/skelenton";
import  { MessageAlert } from "../alert";


const AttendanceTable = () => {
  const [loading, setLoading] = useState(true); 
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState({}); 
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading to true while fetching data
      const usersRef = collection(firestore, 'users');
      const usersSnapshot = await getDocs(usersRef);
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
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    // Optimistically update the state
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
      // Save the attendance status in Firestore
      await setDoc(doc(firestore, 'attendance', `${childName}_${date}`), {
        childName,
        status,
        date,
      });
       setSuccessMessage( `Attendance marked as ${status} for ${childName}`)
      console.log(`Attendance marked as ${status} for child ${childName} on ${date}`);
    } catch (error) {
      console.error('Error updating attendance:', error);

      // If Firestore fails, revert the optimistically updated status
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
    <div>


    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          List of Children
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          See All
        </button>
      </div>

      {loading ? (
        // Show skeleton loaders while data is loading
        <SkeletonLoader height={40} count={5} />
      ) : users.length > 0 ? (
        <TableContainer component={''}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="dark:text-neutral-100">Child Name</TableCell>
                <TableCell className="dark:text-neutral-100" align="center">Mark Present</TableCell>
                <TableCell className="dark:text-neutral-100" align="center">Mark Absent</TableCell>
                <TableCell className="dark:text-neutral-100" align="center"> Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                user.children ? (
                  user.children.map((child, childIndex) => (
                    <TableRow key={`${index}-${childIndex}`}>
                      <TableCell className="dark:text-neutral-100">{child.name}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="primary"
                          onClick={() => handleAttendanceChange(user.uid, child.name, 'present')}
                        >
                          Mark Present
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="secondary"
                          onClick={() => handleAttendanceChange(user.uid, child.name, 'absent')}
                        >
                          Mark Absent
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <span style={{ color: statusColor(child.status) }}>
                          {child.status || "Not Marked"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key={index}>
                    <TableCell colSpan={4}>
                      No children data available.
                    </TableCell>
                  </TableRow>
                )
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No users data available.</p>
      )}
           <MessageAlert
        open={!!successMessage}
        message={successMessage}
        onClose={() => setSuccessMessage("")}
      />
    </div>
    </div>
  );
};

export default AttendanceTable;