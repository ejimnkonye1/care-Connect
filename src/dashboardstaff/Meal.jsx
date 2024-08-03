/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { Table, TableHead, TableBody, TableRow, TableCell, TextField, Button, Select, MenuItem } from '@mui/material';

export const StaffMealUpdatesTable = () => {
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
    quantity: '',
    childName: '',
    userId: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMealUpdate((prevUpdate) => ({ ...prevUpdate, [name]: value }));
  };

  const handleSendUpdate = async () => {
    if (!newMealUpdate.date || !newMealUpdate.mealType || !newMealUpdate.food || !newMealUpdate.quantity || !newMealUpdate.childName || !newMealUpdate.userId) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const mealUpdatesRef = collection(firestore, 'mealUpdates');
      await addDoc(mealUpdatesRef, newMealUpdate);
      setMealUpdates((prevUpdates) => [...prevUpdates, newMealUpdate]);
      setNewMealUpdate({
        date: '',
        mealType: '',
        food: '',
        quantity: '',
        childName: '',
        userId: ''
      });
    } catch (error) {
      console.error('Error sending meal update:', error);
    }
  };

  const handleChildChange = (e) => {
    const childName = e.target.value;
    const user = users.find(user => user.children.some(child => child.name === childName));
    if (user) {
      setSelectedChildName(childName);
      setSelectedUserId(user.id);
      setNewMealUpdate((prevUpdate) => ({
        ...prevUpdate,
        childName,
        userId: user.id
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
  }, [firestore]);
  return (
    <div>
    <h2>Meal Updates</h2>
    <div className='row'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='header'>
            <h4 className='title'>Meal Update History</h4>
            <p className="category">Today meal</p>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Meal Type</TableCell>
                <TableCell>Food</TableCell>
                <TableCell>Quantity</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
            {mealUpdates.filter((mealUpdate) => mealUpdate.childName === selectedChildName).map((mealUpdate, index) => (
                  <TableRow key={index}>
                    <TableCell>{mealUpdate.date}</TableCell>
                    <TableCell>{mealUpdate.mealType}</TableCell>
                    <TableCell>{mealUpdate.food}</TableCell>
                    <TableCell>{mealUpdate.quantity}</TableCell>
                    
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className='col-md-6'>
        <div className='card'>
          <div className='header'>
            <h4 className='title'>Select Child</h4>
          </div>
          <select
        name="childId"
        value={newMealUpdate.childId}
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
      </div>
    </div>
    <div className='row'>
      <div className='col-md-12'>
        <div className='card'>
          <div className='header'>
            <h4 className='title'>Send New Meal Update</h4>
            <p className="category">Meals</p>
          </div>
      
          <form className='mb-5 mt-3 m-3'>
            <div className='row'>
                <div className='col-md-3'>
                <TextField
              label="Date"
              name="date"
              value={newMealUpdate.date}
              onChange={handleInputChange}
            />
                </div>
                <div className='col-md-3'>
                <TextField
              label="Meal Type"
              name="mealType"
              value={newMealUpdate.mealType}
              onChange={handleInputChange}
            />
</div>
<div className='col-md-3'>
<TextField
              label="Food"
              name="food"
              value={newMealUpdate.food}
              onChange={handleInputChange}
            />
</div>
<div className='col-md-3'>

<TextField
              label="Quantity"
              name="quantity"
              value={newMealUpdate.quantity}
              onChange={handleInputChange}
            />
</div>
            </div>
           
         <div >
         <Button
         className=''
         onClick={handleSendUpdate}>Send Update</Button>
         </div>
        
           
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};