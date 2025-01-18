import React, { useState } from 'react';
import LoginFormWithEmail from './LoginEmail';
import { useLocation } from 'react-router-dom';
import LoginFormWithOTP from './LoginOtp';
import './Options.css';
const LoginFormContainer = () => {
    const [showEmailLoginForm, setShowEmailLoginForm] = useState(true);
    const toggleLoginForm = (value) => {
        setShowEmailLoginForm(value);
    };

    return (
        <div className="container1">
            <div className="buttons-container">
                <button
                    className={`login-button ${showEmailLoginForm ? 'active' : ''}`}
                    onClick={() => toggleLoginForm(true)}
                >
                    Login with Email
                </button>
                <button
                    className={`login-button ${showEmailLoginForm ? '' : 'active'}`}
                    onClick={() => toggleLoginForm(false)}
                >
                    Login with OTP
                </button>
            </div>
            <div className="forms-container1">
                <div className="form2">
                    {showEmailLoginForm ? <LoginFormWithEmail /> : <LoginFormWithOTP />}
                </div>
            </div>
        </div>
    );
};

export default LoginFormContainer;
