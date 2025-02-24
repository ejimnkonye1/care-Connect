/* eslint-disable no-unused-vars */

import {
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

} from "@mui/material";
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import SkeletonLoader from "../reuseable/skelenton";


// const mealUpdates = [
//   {
//     childName: "Ella Johnson",
//     meal: "Scrambled eggs and toast",
//     type: "Breakfast",
//     date: "Dec 18, 2023",
//     status: "Completed",
//   },
//   {
//     childName: "Ella Johnson",
//     meal: "Grilled chicken with rice",
//     type: "Lunch",
//     date: "Dec 17, 2023",
//     status: "Ongoing",
//   },
//   {
//     childName: "Ella Johnson",
//     meal: "Apple slices with peanut butter",
//     type: "Snack",
//     date: "Dec 16, 2023",
//     status: "Completed",
//   },
// ];

const MealUpdates = () => {
  const [mealUpdates, setMealUpdates] = useState([]);
  const [childNames, setChildNames] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  useEffect(() => {
    setLoading(true)
    if (user) {
      const mealUpdatesRef = collection(firestore, 'mealUpdates');
      const q = query(mealUpdatesRef, where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const mealUpdatesData = snapshot.docs.map((doc) => doc.data());
        setMealUpdates(mealUpdatesData);
        const uniqueChildNames = [...new Set(mealUpdatesData.map(update => update.childName))];
        setChildNames(uniqueChildNames);
        setLoading(false)
      });

      return () => unsubscribe();
    }
  }, [user, ]);

  const childName = mealUpdates[0]?.childName || "No Name"; // Show the first child's name or fallback to "No Name."

  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Ongoing":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Meal Updates for  { loading ?"":childName}
        </h3>
     
      </div>

      <TableContainer component={''} className="mt-1">
        <Table aria-label="meal updates table">
        {loading ? (
             <>
             <SkeletonLoader height={20}  count={4} />
             <SkeletonLoader height={20} count={4} />
           </>
        ) : (
          <>
          <TableHead>
            <TableRow>
              <TableCell className="dark:text-neutral-100 text-nowrap" >Meal Type</TableCell>
              <TableCell className="dark:text-neutral-100">Meal</TableCell>
              <Hidden smDown>
              <TableCell className="dark:text-neutral-100">Date</TableCell>
              </Hidden>
              <TableCell className="dark:text-neutral-100">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {mealUpdates.length > 0 ? (
            mealUpdates.map((update, index) => (
              <TableRow key={index}>
                <TableCell className="dark:text-neutral-100">{update.mealType}</TableCell>
                <TableCell className="dark:text-neutral-100">{update.food}</TableCell>
                <Hidden smDown>
                <TableCell>
                  <div className="dark:text-neutral-100">
                 
                    {update.date}
                  </div>
                </TableCell>
                </Hidden>
                <TableCell>
                  <span
                    style={{
                      backgroundColor: statusColor(update.status),
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    {update.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
            ):(
              <TableRow>
              <TableCell colSpan={4} className="dark:text-neutral-100 text-center">
                No meal updates available.
              </TableCell>
            </TableRow>
         ) }
          </TableBody>
          </>
             )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default MealUpdates;
