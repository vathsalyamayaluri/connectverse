import React from 'react';
import './Footer.css'; 
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'; 
function Footer() {
    return (
       <div className="footer-container">
            <div className="footer-section">
                <h3>Our Websites</h3>
                <p>Website 1: www.scholarship.com</p>
                <p>Website 2: www.placementMaker.com</p>
                <p>Website 3: www.Yoga.com</p>
                <p>Website 4: www.organicfarming.com</p>
                <p>Website 5: www.sportx.com</p>
            </div>
            <div className="footer-line"></div>
            <div className="footer-section">
                <h4>Follow Us</h4>
                <div className="social-icons">
                <FaFacebook style={{ color: 'blue' }} />
                <FaLinkedin style={{ color: 'navy' }} />
                <FaTwitter style={{ color: '#1DA1F2' }}/>
                <FaInstagram style={{ color: 'hotpink' }} />

                </div>
               <p className='p'>Stay connected with us on social media to get updates.</p>
                <p className='p'>You can also contact us via email:example@gmail.com</p>
                <p className='p'>Address: 123 Main Street, City, Country</p>
            </div>
       </div>
    );
}

export default Footer;
