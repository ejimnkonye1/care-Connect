

// eslint-disable-next-line react/prop-types
const AttendanceTable = ({ attendanceRecords }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Check-in Time</th>
          <th>Check-out Time</th>
        </tr>
      </thead>
      <tbody>
        {attendanceRecords.map((record, index) => (
          <tr key={index}>
            <td>{record.date}</td>
            <td>{record.checkInTime}</td>
            <td>{record.checkOutTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;