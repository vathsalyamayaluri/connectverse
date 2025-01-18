import React from 'react';
import {Link,Routes,Route} from 'react-router-dom';
import Home from'./Home';
import './First.css';

const HomePage = () => {
    return(
        <>
            <div className="contain">
                <video autoPlay loop muted playsInline className="background-clip">
                    <source src="First.mp4" type="video/mp4" />
                </video>
                <div className="co">
                    <h1>Connect Verse</h1>
            <Link to="/home1" className="view-website-link">  View Website </Link>
                </div>
                <div>
                    <Routes>
                        <Route path="/home1" element={<Home /> } />
                    </Routes>
                </div>
                </div>
        </>
    );
}

export default HomePage;

              