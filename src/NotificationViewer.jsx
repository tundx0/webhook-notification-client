import React, { useEffect, useRef, useState } from 'react';
import EventSource from 'eventsource';

function NotificationViewer({ currentUser }) {
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(notifications)

  useEffect(() => {
    const source = new EventSource(`http://localhost:3001/subscribe/${currentUser}`);

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    };

    return () => {
      source.close();
    };
  }, [currentUser, notificationRef]);

  return (
    <div>
      <h2>Notifications for {currentUser}:</h2>
      <p>Notification No.: {notifications.length}</p>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <strong>{notification.sender}:</strong> {notification.requestMessage}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationViewer;
