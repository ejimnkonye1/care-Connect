/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

import {  collection, getDocs, setDoc, doc } from 'firebase/firestore';
import {  firestore } from '../firebase';
import ColorAlerts from '../alert';
import { useDispatch, useSelector} from 'react-redux';
import {  setAlert, setMark } from '../action';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
export const MarkAttendance = () => {
  const [users, setUsers] = useState([]); // Store all users data
  // eslint-disable-next-line no-unused-vars
  const [attendance, setAttendance] = useState({}); // Store attendance data
  const [showToast, setShowToast] = useState(false);
  
  const dispatch = useDispatch();
  const alertmode = useSelector((state) => state.alertMode)
  
  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(firestore, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
    };

    fetchUsers();
  }, [firestore]);

  const handleAttendanceChange = async (userId, childName, status) => {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    await setDoc(doc(firestore, 'attendance', `${childName}_${date}`), {
      childName,
      status,
      date,
      userId: users // pass users here
    });
   dispatch(setMark(!true))
   dispatch(setAlert(!alertmode))
    console.log(`Attendance marked as ${status} for child ${childName} on ${date}`);
    setAttendance((prev) => ({ ...prev, [childName]: status }));
    setShowToast(true);
    
    // Hide the toast after a delay (adjust as needed)
    setTimeout(() => {
      setShowToast(false);
    }, 2000);

    
   
  };
  const darkmode = useSelector((state)=> state.darkMode)
  return (


  
 
<div className="container mt-4">
<div>
          

        </div>

{showToast && (
     <div className="custom-toast">
      <ColorAlerts />
      

   </div>
  )} 
  <div className='row'>
    <div className='col-md-12'>
    <div className={`card ${darkmode ? 'card-mode':''}`}>
        <div className='header'>
          <h4 className={`title ${darkmode? 'card-color':''}`} >Attendance</h4>
          <p className='category'>Mark attendance for today</p>
        </div>
        <div className='content'>
        {users.length > 0 ? (
  <div className={`${darkmode ? ' card-mode ' : ''}`}>
    <Table className={`${darkmode ? 'card-mode ' : ''}`}>
      <TableHead className={`${darkmode ? 'card-mode ' : ''}`}>
        <TableRow className={`${darkmode ? 'card-mode ' : ''}`}>
          <TableCell className={`${darkmode ? 'card-color ' : ''}`}>Child Name</TableCell>
          <TableCell className={`${darkmode ? 'card-color ' : ''}`}>Mark Present</TableCell>
          <TableCell className={`${darkmode ? 'card-color ' : ''}`}>Mark Absent</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user, index) => (
          user.children ? (
            user.children.map((child, childIndex) => (
              <TableRow key={`${index}-${childIndex}`}>
                <TableCell className={`${darkmode ? 'card-color ' : ''}`}>{child.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAttendanceChange(user.uid, child.name, 'present')}
                  >
                    Mark Present
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAttendanceChange(user.uid, child.name, 'absent')}
                  >
                    Mark Absent
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow key={index}>
              <TableCell colSpan={4} className={darkmode ? 'card-color ' : ''}>
                No children data available.
              </TableCell>
            </TableRow>
          )
        ))}
      </TableBody>
    </Table>
  </div>
) : (
  <p className={darkmode ? 'card-color ' : ''}>No users data available.</p>
)}
        </div>
      </div>
      
    </div>

  </div>
  
</div>

    
  );
};