/* eslint-disable no-unused-vars */
import { addDoc, collection,  getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { Table, TableHead, TableBody, TableRow, TableCell, TextField, Button, Select, MenuItem, TableContainer, Paper,FormControl,Typography,InputLabel } from '@mui/material';
import ColorAlerts from "../alert";
import { useSelector } from "react-redux";
const Setreports = () =>{
    const [showToast, setShowToast] = useState(false);
    const [users, setUser] = useState([])
    const [selectedChildName, setSelectedChildName] = useState('')
    const [selectedUserId, setSelectedUserId] = useState(''); 
  const [incidentReports, setIncidentReports] = useState([]);
  const [newIncidentReport, setNewIncidentReport] = useState({
    date: '',
    time: '',
    name:'',
    status: '',
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
    if (!newIncidentReport.date || !newIncidentReport.status ||
        !newIncidentReport.time || !newIncidentReport.description 
        ||
        !newIncidentReport.userId || !newIncidentReport.childName || !newIncidentReport.status || !newIncidentReport.name
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
        name:'',
        status: '',
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
    return(
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Incident Reporting Form */}
          <div className="inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border border-slate-100 bg-white p-6 space-y-6 dark:border-neutral-800 dark:bg-neutral-900">

            <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
        Incident Reporting
        </h3>

      </div>
            <form className="w-full">
            <div className="mb-4">
                <TextField
                  className="dark:text-neutral-100"
                  label="name"
                  fullWidth
                  variant="outlined"
                  multiline
                 
                  value={newIncidentReport.name}
                  onChange={(e) => setNewIncidentReport({ ...newIncidentReport, name: e.target.value })}
                  InputLabelProps={{
                    className:"dark:text-neutral-100",
                    
                    }}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={newIncidentReport.date}
                  onChange={(e) => setNewIncidentReport({ ...newIncidentReport, date: e.target.value })}
                  InputLabelProps={{ shrink: true, className:"dark:text-neutral-100", }}
                  InputProps={{
                    className:"dark:text-neutral-100",
                  }}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Time"
                  type="time"
                  fullWidth
                  variant="outlined"
                  value={newIncidentReport.time}
                  onChange={(e) => setNewIncidentReport({ ...newIncidentReport, time: e.target.value })}
                  InputLabelProps={{ shrink: true ,className:"dark:text-neutral-100",}}
                  InputProps={{
                    className:"dark:text-neutral-100",
                  }}
                  
                />
              </div>
              <div className="mb-4">
                 <FormControl fullWidth>
            <InputLabel className="dark:text-neutral-100">Status</InputLabel>
            <Select
               value={newIncidentReport.status}
              onChange={(e) => setNewIncidentReport({ ...newIncidentReport, status: e.target.value })}
              label="Status"
              name="status"
              className="dark:text-neutral-100"
            >
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
            </Select>
          </FormControl>
              </div>
              <div className="mb-4">
                <TextField
                  className="dark:text-neutral-100"
                  label="Description"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  value={newIncidentReport.description}
                  onChange={(e) => setNewIncidentReport({ ...newIncidentReport, description: e.target.value })}
                  InputLabelProps={{
                    className:"dark:text-neutral-100",
                    
                    }}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddIncidentReport}
              >
                Add Report
              </Button>
            </form>
          </div>
        
          {/* Select Child Form */}
          <div>
          <div className="inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border border-slate-100 bg-white p-6 space-y-6 dark:border-neutral-800 dark:bg-neutral-900">

<div className="flex w-full items-center justify-between">
<h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
Select Child
</h3>

</div>
<FormControl fullWidth variant="outlined" className="mb-6">
  <InputLabel   className="dark:text-neutral-100" id="child-select-label">Select a child</InputLabel>
  <Select
    labelId="child-select-label"
    value={newIncidentReport.childId}
    onChange={handleChildChange}
    label="Select a child"
  >
    <MenuItem value=""   className="dark:text-neutral-100">Select a child</MenuItem>
    {users.map((user, index) =>
      user.children ? (
        user.children.map((child, childIndex) => (
          <MenuItem  key={`${index}-${childIndex}`} value={child.id}>
            {child.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem key={index} value="" disabled>
          No children data available.
        </MenuItem>
      )
    )}
  </Select>
</FormControl>

</div>
<div className="py-5">

</div>
<div className="inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border border-slate-100 bg-white p-6 space-y-6 dark:border-neutral-800 dark:bg-neutral-900">

  <div className="flex w-full items-center justify-between">
<h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
Incident Update History
</h3>

</div>
  <TableContainer component={''}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell   className="dark:text-neutral-100">Date</TableCell>
          <TableCell   className="dark:text-neutral-100">Time</TableCell>
          <TableCell   className="dark:text-neutral-100">Status</TableCell>
          <TableCell   className="dark:text-neutral-100">Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {incidentReports.filter((incidentReport) => incidentReport.childName === selectedChildName).map((report, index) => (
          <TableRow key={index}>
            <TableCell   className="dark:text-neutral-100">{report.date}</TableCell>
            <TableCell   className="dark:text-neutral-100">{report.time}</TableCell>
            <TableCell   className="dark:text-neutral-100">{report.status}</TableCell>
            <TableCell   className="dark:text-neutral-100">{report.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</div>
          </div>
       
        
        </div>
        

    )
}

export default Setreports;