import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
const Navbar1 = ({ username, isRGUKTian }) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-logo">Connect Verse</Link>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link
                        to={{
                            pathname: isRGUKTian ? "/home" : "/home1",
                            state: { username: username }
                        }}
                     
        
                       style={{fontSize:"25px",fontWeight:'bold'}}
                    >Home
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar1;
