import  { useState, useEffect } from 'react';


import MessagingSystem from './mes';


const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  

  useEffect(() => {
    // Call API to fetch notifications
    const notificationsData = [
      { message: 'New message from caregiver' },
      { message: 'New meal update' },
    ];
    setNotifications(notificationsData);
  }, []);

  return (
    <div className='conatiner-fluid'>
        <div className='row'>
            <div className='col-md-6'>
            <div className="card notification-card">
      <ul className="notification-list">
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
            </div>
<div className='col-md-6'>

<MessagingSystem />
</div>
        </div>
    

   
    </div>
  );
};

export default NotificationSystem;