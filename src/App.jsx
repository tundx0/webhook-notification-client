import React, { useState } from 'react';
import LoginForm from './LoginForm';
import NotificationSender from './NotificationSender';
import NotificationViewer from './NotificationViewer';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const sendNotification = (sender, recipient, requestMessage) => {
    // Send a POST request to the server to trigger a notification
    fetch('http://localhost:3001/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sender, recipient, requestMessage }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(`Notification sent from ${sender} to ${recipient}: ${requestMessage}`);
        } else {
          console.error('Failed to send notification');
        }
      })
      .catch((error) => {
        console.error('Error sending notification:', error);
      });
  };

  return (
    <div>
      {!currentUser ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <h1>Welcome, {currentUser}!</h1>
          <NotificationSender currentUser={currentUser} onSendNotification={sendNotification} />
          <NotificationViewer currentUser={currentUser} />
        </div>
      )}
    </div>
  );
}

export default App;
