import React,{useState} from 'react';
import styled from 'styled-components';
import MessageFormModal from './ModalMes';
const NotificationContainer = styled.div`
    background-color: #f4f4f4;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EmailTitle = styled.p`
    font-weight: bold;
    margin-bottom: 5px;
`;

const MessageText = styled.p`
    margin-bottom: 5px;
`;

const Notification = ({ email, message }) => {
    const [emailForModal, setEmailForModal] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (email) => {
        setEmailForModal(email);
        setIsModalOpen(true);
      };
      const closeModal = () => {
        setIsModalOpen(false);
      };
    return (
        <NotificationContainer>
            <EmailTitle>{email}</EmailTitle>
            <MessageText>{message}</MessageText>
            <button onClick={()=>openModal(email)}>Reply</button>
            <MessageFormModal isOpen={isModalOpen} onClose={closeModal} Remail={emailForModal} />
        </NotificationContainer>
    );
};

export default Notification;
