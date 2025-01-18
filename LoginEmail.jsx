import React, { useState, useEffect } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BACKEND_URL } from '../Services/Helper';
import './LoginEmail.css';
const LoginForm = () => {
    const [isRGUKTian, setIsRGUKTian] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email.trim() === "") {
            toast.error("Enter Your Email");
            return;
        } else if (formData.password.trim() === "") {
            toast.error("Password cannot be null");
            return;
        }
            else if(formData.email==="admin@gmail.com") {
                navigate('/admin')
            }
        else {
            axios.post(`${BACKEND_URL}/login`, formData)
                .then(async (result) => {
                    if (result.data === "successful") {
                        toast.success("Login Successful")
                        // Store login status and email in local storage
                        localStorage.setItem('isLogged', true);
                        localStorage.setItem('emailsai', formData.email);

                        // Fetch isRGUKTian value from the backend based on email
                        const response = await axios.get(`${BACKEND_URL}/getIsRGUKTian/${formData.email}`);
                        const isRGUKTianValue = response.data.isRGUKTian;
                        setIsRGUKTian(isRGUKTianValue);

                        setTimeout(() => {
                            if (isRGUKTianValue === "yes") {
                                navigate("/home");
                            }
                      
                            else {
                                navigate("/home1");
                            }
                        }, 1000);
                    } else {
                        toast.error(result.data);
                    }
                })
                .catch(err => console.log(err));
        }
    };

    useEffect(() => {
        localStorage.setItem('isLoggedIn', false);
    }, []);

    return (
        <div>
            <style>
                {`
                    body {
                        background: url('otpback.avif') no-repeat;
                        background-size: cover;
                        background-position: center;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        font-family: Poppins, sans-serif;
                    }
                `}
            </style>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email Address" />
                        <i className='bx bx-user-circle'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" name="password" onChange={handleChange} placeholder='Enter Your password' />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className="b1">Login</button>
                    <div className="register-link">
                        <p>Don't have an account?<NavLink to="/signup">Register</NavLink></p>
                    </div>
                </form>
                <ToastContainer className="toast-container" />
            </div>
        </div>
    );
};

export default LoginForm;
