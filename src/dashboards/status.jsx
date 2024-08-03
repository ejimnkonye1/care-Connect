// // import React, { useState, useEffect } from 'react';

// // import { getFirestore, collection, getDocs, doc, getDoc, onSnapshot } from 'firebase/firestore';
// // import { auth, firestore } from '../firebase';

// // export const AttendanceStat = () => {
// //   const [user, setUser] = useState(null); // Store user data
// //   const [attendance, setAttendance] = useState({}); // Store attendance data

// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       const user = auth.currentUser;
// //       if (user) {
// //         const userDoc = await getDoc(doc(firestore, 'users', user.uid));
// //         if (userDoc.exists()) {
// //           setUser(userDoc.data());
// //         }
// //       }
// //     };

// //     fetchUserData();
// //   }, [auth, firestore]);

// //   useEffect(() => {
// //     if (user) {
// //       const attendanceRef = collection(firestore, 'attendance');
// //       const unsubscribe = onSnapshot(attendanceRef, (snapshot) => {
// //         const attendanceData = snapshot.docs.map((doc) => doc.data());
// //         const userChildren = user.children;
// //         const userAttendance = attendanceData.filter((attendance) => {
// //           return userChildren.some((child) => child.name === attendance.childName);
// //         });
// //         setAttendance(userAttendance);
// //       });

// //       return unsubscribe;
// //     }
// //   }, [user, firestore]);

// //   return (
// //     <div>
// //       <h1>Parent Dashboard</h1>
// //       {Object.keys(attendance).length > 0? (
// //         Object.values(attendance).map((attendance, index) => (
// //           <div key={index}>
// //             <p>Child: {attendance.childName}</p>
// //             <p>Status: {attendance.status}</p>
            
// //           </div>
// //         ))
// //       ) : (
// //         <p>No attendance data available.</p>
// //       )}
// //     </div>
// //   );
// // };
// import { useState, useEffect } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';

// export const ParentMealUpdates = () => {
//   const [mealUpdates, setMealUpdates] = useState([]);
//   const user = auth.currentUser;

//   useEffect(() => {
//     const fetchMealUpdates = async () => {
//       if (user) {
//         const mealUpdatesRef = collection(firestore, 'mealUpdates');
//         const q = query(mealUpdatesRef, where('userId', '==', user.uid));
//         const mealUpdatesSnapshot = await getDocs(q);
//         const mealUpdatesData = mealUpdatesSnapshot.docs.map((doc) => doc.data());
//         setMealUpdates(mealUpdatesData);
//       }
//     };

//     fetchMealUpdates();
//   }, [user]);

//   return (
//     <div>
//       <h2>Your Meal Updates</h2>
//       {mealUpdates.length > 0 ? (
//         <ul>
//           {mealUpdates.map((update, index) => (
//             <li key={index}>
//               <p>Date: {update.date}</p>
//               <p>Meal Type: {update.mealType}</p>
//               <p>Food: {update.food}</p>
//               <p>Quantity: {update.quantity}</p>
//               <p>Child Name: {update.childName}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No meal updates available.</p>
//       )}
      
//     </div>
//   );
// };
