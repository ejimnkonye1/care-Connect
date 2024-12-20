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

// Register chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const WeeklyAttendance = () => {
  const attendanceData = {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    attendance: ["present", "absent", "present", "absent", "present"], // 'present' and 'absent' values
  };

  // Map attendance status to colors for the graph line
  const attendanceStatus = attendanceData.attendance.map((status) => {
    return status === "present" ? 1 : 0;
  });

  // Line chart data
  const data = {
    labels: attendanceData.days,
    datasets: [
      {
        label: "Attendance",
        data: attendanceStatus, // Convert 'present' to 1 and 'absent' to 0
        borderColor: (context) => {
          const value = context.raw;
          return value === 1 ? "#34D3dd" : "#34D3dd"; // Green for Present, Red for Absent
        },
        backgroundColor: "rgba(52, 211, 153, 0.2)", // Transparent green fill for present
        pointBackgroundColor: (context) => {
          const value = context.raw;
          return value === 1 ? "#34D399" : "#F87171"; // Green for Present, Red for Absent
        },
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
            // Convert 1 back to 'present' and 0 to 'absent'
            return value === 1 ? "Present" : "Absent";
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

      {/* Line Graph */}
      <div style={{ width: "100%", height: "120px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklyAttendance;
