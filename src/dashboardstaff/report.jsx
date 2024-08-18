/* eslint-disable no-unused-vars */
import { addDoc, collection,  getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { Table, TableHead, TableBody, TableRow, TableCell, TextField, Button, Select, MenuItem } from '@mui/material';
import ColorAlerts from "../alert";
import { useSelector } from "react-redux";
import BroadCast from "./broad";


export const StaffReport = () => {
  const [showToast, setShowToast] = useState(false);
    const [users, setUser] = useState([])
    const [selectedChildName, setSelectedChildName] = useState('')
    const [selectedUserId, setSelectedUserId] = useState(''); 
  const [incidentReports, setIncidentReports] = useState([]);
  const [newIncidentReport, setNewIncidentReport] = useState({
    date: '',
    time: '',
    location: '',
    description: '',
    childName:'',
    userId : ''
  });

useEffect(() => {
const fetchUsers = async () => {
    const usersRef = collection(firestore, 'users')
    const usersSnapshot = await getDocs(usersRef)
    const usersData = usersSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }))
    setUser(usersData)
}
fetchUsers();
}, [])





  const handleAddIncidentReport =  async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    if (!newIncidentReport.date || !newIncidentReport.location ||
        !newIncidentReport.time || !newIncidentReport.description 
        ||
        !newIncidentReport.userId || !newIncidentReport.childName
    ){
        alert('Please fill in all required fields')
        return;
    }
    try{
        const incidentReportRef = collection(firestore, 'incidentReport')
        await addDoc(incidentReportRef, newIncidentReport)
        setIncidentReports((prevUpdates) => [...prevUpdates, newIncidentReport])    
        setShowToast(true);

        // Hide the toast after a delay (adjust as needed)
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
        setNewIncidentReport({
        date: '',
        time: '',
        location: '',
        description: '',
        childName:'',
        userId:''
      });
    } catch (error){
        console.error("Error sending incident Report", error)
    }
  
  };

  const handleChildChange = (e) => {
    const childName = e.target.value;
    const user = users.find(user => user.children.some(child => child.name === childName))
    if (user) {
        setSelectedChildName(childName)
        setSelectedUserId(user.id)
        setNewIncidentReport((prevUpdate) => ({
            ...prevUpdate,
            childName,
            userId :user.id
        }))
    }
  }
  useEffect(() => {
    const fetchUpdates = async () => {
      const incidentReportRef = collection(firestore, 'incidentReport');
      const indcidentReportSnapshot = await getDocs(incidentReportRef);
      const incidentReportData = indcidentReportSnapshot.docs.map((doc) => doc.data());
      setIncidentReports(incidentReportData);
    };

    fetchUpdates();
  }, []);
  const darkmode = useSelector((state)=> state.darkMode)
  return (
    <div className="container mt-4">
         {showToast && (
     <div className="custom-toast">
      <ColorAlerts />

   </div>
  )} 
      <div className="row">
        <div className="col-md-6">
        <div className={`card ${darkmode ? 'card-mode':''}`}>
            <div className="header">
            <h4 className={`title ${darkmode? 'card-color':''}`}  >Incident Reporting</h4>
                <p className="category"></p>
              
              <div className="content">
              <form>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input
            type="date"
            id="date"
            className={`form-control ${darkmode? 'card-mode card-color':''}`}
            value={newIncidentReport.date}
            onChange={(e) => setNewIncidentReport({ ...newIncidentReport, date: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">Time:</label>
          <input
            type="time"
            id="time"
            className={`form-control ${darkmode? 'card-mode card-color':''}`}
            value={newIncidentReport.time}
            onChange={(e) => setNewIncidentReport({ ...newIncidentReport, time: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input
            type="text"
            id="location"
            className={`form-control ${darkmode? 'card-mode card-color':''}`}
            value={newIncidentReport.location}
            onChange={(e) => setNewIncidentReport({ ...newIncidentReport, location: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            className={`form-control ${darkmode? 'card-mode card-color':''}`}
            rows="4"
            value={newIncidentReport.description}
            onChange={(e) => setNewIncidentReport({ ...newIncidentReport, description: e.target.value })}
          />
        </div>
        <button
          className="btn btn-dark"
          onClick={handleAddIncidentReport}
        >
          Add Report
        </button>
      </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
        <div className={`card ${darkmode ? 'card-mode':''}`}>
          <div className='header'>
            <h4 className={`title ${darkmode? 'card-color':''}`} >Select Child</h4>
          </div>
          <select
        name="childId"
        value={newIncidentReport.childId}
        onChange={handleChildChange}
        className={`mb-4 mt-1 p-3 m-2 ${darkmode? 'card-mode':''}`}
      >
        {users.map((user, index) => (
          user.children ? (
            user.children.map((child, childIndex) => (
              <option key={`${index}-${childIndex}`} value={child.id}>
                {child.name}
              </option>
            ))
          ) : (
            <option key={index} value="" disabled>
              No children data available.
            </option>
          )
        ))}
      </select>

        </div>
        <div className={`card ${darkmode ? 'card-mode':''}`}>
          <div className='header'>
            <h4 className={`title ${darkmode? 'card-color':''}`} >incident Update History</h4>
            <p className="category">Today report</p>
          </div>
          <Table className="mb-4">
            <TableHead>
              <TableRow>
                <TableCell className={`${darkmode ? 'card-color':''}`}>Date</TableCell>
                <TableCell className={`${darkmode ? 'card-color':''}`}>Time</TableCell>
                <TableCell className={`${darkmode ? 'card-color':''}`}>Location</TableCell>
                <TableCell className={`${darkmode ? 'card-color':''}`}>Description</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
            {incidentReports.filter((incidentReport) => incidentReport.childName === selectedChildName).map((report, index) => (
                  <TableRow key={index}>
                    <TableCell className={`${darkmode ? 'card-color':''}`}>{report.date}</TableCell>
                    <TableCell className={`${darkmode ? 'card-color':''}`}>{report.time}</TableCell>
                    <TableCell className={`${darkmode ? 'card-color':''}`}>{report.location}</TableCell>
                    <TableCell className={`${darkmode ? 'card-color':''}`}>{report.description}</TableCell>
                    
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      </div>
      
  


     

      
    </div>
  );
};
