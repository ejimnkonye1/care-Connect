import { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { useSelector } from 'react-redux';

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

  const darkmode = useSelector((state)=> state.darkMode)
  return (
    <div className='row'>
      <div className='col-md-12'>
        <div  className={`card ${darkmode ? 'card-mode':''}`}>
          <div className='header'>
            <h4 className={`title ${darkmode ? 'card-color':''}`}>Meal Updates for {user?  childNames.join(', ') :  ''} </h4>
            <p className='category'>Meals today</p>
          </div>
           <div className='content mb-3'>
           <Table>
        <TableHead>
          <TableRow>
            <TableCell className={`${darkmode ? 'card-color':''}`}>Date</TableCell>
            <TableCell className={`${darkmode ? 'card-color':''}`}>Meal Type</TableCell>
            <TableCell className={`${darkmode ? 'card-color':''}`}>Food</TableCell>
            <TableCell className={`${darkmode ? 'card-color':''}`}>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mealUpdates.length > 0 ? (
            mealUpdates.map((update, index) => (
              <TableRow key={index}>
                <TableCell className={`${darkmode ? 'card-color':''}`}>{update.date}</TableCell>
                <TableCell className={`${darkmode ? 'card-color':''}`}>{update.mealType}</TableCell>
                <TableCell className={`${darkmode ? 'card-color':''}`}>{update.food}</TableCell>
                <TableCell className={`${darkmode ? 'card-color':''}`}>{update.quantity}</TableCell>
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
