import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../Services/Helper';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state.username;

    const [userDetails, setUserDetails] = useState({
        email: email, 
        name: '',
        password: '',
        confirmPassword: '',
        mobile: ''
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const handleFileInputChange = (e) => {
        setImage(e.target.files[0]);
    };

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/getDetails/${email}`);
            const userData = response.data.data[0];
            if (userData) {
                const { fname, password, mobile } = userData;
                setUserDetails({
                    ...userDetails, 
                    name: fname,
                    password: password,
                    confirmPassword: password, // Assume confirmPassword is the same as password initially
                    mobile: mobile
                });
                setImage(userData.image);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, password, confirmPassword, mobile } = userDetails;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const formData = new FormData();
        
            formData.append('fname', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('mobile', mobile);
            if (image) {
                formData.append('image', image);
            }
    

            const response = await axios.post(`${BACKEND_URL}/updateProfile`, formData);
            if (response.data.success) {
                alert("Profile updated successfully");
                navigate('/home');
            } else {
                alert("Failed to update profile");
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    return (
        <div>
            <style>
                {`
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background:url('rrr.jpg');
                    background-size: cover;
                    background-position: center;
                    font-family: Poppins, sans-serif;
                }
                `}
            </style>

            <div className='wrapp'>
                <h1>Update Profile</h1>
              
                <form onSubmit={handleSubmit}>
                {image ? (
                    <div className="uploaded-image">
                        <img
                            src={`${BACKEND_URL}/uploads/${image}`}
                            alt="Uploaded"
                            style={{ float: 'right', marginTop: '-15%', width: '150px', height: '150px', borderRadius: '100%', marginLeft: '5px' }}
                            onClick={() => document.getElementById('fileInput').click()}
                        />
                    </div>
                ) : (
                    <img
                        src="art.jpeg"
                        style={{ float: 'right', marginTop: '-15%', width: '150px', height: '150px', borderRadius: '100%', marginLeft: '5px' }}
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
                  <div className="input-box1">
                      
               
                        <div className="input-field1">
                            <label htmlFor="fullName">Full Name:</label>
                            <input
                                type="text"
                                id="fullName"
                                value={userDetails.name}
                                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className='input-field1'>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={userDetails.email}
                                style={{cursor:'pointer'}}
                                disabled // This will prevent user input
                            />
                        </div>
                        </div>
                        <div className='input-box1'>
                        <div className='input-field1'>
                            <label htmlFor="password"  style={{marginTop:"30px"}}>Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={userDetails.password}
                                onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                                required
                            />
                        </div>
               

               
                        <div className='input-field1'>
                            <label htmlFor="confirmPassword"  style={{marginTop:"30px"}}>Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={userDetails.confirmPassword}
                                onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })}
                                required
                            />
               
                        </div>
                        <div className="input-field2">
                            <label htmlFor="mobile"  style={{marginTop:"50px"}}>Mobile Number:</label>
                            <input
                                type="tel"
                                id="mobile"
                                value={userDetails.mobile}
                                onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })}
                                required
                            />
                        </div>
                    </div><br/><br/><br/><br/>
                    
                    {/* Visible, but disabled email input field */}
                  

                    <button type="submit" className='b1'>Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
