import React, { useRef } from 'react';
import './card.css'; // Assuming you have a CSS file for styling
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'; // Import icons for scrolling

const CardList = () => {
  const cardListRef = useRef(null);

  const scrollLeft = () => {
    if (cardListRef.current) {
      cardListRef.current.scrollBy({
        left: -200, // Adjust scroll distance as needed
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (cardListRef.current) {
      cardListRef.current.scrollBy({
        left: 200, // Adjust scroll distance as needed
        behavior: 'smooth',
      });
    }
  };

  // Sample data for the cards
  const cardsData = [
    {
      title: 'Full-Stack Development',
      description: 'Learn how to build modern web applications using MERN stack.',
      imageUrl: 'full.jpeg', // Replace with the actual image URL
    },
    {
      title: 'Machine Learning Basics',
      description: 'Introduction to machine learning algorithms and concepts.',
      imageUrl: 'ml.jpeg', // Replace with the actual image URL
    },
    {
        title: 'Artifical Intelligence Basics',
        description: 'Introduction to machine learning algorithms and concepts.',
        imageUrl: 'ai.jpeg', // Replace with the actual image URL
      },
      {
        title: 'Machine Learning Basics',
        description: 'Introduction to machine learning algorithms and concepts.',
        imageUrl: 'es.jpeg', // Replace with the actual image URL
      },
      {
      title: 'Machine Learning Basics',
      description: 'Introduction to machine learning algorithms and concepts.',
      imageUrl: 'ml.jpeg', // Replace with the actual image URL
    },

    {
      title: 'Artificial Intelligence Fundamentals',
      description: 'Explore the foundations of artificial intelligence and its applications.',
      imageUrl: 'ai.jpeg', // Replace with the actual image URL
    },
    // Add more cards as needed
  ];

  return (
    <div className="card-list-container">
      <button className="scroll-button" onClick={scrollLeft}><IoChevronBack /></button>
      <div className="card-list-scroll-container" ref={cardListRef}>
        <div className="card-list">
          {cardsData.map((card, index) => (
            <div className="card" key={index}>
              <img src={card.imageUrl} alt={card.title} className="card-image" />
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="scroll-button" onClick={scrollRight}><IoChevronForward /></button>
    </div>
  );
};

export default CardList;
