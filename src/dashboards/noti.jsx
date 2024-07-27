import React, { useState, useEffect } from 'react';

import { Snackbar } from '@mui/material';
import MessagingSystem from './mes';
import EventCalendar from './eventcal';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Call API to fetch notifications
    const notificationsData = [
      { message: 'New message from caregiver' },
      { message: 'New meal update' },
    ];
    setNotifications(notificationsData);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Notification System</h1>
      {notifications.map((notification, index) => (
        <Snackbar
          key={index}
          open={open}
          message={notification.message}
          onClose={handleClose}
        />
      ))}
      <button onClick={handleOpen}>Open</button>
      <MessagingSystem />
      <EventCalendar />
    </div>
  );
};

export default NotificationSystem;