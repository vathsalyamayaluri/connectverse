import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { registerfunction } from "../Services/Apis";
import { NavLink, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./Signup.css";

const Register = () => {
    const [passhow, setPassShow] = useState(false);
    const [inputdata, setInputdata] = useState({
        fname: "",
        email: "",
        password: "",
        confirmPassword: "", // Added confirm password state
        mobile: "",
        isRGUKTian: "",
        RGUKTianID: "",
        image:''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputdata({ ...inputdata, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fname, email, password, confirmPassword, mobile, isRGUKTian, RGUKTianID } = inputdata;

        if (fname === "") {
            toast.error("Enter Your Name");
        } else if (email === "") {
            toast.error("Enter Your Email");
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email");
        } else if (password === "") {
            toast.error("Enter Your Password");
        } else if (password.length < 6) {
            toast.error("Password length must be minimum 6 characters");
        } else if (confirmPassword === "") {
            toast.error("Confirm Your Password");
        } else if (password !== confirmPassword) { // Check if passwords match
            toast.error("Passwords do not match");
        } else if (mobile === "") {
            toast.error("Enter Your Mobile Number");
        } else if (mobile.length !== 10) {
            toast.error("Mobile number must be 10 digits");
        } else if (!/^\d{10}$/.test(mobile)) {
            toast.error("Enter Valid Mobile Number");
        } else {
            const response = await registerfunction(inputdata);
            if (response.status === 200) {
                console.log(response);
                setInputdata({ ...inputdata, fname: "", email: "", password: "", confirmPassword: "", mobile: "", isRGUKTian: "", RGUKTianID: "" });
                toast.success("Registration Successful", {
                   
                });

                setTimeout(() => {
                    navigate("/options")
                }, 1000);
            } else {
                toast.error(response.response.data.error);
            }
        }
    }

    return (
        <>
            <div>
                <style>
                    {`
                    body {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 100vh;
                      background:url('otpback.avif');
                      background-size: cover;
                      background-position: center;
                      font-family: Poppins, sans-serif;
                    }
                `}
                </style>
                <div className="wrapp">
                    <form>
                        <h1>Registration</h1>
                        <div className="input-box1">
                            <div className="input-field1">
                                <input type="text" name="fname" onChange={handleChange} placeholder='Enter Your Name' />
                                <i className='bx bxs-user'></i>
                            </div>
                            <div className="input-field1">
                                <input type="text" placeholder="User Name" required />
                                <i className='bx bxs-user'></i>
                            </div>
                        </div>
                        <div className="input-box1">
                            <div className="input-field1">
                                <input type="email" name="email" onChange={handleChange} placeholder='Enter Your Email Address' />
                                <i className='bx bxs-envelope'></i>
                            </div>
                            <div className="input-field1">
                                <input type="text" name="mobile" onChange={handleChange} placeholder="Enter Your Mobile Number" />
                                <i className='bx bx-phone'></i>
                            </div>
                        </div>
                        <div className="input-box1">
                            <div className="input-field1">
                                <input type={passhow ? 'text' : 'password'} name="password" onChange={handleChange} placeholder='Enter Your password' />
                                <i className='bx bxs-lock-alt'></i>
                            </div>
                            <div className="input-field1">
                                <input type={passhow ? 'text' : 'password'} name="confirmPassword" onChange={handleChange} placeholder="Confirm Password" />
                                <i className='bx bxs-lock-alt'></i>
                            </div>
                        </div>
                     
                        <div className="input-field1">
                            Are you from RGUKT? <input type="radio" name="isRGUKTian" onChange={handleChange} value="yes" /> YES <input type="radio" name="isRGUKTian" onChange={handleChange} value="no" /> NO
                        </div>
                        {inputdata.isRGUKTian === 'yes' &&
                            <input type="text" name="RGUKTianID" style={{ background: ' transparent', border: ' 2px solid rgba(255,255, 255, .2)', color: ' #fff', outline: 'none' }} onChange={handleChange} placeholder="Enter Your RGUKTian ID" />
                        }
                        <label><input type="checkbox" />I hereby declare that the above information provided is true and correct</label>
                        <button type="submit" onClick={handleSubmit} className="btn">Register</button>
                        <div className="register-link" style={{ marginTop: '30px', textAlign: 'center' }}>
                            <p>Already have an account?<NavLink to="/options">Login</NavLink></p>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Register;
