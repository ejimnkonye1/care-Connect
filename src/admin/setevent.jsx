import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Badge, styled, Modal, Button } from "@mui/material";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase"; // Import firestore instance

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
 
  return (
    <div className="">
      <div className="">
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
            
          <button 
            className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setModalOpen(true)}
          >
            Add Event
          </button>
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