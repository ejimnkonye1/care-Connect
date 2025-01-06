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
import { useDispatch, useSelector} from 'react-redux';
import {  setAlert, setMark } from '../action';
import {  collection, getDocs, setDoc, doc } from 'firebase/firestore';
import {  firestore } from '../firebase';
const AttendanceTable = () => {

    const [showToast, setShowToast] = useState(false);
   const [users, setUsers] = useState([]);
     const [attendance, setAttendance] = useState({}); 
     useEffect(() => {
      const fetchUsers = async () => {
        const usersRef = collection(firestore, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const usersData = usersSnapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
      };
  
      fetchUsers();
    }, [firestore, users]);
  
    const handleAttendanceChange = async (userId, childName, status) => {
      const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      await setDoc(doc(firestore, 'attendance', `${childName}_${date}`), {
        childName,
        status,
        date,
        userId: users // pass users here
      });
    //  dispatch(setMark(!true))
    //  dispatch(setAlert(!alertmode))
      console.log(`Attendance marked as ${status} for child ${childName} on ${date}`);
      setAttendance((prev) => ({ ...prev, [childName]: status }));
      setShowToast(true);
      
      // Hide the toast after a delay (adjust as needed)
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
  
      
     
    };
  const statusColor = (status) => {
    switch (status) {
      case "Present":
        return "green";
      case "Absent":
        return "Red";
      default:
        return "gray";
    }
  };

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          List of children
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          See All
        </button>
      </div>
      {users.length > 0 ? (
 <TableContainer component={''}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Child Name</TableCell>
            <TableCell className="dark:text-neutral-100" align="center">Mark Present</TableCell>
            <TableCell  className="dark:text-neutral-100" align="center">Mark Absent</TableCell>
            <TableCell  className="dark:text-neutral-100" align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {users.map((user, index) => (
          user.children ? (
            user.children.map((child, childIndex) => (
              <TableRow key={`${index}-${childIndex}`}>
              <TableCell  className="dark:text-neutral-100">{child.name}</TableCell>
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
              <TableCell  align="center"> <span 
                    style={{
                      color: statusColor(child.status),
                   
                      
                    }}>
                {child.status}
              </span>
                
</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow key={index}>
            <TableCell colSpan={4} className=''>
              No children data available.
            </TableCell>
          </TableRow>
        )
      ))}
        </TableBody>
      </Table>
    </TableContainer>
    ) : (
      <p className=''>No users data available.</p>
    )}
    </div>
   
  );
};

export default AttendanceTable;
