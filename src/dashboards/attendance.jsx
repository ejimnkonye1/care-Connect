/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import ColorAlerts from '../alert';
import { useSelector } from 'react-redux';
import { dark } from '@mui/material/styles/createPalette';
export const ChildAttendance = ({ setTriggerUpdate, }) => {
  const [user, setUser] = useState(null); // Store user data
  const [attendance, setAttendance] = useState([]); // Store attendance data
  const [showToast, setShowToast] = useState(false);

  const darkmode = useSelector((state)=> state.darkMode)
  // Helper function to get today's date in the desired format
  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

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
        const todayDate = getTodayDate();
        const userAttendance = attendanceData.filter((attendance) => {
          return (
            userChildren.some((child) => child.name === attendance.childName) &&
            attendance.date === todayDate
          );
        });
        setAttendance(userAttendance);
        setShowToast(true);

        // Hide the toast after a delay (adjust as needed)
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      });

      return unsubscribe;
    }
  }, [user, firestore]);

  useEffect(() => {
    if (attendance.length > 0) {
      setTriggerUpdate(true);
    }
  }, [attendance]);
  const btntrue = useSelector((state) => state.btnclick)

  return (
    <div>
      {btntrue && (
     <div className="custom-toast">
      <ColorAlerts />

   </div>
  )} 
      {attendance.length > 0 ? (
        attendance.map((attendance, index) => (
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
                <span className={darkmode? 'card-color':''}>No attendance data available.</span>
              )}
            </p>
          </div>
        ))
      ) : (
        <p className={darkmode? 'card-color':''}>No attendance data available.</p>
      )}
    </div>
  );
};
