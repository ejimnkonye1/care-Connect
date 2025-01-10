import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Badge, styled, Modal, Button } from "@mui/material";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase"; // Import firestore instance
import { Calendar2 } from "iconsax-react";

const StyledCalendar = styled(Calendar)(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  '& .react-calendar__tile': {
    position: 'relative',
  },
  '& .react-calendar__tile--active': {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  '& .react-calendar__tile--now': {
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
}));

const Setevents = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'schoolEvents'));
        const eventsData = {};
        querySnapshot.forEach((doc) => {
          const event = doc.data();
          const formattedDate = event.date;
          if (eventsData[formattedDate]) {
            eventsData[formattedDate].push(event);
          } else {
            eventsData[formattedDate] = [event];
          }
        });
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = (date, event) => {
    const formattedDate = date.toDateString();
    setEvents((prevEvents) => {
      const newEvents = { ...prevEvents };
      if (newEvents[formattedDate]) {
        newEvents[formattedDate].push(event);
      } else {
        newEvents[formattedDate] = [event];
      }
      return newEvents;
    });
  };

  const handleAddEvent = async () => {
    if (!eventDetails || !status) return; // Don't proceed if no details or status are entered

    try {
      const schoolEventsRef = collection(firestore, 'schoolEvents');
      await addDoc(schoolEventsRef, {
        date: date.toDateString(),
        event: eventDetails,
        status: status
      });
      addEvent(date, { event: eventDetails, status: status });
      console.log('Event added to Firestore');
      setModalOpen(false); // Close modal after adding event
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const tileContent = ({ date }) => {
    const formattedDate = date.toDateString();
    if (events[formattedDate]) {
      return (
        <Badge color="success" className="p-1" variant="dot" overlap="circular">
          <span></span>
        </Badge>
      );
    }
    return null;
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Full Day":
        return "bg-green-500 text-white";
      case "Half Day":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          <div className='mb-4 inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900'>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-neutral-300">School Calendar</h4>
            <p className="text-sm text-gray-600 dark:text-neutral-300">Add events</p>
            <StyledCalendar 
              onChange={setDate} 
              value={date} 
              tileContent={tileContent}
              className={`w-full bg-white dark:bg-gray-700`} 
            />
          </div>

          <button 
            className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setModalOpen(true)}
          >
            Add Event
          </button>
        </div>

        <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
              Events List
            </h3>
            <button className="cursor-pointer text-base font-medium text-emerald-400">
              See All
            </button>
          </div>
          <div className="scrollbar mx-auto mt-7 block w-full overflow-x-auto text-left">
            {Object.keys(events).length > 0 ? (
              Object.entries(events).map(([eventDate, eventList], index) => (
                eventList.map((event, idx) => (
                  <div key={`${index}-${idx}`} className="flex justify-between py-3 border-b">
                    <div className="flex flex-col text-sm font-medium text-gray-700 dark:text-neutral-300">
                      <div className="flex items-center">
                        <span>{event.event}</span>
                      </div>
                      <div className="inline-flex items-center text-xs pt-1">
                        <Calendar2 className="mr-1" />
                        <span>{eventDate}</span>
                      </div>
                    </div>
                    <div className="pt-3 flex items-center">
                      <button
                        className={`h-6 inline-flex cursor-pointer items-center py-1 text-xs rounded-lg px-2 ${getStatusColor(event.status)}`}
                      >
                        {event.status}
                      </button>
                    </div>
                  </div>
                ))
              ))
            ) : (
              <p className="text-center text-gray-800 dark:text-neutral-300">
                No events for this date.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for selecting event status */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
  <div className="flex items-center justify-center h-full">
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Add Event</h2>
      <input 
        type="text" 
        placeholder="Enter event details" 
        value={eventDetails} 
        onChange={(e) => setEventDetails(e.target.value)} 
        className="border border-gray-300 p-2 rounded w-full mb-4"
      />
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Select Event Status:</label>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option value="">Select duration</option>
          <option value="Full Day">Full Day</option>
          <option value="Half Day">Half Day</option>
        </select>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleAddEvent} color="primary">Add Event</Button>
        <Button onClick={() => setModalOpen(false)} color="secondary">Cancel</Button>
      </div>
    </div>
  </div>
</Modal>
    </div>
  );
};

export default Setevents;