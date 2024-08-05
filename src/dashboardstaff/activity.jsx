/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  
} from "@mui/material";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";

export const StaffActivityUpdates = () => {
    const [users, setUser] = useState([])
    const [selectedChildName, setSelectedChildName] = useState('')
    const [selectedUserId, setSelectedUserId] = useState(''); 
  const [activityUpdates, setActivityUpdates] = useState([]);
  const [newactivityUpdates, setNewActivityUpdates] = useState({
    date:'',
    time:'',
    activity:'',
    childName:'',
    userId :''
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

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    if (!newactivityUpdates.date || !newactivityUpdates.time || 
        !newactivityUpdates.activity || !newactivityUpdates 
        || !newactivityUpdates.childName

    ) {
      alert("Please fill in all required fields");
      return;
    }
 try {
    const activityRef = collection(firestore, 'activities')
    await addDoc(activityRef, newactivityUpdates)
    setActivityUpdates((prevUpdates) => [...prevUpdates, newactivityUpdates])
    setNewActivityUpdates({
        date:'',
        time:'',
        activity:'',
        childName:'',
        userId:'',
    })
 } catch (error) {
    console.error("Error sending activity updates", error)
 }
   
  
  };
  const handleChildChange = (e) => {
    const childName = e.target.value;
    const user = users.find(user => user.children.some(child => child.name === childName))
    if (user) {
        setSelectedChildName(childName)
        setSelectedUserId(user.id)
        setNewActivityUpdates((prevUpdate) => ({
            ...prevUpdate,
            childName,
            userId :user.id
        }))
    }
  }
  useEffect(() => {
    const activityRef = collection(firestore, 'activities');
    const unsubscribe = onSnapshot(activityRef, (snapshot) => {
      const activityData = snapshot.docs.map((doc) => doc.data());
      setActivityUpdates(activityData);
    });

    // Cleanup the subscription on unmount
    return unsubscribe;
  }, []);
  return (
    <div className="container mt-4">
      
      
      <form onSubmit={handleActivitySubmit}>
<div className="row">
  <div className="col-md-6">
  <div className='card'>
          <div className='header'>
            <h4 className='title'>Select Child</h4>
          </div>
          <select
        name="childId"
        value={newactivityUpdates.childId}
        onChange={handleChildChange}
        className='mb-4 mt-1 p-3 m-2'
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
        <div className="card">
          <div className="header">
            <h4 className="title">Activity Updates</h4>
            <p className="category">up</p>
          </div>
          <div className="content">
 
          <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Child Name</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activityUpdates.filter((activityUpdates) => activityUpdates.childName === selectedChildName).map((update, index) => 
               
                
                (
                  <TableRow key={index}>
                    <TableCell>{update.childName}</TableCell>
                    <TableCell>{update.activity}</TableCell>
                    <TableCell>{update.time}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
          </div>
        </div>
  </div>

  <div className="col-md-6">
    <div className="card">
      <div className="header">
        <h4 className="title">Send New Activity Update</h4>
          <p className="title">Activity</p>
        
      </div>
      <div className="content">
      <TextField
          label="Time"
          type="time"
          fullWidth
          margin="normal"
          value={newactivityUpdates.time}
          onChange={(e) => setNewActivityUpdates({...newactivityUpdates, time: e.target.value})}
          required
        />
         <TextField
          label="date"
          type="date"
          fullWidth
          margin="normal"
          value={newactivityUpdates.date}
          onChange={(e) => setNewActivityUpdates({...newactivityUpdates, date: e.target.value})}
          required
        />
          <TextField
          label="Activity"
          fullWidth
          margin="normal"
          value={newactivityUpdates.activity}
          onChange={(e) => setNewActivityUpdates({...newactivityUpdates, activity: e.target.value})}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-3"
        >
          Submit
        </Button>
      </div>
    </div>
  </div>
</div>

       
      
      
      
      </form>

     
    </div>
  );
};
