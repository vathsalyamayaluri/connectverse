import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Profile.css';
import Upload from './Profile1';
import axios from 'axios';
import Messages from './ModalMes1';
import { BACKEND_URL } from '../Services/Helper';
import styled from 'styled-components';
import { IoIosNotificationsOutline } from 'react-icons/io';

const NotificationContainer = styled.div`
  background-image: linear-gradient(black, darkblue), url('ba2.jpeg');
  padding: 20px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: 2px solid skyblue;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NotificationIcon = styled(IoIosNotificationsOutline)`
  color: rgb(22, 201, 233);
  font-size: 60px;
  font-weight: bold;
`;

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.username;

  const [image, setImage] = useState(null);
  const [showMessages, setShowMessages] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchUserImage();
    getName();
  }, []);

  const fetchUserImage = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getDetails/${email}`);
        const imageData = response.data.data[0];
        if (imageData && imageData.image) {
            setImage(imageData.image);
        }
    } catch (error) {
        console.error('Error fetching user image:', error);
    }
};

  const getName = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/getName/${email}`);
      setName(response.data.fname);
    } catch (error) {
      console.error('Error fetching name:', error);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file);
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('email', email);

      const response = await axios.post(`${BACKEND_URL}/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };

  return (
    <>
      <div className="home-container">
        {image ? (
          <div className="uploaded-image">
            <img
                            src={`${BACKEND_URL}/uploads/${image}`}
                            alt="Uploaded"
                            style={{ float: 'left', marginTop: '-2%', width: '150px', height: '150px', borderRadius: '100%', marginLeft: '20px' }}
                            onClick={() => document.getElementById('fileInput').click()}
                        />
          </div>
        ) : (
          <img
            src="art.jpeg"
            style={{ float: 'left', marginTop: '-2%', width: '150px', height: '150px', borderRadius: '100%', marginLeft: '20px' }}
            onClick={() => document.getElementById('fileInput').click()}
          />
        )}
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />

        <header className="header">
          <div className="welcome" style={{ fontSize: '35px', fontWeight: 'bold' }}>
            Welcome, {name}
          </div>
        </header>
      </div>

      <div class="cont">
        <p>Click on image to get pdf</p>
      </div>

      {/* Uploaded Posts */}
      <div className="module-uploaded-posts">
        <h1 className='upload'></h1>
        <Upload email={email} />
      </div>

      <div className="module-downloaded-posts"></div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ color: 'rgb(22, 201, 233)', marginRight: '10px', fontWeight: 'bold', marginLeft: '79%' }}>Notifications</h1>
          <NotificationIcon onClick={toggleMessages} />
        </div>

        <NotificationContainer>
          {showMessages && <Messages email={email} />}
        </NotificationContainer>
      </div>
    </>
  );
};

export default HomePage;
