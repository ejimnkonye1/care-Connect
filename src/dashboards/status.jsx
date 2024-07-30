// attendance-status.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AttendanceStatus = ({ attendance }) => {
    return (
      <div className="container">
        <h2 className="text-center">Attendance Status</h2>
        <ul className="list-group">
          {attendance?.keys()?.map((student) => (
            <li key={student} className="list-group-item">
              {student}: {attendance[student] === 'present' ? (
                <i className="fas fa-check text-success" />
              ) : attendance[student] === 'absent' ? (
                <i className="fas fa-times text-danger" />
              ) : (
                <i className="fas fa-question text-secondary" />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };
// import React from 'react';

// export const AttendanceStatus = ({ attendance }) => {
//   const percentage = attendance * 100

//   return (
//     <div>
//       <h2>Attendance Status</h2>
//       <p>Percentage: {percentage}%</p>
//       <p>Status: {percentage >= 80 ? 'Good' : 'Bad'}</p>
//     </div>
//   );
// };

