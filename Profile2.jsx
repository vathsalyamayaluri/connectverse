import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Profile.css';
import Upload from './Profile1';
import axios from 'axios';
import Messages from './ModalMes1';
import { BACKEND_URL } from '../Services/Helper';
import styled from 'styled-components';

const NotificationContainer = styled.div`
  background-image: url(chat.jpeg);
  padding: 20px;
  background-repeat: none;
  background-size: 100% 100%;
  margin-left: 50%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NotificationTitle = styled.h2`
  color: white;
  font-size: 40px;
  margin-left: 20px;
`;

const SvgIcon = styled.div`
  cursor: pointer;
  svg {
    fill: rgb(22, 201, 233);
    width: 60px;
    height: 60px;
  }
  background-color: white;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid rgb(22, 201, 233);
  position: fixed;
  right: 0;
  top: 560px;
`;

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.username;
  const [image, setImage] = useState(null);
  const [showMessages, setShowMessages] = useState(false);
  const [isRGUKTian, setIsRGUKTian] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchUserImage();
    checkIsRGUKTian();
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

  const checkIsRGUKTian = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/getIsRGUKTian/${email}`);
      const isRGUKTianValue = response.data.isRGUKTian;
      setIsRGUKTian(isRGUKTianValue === "yes");
    } catch (error) {
      console.error('Error checking if RGUKTian:', error);
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

  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };

  return (
    <>
       <div>
                <style>
                    {`
                    body {
                    
                      background:lightblue;
                  }

                `}
                </style>
      <div className="home-container">
        <img
          src={image}
          alt="Uploaded"
          style={{ borderRadius: '50%', width: '150px', height: '150px', marginTop: '-2%', float: 'left' }}
        />
        <header className="header" style={{background:'rgba(255, 215, 255, 0.1) '}}>
          <div className="welcome" style={{ fontSize: '35px', fontWeight: 'bold' }}>
            Welcome, {name}
          </div>
        </header>
      </div>
      <div className="cont">
        <p>Click on image to get pdf</p>
      </div>
      <NotificationContainer>
        {showMessages && <Messages email={email} />}
      </NotificationContainer>
      <div className="module-uploaded-posts">
        <h1 className="upload" style={{top:'-30%',left:'-30%'}}>MY Posts</h1>
        <Upload email={email} />
      </div>
      <div className="module-downloaded-posts"></div>
      <div>
        <SvgIcon onClick={toggleMessages}>
          {showMessages ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" role="img" alt="Close icon" className="bi bi-x">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" alt="Chat icon" className="tawk-min-chat-icon">
              <path fillRule="evenodd" clipRule="evenodd" d="M400 26.2c-193.3 0-350 156.7-350 350 0 136.2 77.9 254.3 191.5 312.1 15.4 8.1 31.4 15.1 48.1 20.8l-16.5 63.5c-2 7.8 5.4 14.7 13 12.1l229.8-77.6c14.6-5.3 28.8-11.6 42.4-18.7C672 630.6 750 512.5 750 376.2c0-193.3-156.7-350-350-350zm211.1 510.7c-10.8 26.5-41.9 77.2-121.5 77.2-79.9 0-110.9-51-121.6-77.4-2.8-6.8 5-13.4 13.8-11.8 76.2 13.7 147.7 13 215.3.3 8.9-1.8 16.8 4.8 14 11.7z"></path>
            </svg>
          )}
        </SvgIcon>
      </div></div>
    </>
  );
};

export default HomePage;
