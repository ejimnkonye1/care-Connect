import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AttendanceChart = ({ attendanceRecords }) => {
  const data = attendanceRecords.map((record) => ({
    date: record.date,
    checkInTime: record.checkInTime,
    checkOutTime: record.checkOutTime,
  }));

  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="checkInTime" stroke="#8884d8" />
      <Line type="monotone" dataKey="checkOutTime" stroke="#82ca9d" />
    </LineChart>
  );
};

export default AttendanceChart;