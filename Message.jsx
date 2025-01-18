// MessageFormModal.jsx

import axios from 'axios';
import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../Services/Helper';
const MessageFormModal = ({ Remail, Semail, updateMessageThreads }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/mes`, { Remail, Semail, message });
      toast.success('Message sent successfully');
      setMessage('');
      updateMessageThreads(); // Update message threads after sending message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="text"
            className="message-input"
            
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            width='100%'
            required
          />
          <button type="submit" className="send-button">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </>
  );
};

export default MessageFormModal;
