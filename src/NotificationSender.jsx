import React, { useState } from 'react';

function NotificationSender({ currentUser, onSendNotification }) {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (recipient && message) {
      onSendNotification(currentUser, recipient, message);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient (User ID)"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send Notification</button>
    </div>
  );
}

export default NotificationSender;
