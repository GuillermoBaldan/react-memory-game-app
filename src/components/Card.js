// src/components/Card.js
import React from 'react';
import './Card.css';

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="Car" />
        <img className="back" src={process.env.PUBLIC_URL + '/img/card.jpeg'} alt="Card Back" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Card;
