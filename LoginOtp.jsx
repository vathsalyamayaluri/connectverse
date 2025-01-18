import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { sentOtpFunction } from "../Services/Apis";
import Spinner from 'react-bootstrap/Spinner';
import 'react-toastify/dist/ReactToastify.css';
import './LoginEmail.css';

const Login = () => {

    const [email, setEmail] = useState("");
    const [spiner,setSpiner] = useState(false);

    const navigate = useNavigate();
    const sendOtp = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Enter Your Email !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        } else {
            setSpiner(true)
            const data = {
                email: email
            }

            const response = await sentOtpFunction(data);

            console.log(response)
            if(response.status==200){
                toast.success("Email sent to your Mail ", {
                    position: "top-right", 
                    className: 'toast-align-right'
                  })
                  
                setTimeout(()=>{
                    navigate("/user/otp",{state:email})
                },1000)
               
            }else{
                toast.error(response.response.data.error)
            }
        }
    }

    return (
        <>
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
      <form>
      <h1 style={{fontSize:'30px'}}>Welcome Back, Log In</h1>
                        <p style={{fontSize:'13px',color:'gray',textAlign:'center'}}>Hi, we are you glad you are back. Please login.</p>
                   
            <div className="input-box">
            <input type="email" name="email" id="" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address' />
                            
                <i class='bx bx-user-circle'></i>
            </div>
            <button className='b1' onClick={sendOtp}>Login
                        {
                            spiner ? <span><Spinner animation="border" /></span>:""
                        }
                        </button>
            <div class="register-link">
                <p>Don't have an account?<NavLink to="/signup">Register</NavLink></p>
            </div>
        </form>
        <ToastContainer className="toast-container" />
    </div>
           </div>
        </>
    )
}

export default Login