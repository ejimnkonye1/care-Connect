import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button, Grid, Typography, List, ListItem, ListItemText, Badge, styled } from "@mui/material";
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

const EventsContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  marginTop: theme.spacing(3),
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

  return (
    <div style={{ padding: "20px" }}>
      <div className="row">
        <div className="col-md-6">
          <StyledCalendar onChange={setDate} value={date} tileContent={tileContent} />
          <Button variant="contained" color="primary" onClick={handleAddEvent} style={{ marginTop: "10px" }}>
            Add Event
          </Button>
        </div>
        <div className="col-md-6">
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
    </div>
  );
};

export default EventUpdates;
