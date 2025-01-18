import React, { useState } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import './Home.css';
import { FaUserCircle, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'; // Importing necessary icons

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let email = localStorage.getItem('emailsai') || '';
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClick1 = () => {
        if (localStorage.getItem('isLogged')) {
            navigate('/projects', { state: { username: email } });
        } else {
            navigate('/options', { state: { idno: '' } });
        }
    };

    const handleClick2 = () => {
        if (localStorage.getItem('isLogged')) {
            navigate('/notes', { state: { username: email } });
        } else {
            navigate('/options');
        }
    };

    const handleClick3 = () => {
        if (localStorage.getItem('isLogged')) {
            navigate('/records', { state: { username: email } });
        } else {
            navigate('/options');
        }
    };

    const handleClick4 = () => {
        if (localStorage.getItem('isLogged')) {
            navigate('/arts', { state: { username: email } });
        } else {
            navigate('/options');
        }
    };

    const handleAboutClick = () => {
        // Scroll to the about section
        const aboutSection = document.getElementById('about');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    };

    const handleLogout = () => {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('emailsai');
        navigate('/options');
    };

    const handlelogin = () => {
        navigate('/options');
    };

    const handleabout = () => {
        navigate('/about');
    };

    const handlecontact = () => {
        navigate('/contact');
    };

    const handleProfileClick = () => {
        navigate('/profile', { state: { username: email } });
    };

    const handleProfileClick1 = () => {
        navigate('/profile2', { state: { username: email } });
    };

    return (
        <>
            <div className="home">
                <div className="top-nav">
                    <img src="log.png" className="logo" />
                    <nav>
                        <ul>
                            <li><a href="">HOME</a></li>
                            <li><a href="">SERVICES</a></li>
                            <li><a href="/about">ABOUT</a></li>
                            <li><a href="/contact">CONTACT</a></li>
                            <li>
                                <FaUserCircle className="profile" onClick={toggleMenu} id="img" style={{ color: 'white', fontSize: '30px' }} />
                                {menuOpen && (
                                    <ul className="sidebar">
                                        {!localStorage.getItem('isLogged') && (
                                            <li><button onClick={() => navigate('/options')} className="submenu-item">LOGIN</button></li>
                                        )}
                                        {localStorage.getItem('isLogged') && (
                                            <>
                                                  <li><button onClick={handleProfileClick1} className="submenu-item">My DASHBOARD</button></li>
                                            </>
                                        )}
                                        {localStorage.getItem('isLogged') && (
                                            <li><button onClick={() => {
                                                localStorage.removeItem('isLogged');
                                                localStorage.removeItem('emailsai');
                                                navigate('/options');
                                            }} className="submenu-item">LOGOUT</button></li>
                                        )}
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="mainrow">
                    <div className="column">
                        <h1 className='h1'>CONNECT <span className="space-before-verse">VERSE</span></h1>
                        <p className='p' style={{ textAlign: 'center' }}>Let's explore the knowledge with the tech Connect verse.Connect Verse is a platform or concept that aims to bring together various elements or entities in a cohesive and interconnected manner.</p>
                        <button type="button" id="explore">EXPLORE</button>
                    </div>
                    <div className="column1">
                        <div className="scrolling-container">
                            <div className="scrolling-wrapper">
                                <div className="maincard c1" onClick={handleClick1}>
                                    <h2>PROJECTS</h2>
                                    <p>All projects are here.</p>
                                </div>
                                <div className="maincard c2" onClick={handleClick3}>
                                    <h2>LAB MANUALS</h2>
                                    <p>All lab manuals are here.</p>
                                </div>
                                <div className="maincard c3" onClick={handleClick2}>
                                    <h2>WRITTEN NOTES</h2>
                                    <p>All written notes and PDFs are here.</p>
                                </div>
                                <div className="maincard c4" onClick={handleClick4}>
                                    <h2>ART WORKS</h2>
                                    <p>All arts are here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
