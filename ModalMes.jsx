import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { BACKEND_URL } from '../Services/Helper';
import { Navigate } from 'react-router-dom';

const MessageFormModal = ({ isOpen, onClose, Remail, Semail }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/mes`, { Remail, Semail, message });
      console.log('Message sent successfully:', response.data);
      alert("Message sent Successfully");
      setMessage('');
      onClose(); // Close modal after form submission
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyle}>
      <div style={modalContentStyle}>
        <h2>Send Message</h2>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="message">Message:</label>
            <input type='text' id="message0" value={message} onChange={(e) => setMessage(e.target.value)} required />
          </div><br/>
          <button type="submit">Send</button>
        </form>
      </div>
    </Modal>
  );
};

// Define inline styles
const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  },
};

const modalContentStyle = {
  textAlign: 'center',
};

const formGroupStyle = {
  marginBottom: '10px',
};

export default MessageFormModal;
