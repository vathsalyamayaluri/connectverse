import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const ChatIcon = ({ onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faComments} />
    </div>
  );
};

export default ChatIcon;
