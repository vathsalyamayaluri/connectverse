import React, { useEffect ,useState} from 'react';
import { useLocation, useNavigate,NavLink } from 'react-router-dom';
import './Home.css';
import { FaUserCircle } from 'react-icons/fa';
import { FaSignOutAlt,FaSignInAlt } from 'react-icons/fa'; 
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
            navigate('/options',{state:{idno:""}});
        }
    };
    const handleClick2 = () => {
        if (localStorage.getItem('isLogged')) {
            navigate('/notes', { state: { username: email } });
        } else {
            navigate('/options');
        }
    };
    const handleClick3=()=>{
        if(localStorage.getItem('isLogged')){
            navigate('/records',{state:{username:email}});
        }else{
            navigate('/options')
        }
    }
    const handleClick4=()=>{
        if(localStorage.getItem("isLogged")){
            navigate('/arts',{state:{username:email}})
        }else{
            navigate('/options')
        }
    }
    const handleLogout = () => {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('emailsai');
        navigate('/options');
    };
    const handlelogin=()=>{      
        navigate('/options')
}

    const handleProfileClick = () => {
        navigate('/profile',{ state:{username:email}});
    };
    
    return (
        <>
         
  <div className="home">
  
                <div className="top-nav">
                    <img src="log.png" className="logo"/>
                    <nav>
                        <ul>
                            <li><a href="">HOME</a></li>
                            <li><a href="">SERVICES</a></li>
                            <li><a href="">ABOUT</a></li>
                            <li><a href="">CONTACT</a></li>
                            <li>
                            <div className="sidebar-container">
            <img src="menu.png" className="menu-icon"  onClick={toggleMenu} alt="menu" />
            {menuOpen && (
                <div className="sidebar">
                    <button className="close-btn" onClick={toggleMenu}>X</button><br/><br/>
                    <ul className='ul'>
                        <li><NavLink
  exact
  to="/home"
  className="nav-link"
  activeClassName="active-link"

>
  Home
</NavLink></li><br/>
                        <li><NavLink
  exact
  to="/home"
  className="nav-link"
  activeClassName="active-link"

>
Services
</NavLink></li><br/>
                        <li><NavLink
  exact
  to="/home"
  className="nav-link"
  activeClassName="active-link"

>
About
</NavLink></li><br/>
                        <li><NavLink
  exact
  to="/home"
  className="nav-link"
  activeClassName="active-link"

>
Contact
</NavLink></li><br/>
                        {!localStorage.getItem('isLogged') && (
                            <li><button onClick={handlelogin} className="close-btn1"><FaSignInAlt className="logout-icon" />Login</button></li>
                        )}
                        {localStorage.getItem('isLogged') && (
                            <li><button onClick={handleLogout} className="close-btn1"><FaSignOutAlt className="logout-icon" />Logout</button></li>
                        )}
                        {localStorage.getItem('isLogged') && (
                            <li><button onClick={handleProfileClick} className="close-btn1"><FaUserCircle className="logout-icon" />Profile</button></li>
                        )}
                    </ul>
                </div>
            )}
        </div>
                            </li>
                        </ul>
                    </nav>
                    
                </div>

                <div className="mainrow">
                    <div className="column">
                        <h1 className='h1'>CONNECT UNIVERSE</h1>
                        <p>Let's explore the knowledge with the tech universe Connect Universe.</p>
                        <button type="button">EXPLORE</button>
                    </div>
                    <div className="column1">
                        {/* Cards with scrolling options */}
                        <div className="scrolling-container">
                            <div className="scrolling-wrapper">
                                {/* Add multiple cards here */}
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
                                {/* Add more cards as needed */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;