
import { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { collection,  onSnapshot, query, where } from 'firebase/firestore';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useSelector } from 'react-redux';
export const IncidentReporting = () => {
  const [incidentReports, setincidentReports] = useState([])
  const user = auth.currentUser

  useEffect(() => {

  if (user) {
    const incidentReportRef = collection(firestore, 'incidentReport')
    const q = query(incidentReportRef, where('userId', '==', user.uid))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const incidentReportsData = snapshot.docs.map((doc) => doc.data())
        // Sort the activity data by date
        const sortedReports = incidentReportsData.sort((a, b) => {
          // Assuming `date` is a string in 'YYYY-MM-DD' format
          return new Date(a.date) - new Date(b.date);
        });
    setincidentReports(sortedReports)
    })
    
  return unsubscribe;
  }


  }, [user])
  const darkmode = useSelector((state)=> state.darkMode)
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Converts 0 (midnight) to 12
    return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  };
  return (
  
      <div className={`card ${darkmode ? 'card-mode':''}`}>
        <div className='header'>
      <h4 className={`title ${darkmode? 'card-color':''}`} >Incident History</h4>
        <p className="category">Incidents today</p>
        </div>
        <div className='content'>
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={`${darkmode ? 'card-color':''}`}>Date</TableCell>
                <TableCell className={`${darkmode ? 'card-color':''}`}>Time</TableCell>
                <TableCell className={`${darkmode ? 'card-color':''}`}>Location</TableCell>
                <TableCell className={`${darkmode ? 'card-color':''}`}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incidentReports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell className={`${darkmode ? 'card-color':''}`}>{report.date}</TableCell>
                  <TableCell className={`${darkmode ? 'card-color':''}`}>{formatTime(report.time)}</TableCell>
                  <TableCell className={`${darkmode ? 'card-color':''}`}>{report.location}</TableCell>
                  <TableCell className={`${darkmode ? 'card-color':''}`}>{report.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
 
  ); 
}






