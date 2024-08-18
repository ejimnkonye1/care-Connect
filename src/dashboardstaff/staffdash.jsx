/* eslint-disable no-unused-vars */
import  { useState, useEffect } from 'react';

import { doc, getDoc } from 'firebase/firestore';

import { auth, firestore } from '../firebase'
import { StaffActivityUpdates } from './activity';
export const Staffdash = () => {
  const [staffData, setStaffData] = useState(null);
  

  useEffect(() => {
    const fetchStaffData = async () => {
      const user = auth.currentUser;
      if (user) {
        console.log(user.uid)
        const staffDoc = await getDoc(doc(firestore, 'staff', user.uid));
        if (staffDoc.exists()) {
          setStaffData(staffDoc.data());
        }
      }
    };

    fetchStaffData();
  }, []);

  return (
    <div>
      {/* <h1>Staff Dashboard</h1>
      {staffData ? (
        <div>
          <p>Name: {staffData.name}</p>
          <p>Email: {staffData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )} */}

      <StaffActivityUpdates />
    </div>
  );
};


