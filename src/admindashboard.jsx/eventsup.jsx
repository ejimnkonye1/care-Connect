import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button,  Badge, styled } from "@mui/material";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase"; // Import firestore instance
import { useSelector } from "react-redux";

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



const EventUpdates = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'schoolEvents'));
        const eventsData = {};
        querySnapshot.forEach((doc) => {
          const event = doc.data();
          const formattedDate = event.date;
          if (eventsData[formattedDate]) {
            eventsData[formattedDate].push(event.event);
          } else {
            eventsData[formattedDate] = [event.event];
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
    const event = prompt("Enter event details:");
    if (event) {
      try {
        const schoolEventsRef = collection(firestore, 'schoolEvents');
        await addDoc(schoolEventsRef, {
          date: date.toDateString(),
          event: event
        });
        addEvent(date, event);
        console.log('Event added to Firestore');
      } catch (error) {
        console.error('Error adding event:', error);
      }
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
  const darkmode = useSelector((state)=> state.darkMode)
  return (
    <div style={{ padding: "20px" }}>
      <div className="row">
        <div className="col-md-6">
        <div className={`card ${darkmode ? 'card-mode':''}`} >
        <div className='header'>
        <h4 className={`title ${darkmode ? 'card-color':''}`} >School Calender</h4>
        <p className="category">Add events</p>
        </div>
        <div className='content'>
        <StyledCalendar onChange={setDate} value={date} tileContent={tileContent}
       className= {` ${darkmode ? 'card-mode text-white':''}`} 
        />
          <Button variant="contained" color="primary" onClick={handleAddEvent} style={{ marginTop: "10px" }}>
            Add Event
          </Button>
        </div>
      </div>
        
        </div>
        <div className="col-md-6">
        <div className={`card ${darkmode ? 'card-mode':''}`}>
        <div className='header'>
        <h4 className={`title ${darkmode ? 'card-color':''}`} >School Events</h4>
        <p className="category">  Events on {date.toDateString()}:</p>
        </div>
        <div className='content'>
        <div className= {`list-group ${darkmode ? 'card-mode':''}`} >
        {events[date.toDateString()] ? (
                  events[date.toDateString()].map((event, index) => (
  <a href="#"  key={index} className={`list-group-item list-group-item-action disabled ${darkmode ? 'card-mode card-color':''}`} >
{event} 
  </a>
          ))
        ) : (
          <p className={`text-center ${darkmode ? 'card-color':''}`}>
            No events for this date.
          </p>
             )}


</div>
            
    
        </div>
      </div>
       
        </div>
      </div>
    </div>
  );
};

export default EventUpdates;
