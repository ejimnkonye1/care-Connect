
import { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { collection,  onSnapshot, query, where } from 'firebase/firestore';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
export const IncidentReporting = () => {
  const [incidentReports, setincidentReports] = useState([])
  const user = auth.currentUser

  useEffect(() => {

  if (user) {
    const incidentReportRef = collection(firestore, 'incidentReport')
    const q = query(incidentReportRef, where('userId', '==', user.uid))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const incidentReportsData = snapshot.docs.map((doc) => doc.data())
    setincidentReports(incidentReportsData)
    })
  
  return unsubscribe;
  }


  }, [user])

  return (
  
      <div className='card'>
        <div className='header'>
        <h4 className='title'>Incident History</h4>
        <p className="category">Incidents today</p>
        </div>
        <div className='content'>
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incidentReports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.time}</TableCell>
                  <TableCell>{report.location}</TableCell>
                  <TableCell>{report.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
 
  ); 
}






