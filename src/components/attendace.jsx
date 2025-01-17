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
import { useState, useEffect } from "react";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import { subDays, formatISO, format } from "date-fns";
import SkeletonLoader from "../reuseable/skelenton";

// Register chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const WeeklyAttendance = () => {
  const [user, setUser] = useState(null); // Store user data
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLast5Weekdays = () => {
    const weekdays = [];
    let date = new Date();

    while (weekdays.length < 5) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek > 0 && dayOfWeek < 6) {
        weekdays.unshift(formatISO(date).split("T")[0]); // Add weekday (Monday to Friday)
      }
      date = subDays(date, 1);
    }

    return weekdays;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (user) {
      const dates = getLast5Weekdays();
      const attendanceRef = collection(firestore, "attendance");
      const q = query(attendanceRef, where("date", "in", dates));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const attendanceData = snapshot.docs.map((doc) => doc.data());
        const userChildren = user.children.map((child) => child.name); // Get the list of child names

        const filteredAttendance = attendanceData.filter((attendance) =>
          userChildren.includes(attendance.childName)
        );

        // Set attendance data
        setAttendance(filteredAttendance);
        setLoading(false);
      });

      return unsubscribe;
    }
  }, [user]);

  // Prepare data for the chart
  const chartData = getLast5Weekdays().map((date) => {
    const dayName = format(new Date(date), "EEE"); // Get abbreviated day name (e.g., "Mon", "Tue")
    const dateAttendance = attendance.filter((att) => att.date === date);

    const dayData = { day: dayName, attendance: "absent" }; // Default is absent

    if (user && user.children) {
      user.children.forEach((child) => {
        const childAttendance = dateAttendance.find((att) => att.childName === child.name);
        if (childAttendance && childAttendance.status === "present") {
          dayData.attendance = "present"; // Update to present
        }
      });
    }

    return dayData;
  });

//   // Line chart data
//   const data = {
//     labels: chartData.map((day) => day.day), // Day names as labels
//     datasets: [
//       {
//         label: "Present",
//         data: chartData.map((day) => (day.attendance === "present" ? 1 : null)), // Show only present data
//         borderColor: "#34D399", // Green color
//         backgroundColor: "transparent",
//         pointBackgroundColor: "#34D399",
//         pointBorderColor: "#FFFFFF",
//         tension: 0.4,
//         borderWidth: 2,
//         fill: false,
//       },
//       {
//         label: "Absent",
//         data: chartData.map((day) => (day.attendance === "absent" ? 0 : null)), // Show only absent data
//         borderColor: "#EF4444", // Red color
//         backgroundColor: "transparent",
//         pointBackgroundColor: "#EF4444",
//         pointBorderColor: "#FFFFFF",
//         tension: 0.4,
//         borderWidth: 2,
//         fill: false,
//       },
//     ],
//   };
  

//   // Chart options
//   const options = {
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//         labels: {
//           color: "#374151",
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: "#374151",
//         },
//         grid: {
//           color: "rgba(209, 213, 219, 0.2)",
//         },
//       },
//       y: {
//         ticks: {
//           callback: function (value) {
//             return value === 1 ? "Present" : value === 0 ? "Absent" : "";
//           },
//           color: "#374151",
//         },
//         grid: {
//           color: "rgba(209, 213, 219, 0.2)",
//         },
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//   };
  // Line chart data
const data = {
    labels: chartData.map((day) => day.day), // Day names as labels
    datasets: [
      {
        label: "Attendance",
        data: chartData.map((day) => (day.attendance === "present" ? 1 : 0)), // Combine Present and Absent data
        borderColor: "#3B82F6", // Blue color for the line
        backgroundColor: "transparent",
        pointBackgroundColor: chartData.map((day) =>
          day.attendance === "present" ? "#34D399" : "#EF4444" // Green for Present, Red for Absent
        ),
        pointBorderColor: "#FFFFFF",
        tension: 0.4,
        borderWidth: 2,
        fill: false,
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
          color: "#374151",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#374151",
        },
        grid: {
          color: "rgba(209, 213, 219, 0.2)",
        },
      },
      y: {
        ticks: {
          callback: function (value) {
            return value === 1 ? "Present" : value === 0 ? "Absent" : "";
          },
          color: "#374151",
        },
        grid: {
          color: "rgba(209, 213, 219, 0.2)",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-6 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-4 flex w-full items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-neutral-100">
          Weekly Attendance
        </h3>
      </div>

      <div style={{ width: "99%", height: "120px" }}>
        {loading ? (
          <>
            <SkeletonLoader height={20} width={`100%`} />
            <SkeletonLoader height={20} width={`100%`} />
          </>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default WeeklyAttendance;
