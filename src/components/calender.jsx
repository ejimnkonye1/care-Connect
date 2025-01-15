import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Badge, styled,} from "@mui/material";
import { collection,  getDocs } from "firebase/firestore";
import { firestore } from "../firebase"; 
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

const Calendars = () => {
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

    <div className='mb-4 inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900'>
    <h4 className="text-lg font-semibold text-gray-800 dark:text-neutral-300">School Calendar</h4>

    <StyledCalendar 
      onChange={setDate} 
      value={date} 
      tileContent={tileContent}
      className={`w-full bg-white dark:bg-gray-700 dark:text-neutral-100`} 
    />
    

  </div>
  );
};

export default Calendars;
