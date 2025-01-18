import React, { useState, useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Navbar1 from './Navbar1';
import MessageFormModal from './ModalMes';
import { BACKEND_URL } from '../Services/Helper';
import './styles.css';

function File() {
  const [allImg, setAllImg] = useState([]);
  const [projects, setProjects] = useState("projects");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailForModal, setEmailForModal] = useState('');
  const [isRGUKTian, setIsRGUKTian] = useState(false);

  const location = useLocation();
  const email = location.state.username;

  useEffect(() => {
    fetchImg();
    checkIsRGUKTian();
  }, []);

  const fetchImg = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/getImg?category=${projects}`);
      const data = await res.json();
      setAllImg(data.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const checkIsRGUKTian = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/getIsRGUKTian/${email}`);
      const isRGUKTianValue = response.data.isRGUKTian;
      setIsRGUKTian(isRGUKTianValue === "yes");
    } catch (error) {
      console.error('Error checking if RGUKTian:', error);
    }
  };

  const openModal = (email) => {
    setEmailForModal(email);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const displayPdf = (pdfPath) => {
    setPdfUrl(`${BACKEND_URL}/uploads/${pdfPath}`);
    setModalIsOpen(true);
  };

  const toggleDescription = (description) => {
    setSelectedDescription(selectedDescription === description ? null : description);
  };

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.card');
        const navbar = document.querySelector('.navbar');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.2 || rect.bottom > 0) {
          card.style.backgroundColor = ' rgba(255, 215, 255, 0.1);';
          navbar.style.backgroundColor='violet';
          body.style.backgroundColor='violet';
        } else {
          card.style.backgroundColor = ' rgba(255, 215, 255, 0.1) ';
          body.style.backgroundColor='violet';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">Connect Verse</h1>
          <ul className="nav-links">
            <li><a href=""><Link to='/home'>Home</Link></a></li>
            <li><a href="#"><Link to='/about'>About</Link></a></li>
           
            <li><a href="#"><Link to='/contact'>Contact</Link></a></li>
          </ul>
        </div>
      </nav>

      <div className="alert">Click on the image to get the document.</div>

      <div className=" card-container">
        <div className="card-row">
          {allImg.map((el, index) => (
            <div key={index} className="card" style={{backgroundColor:'white'}}>
              <img
                src={`${BACKEND_URL}/uploads/${el.image}`}
                alt={`Image ${index}`}
                
                onClick={() => displayPdf(el.pdf)}
              />
              <div className="card-content">
                <h3 className="card-title">{el.title}</h3>
                <p className="card-description">
                  {selectedDescription === el.description ? el.description : `${el.description.substring(0, 50)}...`}
                  <button onClick={() => toggleDescription(el.description)}>Read More</button>
                </p>
                <p>Email: {el.email}</p>
                <button onClick={() => openModal(el.email)}>Message</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MessageFormModal isOpen={isModalOpen} onClose={closeModal} Remail={emailForModal} Semail={email} />

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <button onClick={() => setModalIsOpen(false)}>Close document</button>
        <iframe src={`${pdfUrl}`} width="100%" height="600px" title="PDF Viewer"></iframe>
      </Modal>
    </>
  );
}

export default File;
