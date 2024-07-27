import {useState, useEffect} from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
// eslint-disable-next-line react/prop-types
const MealUpdatesTable = () => {
    const [mealUpdates, setMealUpdates] = useState([]);

    useEffect(() => {
      // Call API to fetch meal updates
      const mealUpdatesData = [
        { date: '2023-02-01', mealType: 'Breakfast', food: 'Oatmeal', quantity: '1 cup' },
        { date: '2023-02-01', mealType: 'Lunch', food: 'Chicken', quantity: '4 oz' },
        { date: '2023-02-01', mealType: 'Dinner', food: 'Rice', quantity: '1 cup' },
      ];
      setMealUpdates(mealUpdatesData);
    }, []);
  return (
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
        {mealUpdates.map((update, index) => (
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