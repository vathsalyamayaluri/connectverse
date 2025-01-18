import React, { useState } from 'react';
import './Contact.css'; 
import axios from 'axios';
import { BACKEND_URL } from '../Services/Helper';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_URL}/contactus`, formData);
            if (res.data.message) {
                alert(res.data.message);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Error creating user. Please try again later.');
        }
    };

    return (
        <div style={{ backgroundColor: '#2e2e2e' }}>
            <div className="container5">
                <main className="row">
                    <section className="col left">
                        <div className="contactTitle">
                            <h2>Get In Touch</h2>
                        </div>
                        <div className="contactInfo">
                            <div className="iconGroup">
                                <div className="icon">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <div className="details">
                                    <span>Phone</span>
                                    <span>+00 110 111 00</span>
                                </div>
                            </div>
                            <div className="iconGroup">
                                <div className="icon">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div className="details">
                                    <span>Email</span>
                                    <span>name.tutorial@gmail.com</span>
                                </div>
                            </div>
                            <div className="iconGroup">
                                <div className="icon">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className="details">
                                    <span>Location</span>
                                    <span>X Street, Y Road, San Francisco</span>
                                </div>
                            </div>
                        </div>
                        <div className="socialMedia">
                            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#"><i className="fa-brands fa-twitter"></i></a>
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                    </section>
                    <section className="col right">
                        <form className="messageForm" onSubmit={handleSubmit}>
                            <div className="inputGroup halfWidth">
                                <input type="text" name="name" required="required" onChange={handleChange} />
                                <label>Your Name</label>
                            </div>
                            <div className="inputGroup halfWidth">
                                <input type="text" name="email" required="required" onChange={handleChange} />
                                <label>Email</label>
                            </div>
                            <div className="inputGroup fullWidth">
                                <input type="text" name="subject" required="required" onChange={handleChange} />
                                <label>Subject</label>
                            </div>
                            <div className="inputGroup fullWidth">
                                <textarea name="description" required="required" value={formData.description} onChange={handleChange}></textarea>
                                <label>Say Something</label>
                            </div>
                            <div className="inputGroup fullWidth">
                                <button type="submit">Send</button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default ContactPage;
