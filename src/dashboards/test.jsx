// attendance.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Attendance = () => {
  const [attendance, setAttendance] = useState({mike:''});

  const handleMarkAttendance = (student, attendanceStatus) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [student]: attendanceStatus,
    }));
  };

  return (
    <div className="container">
      <h1 className="text-center">Mark Attendance</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Student</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(attendance).map((student) => (
            <tr key={student}>
              <td>{student}</td>
              <td>
                <input
                  type="checkbox"
                  checked={attendance[student] === 'present'}
                  onChange={() => handleMarkAttendance(student, 'present')}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={attendance[student] === 'absent'}
                  onChange={() => handleMarkAttendance(student, 'absent')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
// import React from 'react';

// export const Attendance = () => {
//   const [attendance, setAttendance] = React.useState({
//     present: 0,
//     absent: 0,
//     total: 0
//   });

//   const markPresent = () => {
//     setAttendance({
//       ...attendance,
//       present: attendance.present + 1,
//       total: attendance.total + 1
//     });
//   };

//   const markAbsent = () => {
//     setAttendance({
//       ...attendance,
//       absent: attendance.absent + 1,
//       total: attendance.total + 1
//     });
//   };

//   return (
//     <div>
//       <h2>Attendance</h2>
//       <p>Present: {attendance.present}</p>
//       <p>Absent: {attendance.absent}</p>
//       <p>Total: {attendance.total}</p>
//       <button onClick={markPresent}>Mark Present</button>
//       <button onClick={markAbsent}>Mark Absent</button>
//       {/* <Staff attendance={attendance} /> */}
//     </div>
//   );
// };
