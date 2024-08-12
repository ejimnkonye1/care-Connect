import { useState, useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { subDays, formatISO, format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, } from 'recharts';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export const Attendancechart = () => {
  const [user, setUser] = useState(null); // Store user data
  const [attendance, setAttendance] = useState([]); // Store attendance data
  const darkmode = useSelector((state)=> state.darkMode)
  // Helper function to get the last 7 days in YYYY-MM-DD format
  const getLast7Days = () => {
    const today = new Date();
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(today, i);
      dates.push(formatISO(date).split('T')[0]); // Format date as YYYY-MM-DD
    }
    return dates;
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
  }, []);

  useEffect(() => {
    if (user) {
      const dates = getLast7Days();

      // Ensure dates are valid
      if (dates.length === 0) {
        console.error('Invalid dates');
        return;
      }

      const attendanceRef = collection(firestore, 'attendance');
      const q = query(
        attendanceRef,
        where('date', 'in', dates)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const attendanceData = snapshot.docs.map((doc) => doc.data());
        const userChildren = user.children.map(child => child.name); // Get the list of child names

        const filteredAttendance = attendanceData.filter((attendance) => {
          return userChildren.includes(attendance.childName);
        });

        // Set attendance data
        setAttendance(filteredAttendance);
      });

      return unsubscribe;
    }
  }, [user]);

  // Prepare data for the chart
  const chartData = getLast7Days().map((date) => {
    const dayName = format(new Date(date), 'EEE'); // Get abbreviated day of the week (e.g., "Sun", "Mon")
    const dateAttendance = attendance.filter(att => att.date === date);
    
    const dayData = { day: dayName, attendance: 0 };
    
    if (user && user.children) {
      const childAttendance = dateAttendance.find(att => att.childName === user.children[0].name);
      if (childAttendance) {
        dayData.attendance = childAttendance.status === 'present' ? 1 : -1;
      }
    }

    return dayData;
  });

  return (
   <Box sx={{ p: 2 }}>
  {attendance.length > 0 ? (

      <BarChart
        width={500}
        height={250}
        data={chartData}
        margin={{ top: 0, right: 30, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis domain={[-1, 1]} ticks={[-1, 1]} tickFormatter={(tick) => tick === 1 ? 'Present' : 'Absent'} />
        <Tooltip />
        <Legend />
        <Bar dataKey="attendance" fill="#82ca9d">
          {chartData.map((entry, index) => (
            <Cell key={index} fill={entry.attendance > 0 ? '#82ca9d' : '#ff5252'} />
          ))}
        </Bar>
      </BarChart>
 
  ) : (
    <Typography  className={darkmode? 'card-color':''}>No attendance data available.</Typography>
  )}
</Box>
  );
};