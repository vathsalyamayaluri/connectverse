import React, { useState, useEffect } from 'react';
import './admin.css';
import axios from 'axios';
import { BACKEND_URL } from '../Services/Helper';

function HomePage() {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllData = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/admin`);
            setAllData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <div className="ce">
            {/* Navigation Bar */}
            <nav className="na">
                <h1>Connect Verse</h1>
                <div className="nav-icons">
                    <a href="#">
                        <i className="fas fa-user-edit"></i>
                    </a>
                </div>
            </nav>

            {/* Display Data */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="grid-container">
                    {allData.map((el) => (
                        <div key={el.id} className="grid-item">
                            <p>{el.name}</p>
                            <p>{el.email}</p>
                            <p>{el.subject}</p>
                            <p>{el.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HomePage;
