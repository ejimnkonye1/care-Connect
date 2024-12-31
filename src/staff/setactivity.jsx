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
import ColorAlerts from "../alert";
import { useSelector } from "react-redux";
const Setactivity = () => {
    const [showToast, setShowToast] = useState(false);
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
    setShowToast(true);

    // Hide the toast after a delay (adjust as needed)
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
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
    const fetchUpdates = async () => {

    
    const activityRef = collection(firestore, 'activities');
    // const unsubscribe = onSnapshot(activityRef, (snapshot) => {
    //   const activityData = snapshot.docs.map((doc) => doc.data());
    //   setActivityUpdates(activityData);
    // });

    // // Cleanup the subscription on unmount
    // return unsubscribe;
    const activitysnap = await getDocs(activityRef)
    const activityData = activitysnap.docs.map((doc) => doc.data());
      setActivityUpdates(activityData);
    }
    fetchUpdates()
  }, []);
    return(
        <form onSubmit={handleActivitySubmit}>

    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
        <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 mt-3"> 
        <div className="w-full mb-4">
        <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Select A Child 
        </h3>
    
      </div>
      <select
        name="childId"
        value={newactivityUpdates.childId}
        onChange={handleChildChange}
        className="mb-4 mt-1 p-3 m-2 w-full border border-slate-200 rounded-lg dark:bg-neutral-800 dark:text-white"
      >
        <option>Select a child</option>
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
    </div>

    {/* Activity Updates Table */}
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 mt-3">
    <div className="w-full mb-4">
    <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
        Activity Updates
        </h3>
     
      </div>
      <div className="overflow-x-auto">
        <TableContainer className="mb-3" component={''}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-zinc-800 dark:text-neutral-100">Child Name</TableCell>
                <TableCell className="text-zinc-800 dark:text-neutral-100">Activity</TableCell>
                <TableCell className="text-zinc-800 dark:text-neutral-100">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activityUpdates.filter(update => update.childName === selectedChildName).map((update, index) => (
                <TableRow key={index}>
                  <TableCell className="text-zinc-800 dark:text-neutral-100">{update.childName}</TableCell>
                  <TableCell className="text-zinc-800 dark:text-neutral-100">{update.activity}</TableCell>
                  <TableCell className="text-zinc-800 dark:text-neutral-100">{update.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    </div>
        </div>

        <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 mt-3">
        <div className="w-full mb-4">
        <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
        Send New Activity Update
        </h3>
     
      </div>
      <div className="space-y-4">
        <TextField
          label="Time"
          type="time"
          fullWidth
          margin="normal"
          value={newactivityUpdates.time}
          onChange={(e) => setNewActivityUpdates({ ...newactivityUpdates, time: e.target.value })}
          required
          sx={{ padding: '10px' }}
          InputLabelProps={{
            className:"dark:text-neutral-100",
            shrink: true, 
            }}
            InputProps={{
                className:"dark:text-neutral-100",
              }}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          InputProps={{
            className:"dark:text-neutral-100",
          }}
          value={newactivityUpdates.date}
          onChange={(e) => setNewActivityUpdates({ ...newactivityUpdates, date: e.target.value })}
          required
          sx={{ padding: '10px' }}
          InputLabelProps={{
            className:"dark:text-neutral-100",
            shrink: true, 
            }}
        />
        <TextField
          label="Activity"
          fullWidth
          margin="normal"
          value={newactivityUpdates.activity}
          onChange={(e) => setNewActivityUpdates({ ...newactivityUpdates, activity: e.target.value })}
          required
          sx={{ padding: '10px' }}
          InputLabelProps={{
            className:"dark:text-neutral-100",
            shrink: true, 
            
            }}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-3 "
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
    </div>
    </div>


</form>

    )

}

export default Setactivity;