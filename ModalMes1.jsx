import React, { useEffect, useState } from 'react';
import MessageFormModal from './Message';
import { BACKEND_URL } from '../Services/Helper';
import './Messages.css';


const Messages = ({ email }) => {
  const [messageThreads, setMessageThreads] = useState({});
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [Receiver, setReceiver] = useState(null);

  const updateMessageThreads = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/getmessage?email=${email}`);
      const data = await res.json();
      setMessageThreads(data.messageThreads);
      if (!selectedEmail) {
        const firstEmail = Object.keys(data.messageThreads)[0];
        setSelectedEmail(firstEmail);
        setReceiver(firstEmail);
      }
      sendNotificationEmail();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    updateMessageThreads();
  }, [email]);

  const handleEmailSelect = (event) => {
    setSelectedEmail(event.target.value);
    setReceiver(event.target.value);
  };

  const sendNotificationEmail = async () => {
    try {
      if (Receiver) {
        await fetch(`${BACKEND_URL}/sendNotificationEmail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: Receiver }),
        });
      }
    } catch (error) {
      console.error('Error sending notification email:', error);
    }
  };

  return (
    <>
      {selectedEmail && (
        <div
          style={{
            position: 'fixed',
            top: '50px',
            right: '20px',
            padding: '10px',
            backgroundColor: '#fff',
            borderRadius: '5px',
            boxShadow: '10px 10px 10px gray',
            maxWidth: '500px',
      
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <select
              value={selectedEmail}
              onChange={handleEmailSelect}
              style={{
                padding: '10px',
                borderRadius: '5px',
                background:'none',
                border: 'none',
                color:'navy',
                width: '100%',
                marginBottom: '10px',
              }}
            >
              {Object.keys(messageThreads).map((email) => (
                <option key={email} value={email}>
                  {email}
                </option>
              ))}
            </select>
          </div>
         
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '10px' }}>
            {messageThreads[selectedEmail].map((message, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: message.Semail === email ? '#e1ffc7' : '#f1f1f1',
                  marginBottom: '5px',
                  textAlign: message.Semail === email ? 'right' : 'left',
                }}
              >
                <p style={{ margin: '0' }}>{message.message}</p>
                <span style={{ fontSize: '0.8em', color: '#888' }}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
          <MessageFormModal
            Remail={selectedEmail}
            Semail={email}
            updateMessageThreads={updateMessageThreads}
          />
        </div>
      )}
    </>
  );
};

export default Messages;
