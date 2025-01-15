/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import {
 
    TextField,
    Button,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    InputLabel,
    FormControl,
  
  } from '@mui/material';
import { MessageAlert } from '../alert';
  
const SetMealForm = () => {
    
     
    const [successMessage, setSuccessMessage] = useState("");
    const [mealUpdates, setMealUpdates] = useState([]);
  const [users, setUsers] = useState([]); // Store all users
  const [selectedChildName, setSelectedChildName] = useState(''); // Store the selected child name
  const [selectedUserId, setSelectedUserId] = useState(''); // Store the selected user's ID

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(firestore, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const [newMealUpdate, setNewMealUpdate] = useState({
    date: '',
    mealType: '',
    food: '',
    status: '',
    childName: '',
    userId: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMealUpdate((prevUpdate) => ({ ...prevUpdate, [name]: value }));
  };

  const handleSendUpdate = async () => {
    if (!newMealUpdate.date || !newMealUpdate.mealType || !newMealUpdate.food || !newMealUpdate.childName || !newMealUpdate.userId) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const mealUpdatesRef = collection(firestore, 'mealUpdates');
      await addDoc(mealUpdatesRef, newMealUpdate);
      setMealUpdates((prevUpdates) => [...prevUpdates, newMealUpdate]);
      setSuccessMessage(`mealupdates sent for ${selectedChildName}`)
      setNewMealUpdate({
        date: '',
        mealType: '',
        food: '',
        status: '',
        childName: selectedChildName,
        userId: selectedUserId
      });
    } catch (error) {
      console.error('Error sending meal update:', error);
    }
  };
  const handleChildChange = (e) => {
    const childName = e.target.value; // Get the selected child's name
    const user = users.find(user => user.children.some(child => child.name === childName));
    if (user) {
      setSelectedChildName(childName); // Update the selected child name
      setSelectedUserId(user.id); // Update the selected user's ID
      setNewMealUpdate((prevUpdate) => ({
        ...prevUpdate,
        childName, // Update the newMealUpdate with the selected child's name
        userId: user.id // Update the userId in newMealUpdate
      }));
    }
  };
 
  useEffect(() => {
    const fetchMealUpdates = async () => {
      const mealUpdatesRef = collection(firestore, 'mealUpdates');
      const mealUpdatesSnapshot = await getDocs(mealUpdatesRef);
      const mealUpdatesData = mealUpdatesSnapshot.docs.map((doc) => doc.data());
      setMealUpdates(mealUpdatesData);
    };

    fetchMealUpdates();
  }, []);
  return (
    <div className="">
    <>
             <MessageAlert
            open={!!successMessage}
            message={successMessage}
            onClose={() => setSuccessMessage("")}
          />
    </>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Meal Update History */}
        <div>
        <div className="inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border border-slate-100 bg-white p-6 space-y-6 dark:border-neutral-800 dark:bg-neutral-900 mt-3">
        <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Select A Child 
        </h3>
     
      </div>
            <FormControl fullWidth>
              <InputLabel className="dark:text-neutral-100">Select a child</InputLabel>
              <Select
                name="childName"
                value={selectedChildName}
                // value={newMealUpdate.childId}
                onChange={handleChildChange}
                label="Select a child"
              >
                {users.map((user, index) =>
                  user.children ? (
                    user.children.map((child, childIndex) => (
                      <MenuItem key={`${index}-${childIndex}`} value={child.name}>
                        {child.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem key={index} value="" disabled>
                      No children data available
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
      </div>
        
        <div className="inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border border-slate-100 bg-white p-6 space-y-6 dark:border-neutral-800 dark:bg-neutral-900 mt-3">
        <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Meal Updates for  {selectedChildName}
        </h3>
     
      </div>
          
            <TableContainer component={''}>
            <div className="scrollbar mx-auto mt-1 w-full overflow-x-auto h-[200px]">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="dark:text-neutral-100">Date</TableCell>
                    <TableCell className="dark:text-neutral-100 text-nowrap">Meal Type</TableCell>
                    <TableCell className="dark:text-neutral-100">Food</TableCell>
                    <TableCell className="dark:text-neutral-100">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mealUpdates
                    .filter((mealUpdate) => mealUpdate.childName === selectedChildName)
                    .map((mealUpdate, index) => (
                      <TableRow key={index}>
                        <TableCell className="dark:text-neutral-100 text-nowrap">{mealUpdate.date}</TableCell>
                        <TableCell className="dark:text-neutral-100">{mealUpdate.mealType}</TableCell>
                        <TableCell className="dark:text-neutral-100">{mealUpdate.food}</TableCell>
                        <TableCell className="dark:text-neutral-100">{mealUpdate.status}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              </div>
            </TableContainer>
      
        </div>
  
    
      </div>


      <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 mt-3 py-5">
  <div className="flex w-full items-center justify-between">
    <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100 mb-5">
      Send Meal Updates 
    </h3>
  </div>
  <TableContainer component={''}>

    <Table>
      <TableBody className="mb-3">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 w-full">
          
        
          <TextField
            label="Date"
            name='date'
            type="date"
            value={newMealUpdate.date}
            onChange={handleInputChange}
            fullWidth
              margin="normal"
            InputLabelProps={{
              className:"dark:text-neutral-100",
              shrink: true, 
              }}
              InputProps={{
                className:"dark:text-neutral-100",
              }}
          />
          
          {/* Meal Type Select */}
          <FormControl fullWidth>
            <InputLabel className="dark:text-neutral-100">Meal Type</InputLabel>
            <Select
              name="mealType"
              value={newMealUpdate.mealType}
              onChange={handleInputChange}
              label="Meal Type"
              className="dark:text-neutral-100"
            >
              <MenuItem  value="Lunch">Lunch</MenuItem>
              <MenuItem value="Snacks">Snacks</MenuItem>
              <MenuItem value="Breakfast">Breakfast</MenuItem>
            </Select>
          </FormControl>

          {/* Food Text Field */}
          <TextField
            label="Food"
            name="food"
            value={newMealUpdate.food}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
            className:"dark:text-neutral-100",
            }}
          
          />
          
          {/* Status Select */}
          <FormControl fullWidth>
            <InputLabel className="dark:text-neutral-100">Status</InputLabel>
            <Select
              value={newMealUpdate.status}
              onChange={handleInputChange}
              label="Status"
              name="status"
              className="dark:text-neutral-100"
            >
              <MenuItem value="Ongoing">Ongoing</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          
        </div>
        
        {/* Send Update Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleSendUpdate}
        >
          Send Update
        </Button>
      </TableBody>
    </Table>
    
  </TableContainer>
</div>
      </div>
    
  





  </div>
  
  );
};

export default SetMealForm;
