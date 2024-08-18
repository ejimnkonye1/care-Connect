import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {  Grid, Typography, List, ListItem, ListItemText, Badge, styled } from "@mui/material";
import { collection,  getDocs } from "firebase/firestore";
import { firestore } from "../firebase"; // Import firestore instance
import BroadChat from "./noti";
import { useSelector } from "react-redux";

const StyledCalendar = styled(Calendar)(({ theme }) => ({
  width: '100%',
  maxWidth: '700px',
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

const EventsContainer = styled(Grid)(({ theme }) => ({
  
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  marginTop: theme.spacing(3),
}));

const  EventCalendar = () => {
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
        <div className="col-md-8">
        <div className={`card ${darkmode ? 'card-mode':''}`}>
          <div className="header">
          <h4 className={`title ${darkmode ? 'card-color':''}`}>School Calendar</h4>
          </div>
          <div className='content'>
          <StyledCalendar className={`${darkmode? 'card-mode card-color':''}`} onChange={setDate} value={date} tileContent={tileContent} />
         

          </div>

          </div>
         
        </div>
        <div className="col-md-4">
        
          <Grid container spacing={2}>
            <EventsContainer item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Events on {date.toDateString()}:
              </Typography>
              <List>
                {events[date.toDateString()] ? (
                  events[date.toDateString()].map((event, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={event} />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body1">No events for this date.</Typography>
                )}
              </List>
            </EventsContainer>
          </Grid>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
         <div className="">
         <BroadChat />
         </div>
        </div>
      </div>
    </div>
  );
};

export default  EventCalendar;

