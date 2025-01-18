import React, { useState } from 'react';
import './ImageSlider.css'; // Import your CSS file for styling if needed

const ImageSlider = () => {
    const [currentContentIndex, setCurrentContentIndex] = useState(0);
    const contents = [
        {
            title: 'Machine Learning',
            description: 'Explore the world of machine learning and its applications.',
            image: 'ml.jpeg', // Add image URL for machine learning
        },
        {
            title: 'Artificial Intelligence',
            description: 'Discover the fascinating field of artificial intelligence and its advancements.',
            image: 'ai.jpeg', // Add image URL for artificial intelligence
        },
        {
            title: 'Artificial Intelligence',
            description: 'Discover the fascinating field of artificial intelligence and its advancements.',
            image: 'full.jpeg', // Add image URL for artificial intelligence
        },
        {
            title: 'Artificial Intelligence',
            description: 'Discover the fascinating field of artificial intelligence and its advancements.',
            image: 'ai.jpeg', // Add image URL for artificial intelligence
        },
        {
            title: 'Artificial Intelligence',
            description: 'Discover the fascinating field of artificial intelligence and its advancements.',
            image: 'artificial-intelligence.jpg', // Add image URL for artificial intelligence
        },
        {
            title: 'Artificial Intelligence',
            description: 'Discover the fascinating field of artificial intelligence and its advancements.',
            image: 'artificial-intelligence.jpg', // Add image URL for artificial intelligence
        },
        // Add more content objects as needed
    ];

    const nextSlide = () => {
        setCurrentContentIndex((prevIndex) => (prevIndex === contents.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentContentIndex((prevIndex) => (prevIndex === 0 ? contents.length - 1 : prevIndex - 1));
    };

    return (
        <div class="scroll-container">
            <div class="scroll-wrapper">
                {contents.map((content, index) => (
                    <div class="car" key={index}>
                        {/* Render content dynamically */}
                        <img src={content.image} alt={content.title} />
                        <h2>{content.title}</h2>
                        <p>{content.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
