// // EventCalendar.js

// // import { Calendar, momentLocalizer } from 'react-big-calendar';
// // import moment from 'moment';


// // const localizer = momentLocalizer(moment);

// // const EventCalendar = () => {
// //   const events = [
// //     {
// //       id: 1,
// //       title: 'Birthday Party',
// //       start: new Date('2024-07-01T10:00:00'),
// //       end: new Date('2024-07-01T12:00:00'),
// //     },
// //     {
// //       id: 2,
// //       title: 'Holiday',
// //       start: new Date('2023-02-15T00:00:00'),
// //       end: new Date('2023-02-16T00:00:00'),
// //     },
// //   ];

// //   return (
// //     <div className="container mt-5">
// //     <h1 className="text-center mb-4">Event Calendar</h1>
// //     <div className="card shadow-sm">
// //       <div className="card-body">
// //         <Calendar
// //           localizer={localizer}
// //           events={events}
// //           startAccessor="start"
// //           endAccessor="end"
// //           style={{ height: 500 }}
// //           className="bg-white"
// //         />
// //       </div>
// //     </div>
// //   </div>

// //   );
// // };

// // export default EventCalendar;
// // src/Calendar.js
// import React, { useState } from "react";


// const EventCalendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//   const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

//   const startDay = startOfMonth.getDay();
//   const daysInMonth = endOfMonth.getDate();

//   const days = [];
//   for (let i = 0; i < startDay; i++) {
//     days.push(null);
//   }
//   for (let i = 1; i <= daysInMonth; i++) {
//     days.push(i);
//   }

//   const handlePrevMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };

//   return (
//     <div className="calendar">
//       <div className="headers">
//         <button onClick={handlePrevMonth}>{"<"}</button>
//         <div>
//           {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
//         </div>
//         <button onClick={handleNextMonth}>{">"}</button>
//       </div>
//       <div className="body">
//         <div className="weekdays">
//           {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//             <div key={day} className="weekday">
//               {day}
//             </div>
//           ))}
//         </div>
//         <div className="days">
//           {days.map((day, index) => (
//             <div key={index} className="day">
//               {day}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCalendar;
// src/Calendar.js
import  { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const EventCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <Calendar onChange={setDate} value={date} />
      <p>Selected date: {date.toDateString()}</p>
    </div>
  );
};

export default EventCalendar;
