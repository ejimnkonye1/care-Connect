import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { subDays, formatISO, format } from 'date-fns';
import SkeletonLoader from "../reuseable/skelenton";

// Register chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const WeeklyAttendance = () => {
    const [user, setUser ] = useState(null); // Store user data
    const [attendance, setAttendance] = useState([]); 
    const [loading, setLoading] = useState(true); 

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
            const user = auth.currentUser ;
            if (user) {
                const userDoc = await getDoc(doc(firestore, 'users', user.uid));
                if (userDoc.exists()) {
                    setUser (userDoc.data());
                }
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        setLoading(true)
        if (user) {
            const dates = getLast7Days();
            const attendanceRef = collection(firestore, 'attendance');
            const q = query(attendanceRef, where('date', 'in', dates));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const attendanceData = snapshot.docs.map((doc) => doc.data());
                const userChildren = user.children.map(child => child.name); // Get the list of child names

                const filteredAttendance = attendanceData.filter((attendance) => {
                    return userChildren.includes(attendance.childName);
                });

                // Set attendance data
                setAttendance(filteredAttendance);
                setLoading(false)
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
            user.children.forEach(child => {
                const childAttendance = dateAttendance.find(att => att.childName === child.name);
                if (childAttendance) {
                    dayData.attendance += childAttendance.status === 'present' ? 1 : 0; // Count present days
                }
            });
        }

        return dayData;
    });

    // Map attendance status to colors for the graph line
    const attendanceStatus = chartData.map(day => day.attendance);

    // Line chart data
    const data = {
        labels: chartData.map(day => day.day), // Use dynamic day names
        datasets: [
            {
                label: "Attendance",
                data: attendanceStatus, // Use attendance counts
                borderColor: "#34D3dd", // Color for the line
                backgroundColor: "rgba(52, 211, 153, 0.2)", // Transparent green fill for present
                pointBackgroundColor: "#34D399", // Green for Present
                pointBorderColor: "#FFFFFF",
                tension: 0.4, // Smooth curve
                borderWidth: 2,
                fill: false, // Don't fill the area under the line
            },
        ],
    };

    // Chart options
    const options = {
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "#374151", // Adjust for light/dark theme
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#374151",
                },
                grid: {
                    color: "rgba(209, 213, 219, 0.2)", // Light gray grid lines
                },
            },
            y: {
                ticks: {
                    callback: function (value) {
                        return value; // Display the count of present days
                    },
                    color: "#374151",
                },
                grid: {
                    color: "rgba(209, 213, 219, 0.2)", // Light gray grid lines
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false, // Adjust to fit container
    };

    return (
        <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-6 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-4 flex w-full items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-neutral-100">
                    Weekly Attendance
                </h3>
            </div>

       
            <div style={{ width: "100%", height: "120px" }}>
            {loading ? (
            <>
              <SkeletonLoader height={20} width={`100%`} />
              <SkeletonLoader height={20} width={`100%`} />
            </>
          ) : (
            <>
                <Line data={data} options={options} />
                </>
          )}
            </div>
        </div>
    );
};

export default WeeklyAttendance;