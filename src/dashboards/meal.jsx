import {useState, useEffect} from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
// eslint-disable-next-line no-unused-vars
import { collection, addDoc, getDocs, doc,getDoc, query, where } from 'firebase/firestore';
// eslint-disable-next-line no-unused-vars
import { auth, firestore } from '../firebase';
// eslint-disable-next-line react/prop-types
const MealUpdatesTable = () => {
    const [mealUpdates, setMealUpdates] = useState([]);
    const [user, setUser] = useState(null); // Store user data
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
      const fetchMealUpdates = async () => {
        const userId = auth.currentUser.uid; // Get the current user's ID
        const userRef = doc(firestore, 'users', userId);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        const childId = userData.children[0].id; // Assuming the user has only one child
    
        const mealUpdatesRef = collection(firestore, 'mealUpdates');
        const mealUpdatesSnapshot = await getDocs(mealUpdatesRef, where('childId', '==', childId));
        const mealUpdatesData = mealUpdatesSnapshot.docs.map((doc) => doc.data());
        setMealUpdates(mealUpdatesData);
        console.log(mealUpdates)
      };
    
      fetchMealUpdates();
    }, [firestore, auth]);
  return (
    <Table>
         <h2>Meal Updates for {currentUser.childId}</h2>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Meal Type</TableCell>
          <TableCell>Food</TableCell>
          <TableCell>Quantity</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {mealUpdates.filter((update) => update.childId === currentUser.childId).map((update, index) => (
          <TableRow key={index}>
            <TableCell>{update.date}</TableCell>
            <TableCell>{update.mealType}</TableCell>
            <TableCell>{update.food}</TableCell>
            <TableCell>{update.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MealUpdatesTable;