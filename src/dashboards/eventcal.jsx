// EventCalendar.js

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const events = [
    {
      id: 1,
      title: 'Birthday Party',
      start: new Date('2024-07-01T10:00:00'),
      end: new Date('2024-07-01T12:00:00'),
    },
    {
      id: 2,
      title: 'Holiday',
      start: new Date('2023-02-15T00:00:00'),
      end: new Date('2023-02-16T00:00:00'),
    },
  ];

  return (
    <div className="container mt-5">
    <h1 className="text-center mb-4">Event Calendar</h1>
    <div className="card shadow-sm">
      <div className="card-body">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          className="bg-white"
        />
      </div>
    </div>
  </div>

  );
};

export default EventCalendar;