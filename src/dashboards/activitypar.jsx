
import { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
export const ParentActivityUpdates = () => {
    const [activityUpdates, setActivityUpdates] = useState([]);
  const user = auth.currentUser

  useEffect(() => {
const fetchActivityUpdates = async () => {
  if (user) {
    const activityRef = collection(firestore, 'activities')
    const q = query(activityRef, where('userId', '==', user.uid))
    const activitySnapshot = await getDocs(q)
    const activityData = activitySnapshot.docs.map((doc) => doc.data())
    setActivityUpdates(activityData)
  }
}
fetchActivityUpdates()
  }, [user])

  return (
  
      <div className='card'>
        <div className='header'>
        <h4 className='title'>Activity History</h4>
        <p className="category">Activity today</p>
        </div>
        <div className='content'>
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell>Child Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activityUpdates.map((updates, index) => (
                <TableRow key={index}>
                  <TableCell>{updates.date}</TableCell>
                  <TableCell>{updates.time}</TableCell>
                  <TableCell>{updates.activity}</TableCell>
                  <TableCell>{updates.childName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
   
  ); 
}






