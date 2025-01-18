import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { userVerify } from "../Services/Apis";
import 'react-toastify/dist/ReactToastify.css';
import './Otp.css'; 

import { BACKEND_URL } from '../Services/Helper';
import axios from 'axios';
const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const location = useLocation();
  const navigate = useNavigate();
  const otpBoxes = useRef([]);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpBoxes.current[index + 1].focus();
    }
  };

  const LoginUser = async (e) => {
    e.preventDefault();

    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      toast.error("Enter a valid OTP");
      return;
    }

    const data = {
      otp: enteredOtp,
      email: location.state
    };

    try {
      const verifyResponse = await userVerify(data);
      if (verifyResponse.status === 200) {
        localStorage.setItem("userdbtoken", verifyResponse.data.userToken);
        localStorage.setItem('isLogged', true);
        localStorage.setItem('emailsai', data.email);
        toast.success(verifyResponse.data.message);
        const isRGUKTianResponse = await axios.get(`${BACKEND_URL}/getIsRGUKTian/${data.email}`);
        const isRGUKTian = isRGUKTianResponse.data.isRGUKTian;

        setTimeout(() => {
          toast.success("Login Successful", {
            position: "top-right", 
            className: 'toast-align-left'
          });
          navigate(isRGUKTian === "yes" ? "/home" : "/home1");
        }, 1000);
      } else {
        toast.error(verifyResponse.response.data.error);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
  
          
      
        <div className='otp'>
        <style>
                {`
                    body {
                      display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background:;
    color:black;
    background-size: cover;
    background-position: center;
                    }
                `}
            </style>
            <div className='wrap'>
            <h1 style={{color:'white'}}>Please Enter Your OTP Here</h1><br/><br/>
          <form>
            <div className="otp-container">
              {otp.map((digit, index) => (
                <div
                  key={index}
                  className="otp-box"
                  contentEditable
                  maxLength={1}
                  onInput={(e) => handleOtpChange(index, e.target.textContent)}
                  ref={(el) => (otpBoxes.current[index] = el)}
                ></div>
              ))}
            </div><br/><br/>
            <button className='b1' id="b09" onClick={LoginUser}>Submit</button>
          </form>
          </div>
        </div>
        <ToastContainer />
    </>
  );
};

export default Otp;



