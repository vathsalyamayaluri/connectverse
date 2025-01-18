import React, { useEffect, useState } from 'react';
import Navbar from './Navbar1';
import {BACKEND_URL} from '../Services/Helper';
import MessageFormModal from './ModalMes';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import './Arts.css';
function File() {
  const [allData, setAllData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [arts,setpro]=useState("arts");
    const location = useLocation();
    const email = location.state.username;
    const [isRGUKTian, setIsRGUKTian] = useState(false);
    const [emailForModal, setEmailForModal] = useState('');
    
    const openModal = (email) => {
        setEmailForModal(email);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
  
    const fetchImg = async () => {
        const res = await fetch(`${BACKEND_URL}/getImg?category=${arts}`);
        const data = await res.json();
        setAllData(data.data);
    }

    const checkIsRGUKTian = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/getIsRGUKTian/${email}`);
            const isRGUKTianValue = response.data.isRGUKTian;
          console.log(isRGUKTianValue)
          setIsRGUKTian(isRGUKTianValue === "yes");
    
        } catch (error) {
          console.error('Error checking if RGUKTian:', error);
        }
      };

    useEffect(() => {
        fetchImg();
        checkIsRGUKTian();
    }, []);

    return (
        <>
         <div>
                <style>
                    {`
                    body {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 100vh;
                      background:url('v897-bird-15-g.jpg');
                     /* background:url('art1.avif');*/
                      background-size: cover;
                      background-position: center;
                      font-family: 'Times New Roman', Times, serif;
                    }
                `}
                </style>
      
           <Navbar username={email} isRGUKTian={isRGUKTian} />
            <div className='ImageContainer'  >
        <div className='allimg' >
            {allData
            .map((el, index) => (
                <div key={index} className="card5" id="card5" >
                   
                   <img src={`${BACKEND_URL}/uploads/${el.image}`}/>
                      <div className="card-body">
                      <p>{el.email}</p>
                      <button onClick={() => openModal(el.email)}>Message</button>
                      <MessageFormModal isOpen={isModalOpen} onClose={closeModal} Remail={emailForModal} Semail={email}/>
                    </div>
                </div>
            ))}
        </div>
    </div>
         </div>
        </>
    );
}

export default File;
