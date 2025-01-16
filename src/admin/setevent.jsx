import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Badge, styled, Button,Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel  } from "@mui/material";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase"; 
import { MessageAlert } from "../alert";

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
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
   setLoading(true)
    try {
      const schoolEventsRef = collection(firestore, 'schoolEvents');
      await addDoc(schoolEventsRef, {
        date: date.toDateString(),
        event: eventDetails,
        status: status
      });
      addEvent(date, { event: eventDetails, status: status });
      console.log('Event added to Firestore');
      setModalOpen(false);
      setLoading(false) // Close modal after adding event
      setSuccessMessage(`Event added`)
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
              className={`w-full bg-white dark:bg-gray-700 dark:text-neutral-100`} 
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

      
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
      <DialogTitle>Add Event</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Event Details"
          type="text"
          fullWidth
          variant="outlined"
          value={eventDetails}
          onChange={(e) => setEventDetails(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Select Event Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Select Event Status"
          >
            <MenuItem value=""><em>Select duration</em></MenuItem>
            <MenuItem value="Full Day">Full Day</MenuItem>
            <MenuItem value="Half Day">Half Day</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddEvent} disabled={loading} color="primary">Add Event</Button>
        <Button onClick={() => setModalOpen(false)} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>


        <MessageAlert
            open={!!successMessage}
            message={successMessage}
            
            onClose={() => setSuccessMessage("")}
          />
    </div>
  );
};

export default Setevents;