import React, { useEffect, useState } from 'react';
import Notification from './Notification'; // Import the Notification component
import styled, { keyframes } from 'styled-components';
import {BACKEND_URL} from '../Services/Helper';
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MessageContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Email = styled.p`
  font-weight: bold;
  color: #333;
`;

const MessageText = styled.p`
  color: #555;
`;

const Messages = ({ email }) => {
    const [allData, setAllData] = useState([]);
console.log(email)
    const fetchMessages = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/getmessage?email=${email}`);
            const data = await res.json();
            setAllData(data.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [email]);

    return (
        <div className='allimg'>
            {allData.map((el, index) => (
                <Notification key={index} email={el.Semail} message={el.message} />
            ))}
        </div>
    );
};

export default Messages;
