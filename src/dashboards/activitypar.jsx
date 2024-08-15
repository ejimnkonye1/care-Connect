
import { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { collection,  query, where, onSnapshot } from 'firebase/firestore';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useSelector } from 'react-redux';
export const ParentActivityUpdates = () => {
    const [activityUpdates, setActivityUpdates] = useState([]);
  const user = auth.currentUser

  useEffect(() => {
    if (user) {
      const activityRef = collection(firestore, 'activities');
      const q = query(activityRef, where('userId', '==', user.uid));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const activityData = snapshot.docs.map((doc) => doc.data());
        setActivityUpdates(activityData);
      });

      // Cleanup the subscription on unmount
      return  unsubscribe;
    }
  }, [user]);
  const darkmode = useSelector((state)=> state.darkMode)
  return (
  
      <div className={`card ${darkmode ? 'card-mode':''}`}>
        <div className='header'>
        <h4 className={`title ${darkmode ? 'card-color':''}`}>Activity History</h4>
        <p className="category">Activity today</p>
        </div>
        <div className='content'>
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={`${darkmode ? 'card-color':''}`} >Date</TableCell>
                <TableCell className={`${darkmode ? 'card-color':''}`}>Time</TableCell>
                <TableCell className={`${darkmode ? 'card-color':''}`}>Activity</TableCell>
                <TableCell className={`${darkmode ? 'card-color':''}`}>Child Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activityUpdates.map((updates, index) => (
                <TableRow key={index}>
                  <TableCell className={`${darkmode ? 'card-color':''}`}>{updates.date}</TableCell>
                  <TableCell className={`${darkmode ? 'card-color':''}`}>{updates.time}</TableCell>
                  <TableCell className={`${darkmode ? 'card-color':''}`}>{updates.activity}</TableCell>
                  <TableCell className={`${darkmode ? 'card-color':''}`}>{updates.childName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
   
  ); 
}






