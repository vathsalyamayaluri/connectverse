import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('abt');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
};
const scrollTocontact = () => {
  const aboutSection = document.getElementById('cnt');
  aboutSection.scrollIntoView({ behavior: 'smooth' });
};
const scrollToFooter = () => {
  const aboutSection = document.getElementById('foot');
  aboutSection.scrollIntoView({ behavior: 'smooth' });
};

  return (
    <>
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo" id="logo">Connect Verse</Link>
      </div>
      <ul className="navbar-nav">
<li className="nav-item">
<NavLink
  exact
  to="/home"
  className="nav-link"
  activeClassName="active-link"
  activeStyle={{ backgroundColor: 'white', color: '#333' }}
>
  Home
</NavLink>

</li>
<li className="nav-item">
<Link onClick={scrollToAbout} className="nav-link">About</Link>
</li>
<li className="nav-item">
<Link onClick={scrollToFooter} className="nav-link">Services</Link>
</li>
<li className="nav-item">
<Link onClick={scrollTocontact} className="nav-link">Contact</Link>
</li>
</ul>
    </nav>
        
        </>
  );
};

export default Navbar;
