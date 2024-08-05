import { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, firestore } from '../firebase';

const MealUpdatesTable = () => {
  const [mealUpdates, setMealUpdates] = useState([]);
  const [childNames, setChildNames] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth]);

  useEffect(() => {
    if (user) {
      const mealUpdatesRef = collection(firestore, 'mealUpdates');
      const q = query(mealUpdatesRef, where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const mealUpdatesData = snapshot.docs.map((doc) => doc.data());
        setMealUpdates(mealUpdatesData);
        const uniqueChildNames = [...new Set(mealUpdatesData.map(update => update.childName))];
        setChildNames(uniqueChildNames);
      });

      return () => unsubscribe();
    }
  }, [user, firestore]);


  return (
    <div className='row'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='header'>
            <h4 className='title'>Meal Updates for {user?  childNames.join(', ') :  ''} </h4>
            <p className='category'>Meals today</p>
          </div>
           <div className='content mb-3'>
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
          {mealUpdates.length > 0 ? (
            mealUpdates.map((update, index) => (
              <TableRow key={index}>
                <TableCell>{update.date}</TableCell>
                <TableCell>{update.mealType}</TableCell>
                <TableCell>{update.food}</TableCell>
                <TableCell>{update.quantity}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                No meal updates available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
           </div>
        </div>
      </div>
      
    </div>
  );
};

export default MealUpdatesTable;
