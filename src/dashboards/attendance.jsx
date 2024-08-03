/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import {  collection,  doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
export const ChildAttendance = ({setTriggerUpdate}) => {
    const [user, setUser] = useState(null); // Store user data
    const [attendance, setAttendance] = useState({}); // Store attendance data

  
    useEffect(() => {
      const fetchUserData = async () => {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data());
          }
        }
      };
  
      fetchUserData();
    }, [auth, firestore]);

  
    useEffect(() => {
      if (user) {
        const attendanceRef = collection(firestore, 'attendance');
        const unsubscribe = onSnapshot(attendanceRef, (snapshot) => {
          const attendanceData = snapshot.docs.map((doc) => doc.data());
          const userChildren = user.children;
          const userAttendance = attendanceData.filter((attendance) => {
            return userChildren.some((child) => child.name === attendance.childName);
          });
          setAttendance(userAttendance);
        });
  
        return unsubscribe;
      }
    }, [user, firestore]);
  
    useEffect(() => {
    if (Object.keys(attendance).length > 0) {
      setTriggerUpdate(true);
    }
  }, [attendance]);
  
    return(
        <div>
        {Object.keys(attendance).length > 0 ? (
          Object.values(attendance).map((attendance, index) => (
            <div key={index}>
              <p>Child: {attendance.childName}</p>
              <p>Date: {attendance.date}</p>
              <p>Status: 
                {attendance.status === 'present' ? (
                  <span>
                    <i className="fa fa-circle text-info"></i> Present
                  </span>
                ) : attendance.status === 'absent' ? (
                  <span>
                    <i className="fa fa-circle text-danger"></i> Absent
                  </span>
                ) : (
                  <span>No attendance data available.</span>
                )}
              </p>
            </div>
          ))
        ) : (
          <p>No attendance data available.</p>
        )}
      </div>
    )
}