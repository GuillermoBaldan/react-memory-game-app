import React, { useState, useEffect } from 'react';
import Card from './Card';
import './MemoryGame.css';

const cardImages = [
  { src: '/img/A9-Agera-RS.jpg', matched: false },
  { src: '/img/Arese RH95 Vento D´Oro.jpg', matched: false },
  { src: '/img/aston-martin-vantage-gt4.jpg', matched: false },
  { src: '/img/camaro.jpg', matched: false },
  { src: '/img/Bugatti Chiron.jpg', matched: false },
  { src: '/img/Ford Mustang.jpg', matched: false },
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Mezcla y duplica las cartas
  useEffect(() => {
    const shuffledCards = shuffleArray([...cardImages, ...cardImages]).map(card => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
  }, []);

  const handleChoice = (card) => {
    if (disabled) return;

    if (!firstChoice) {
      setFirstChoice(card);
    } else if (!secondChoice && card.id !== firstChoice.id) {
      setSecondChoice(card);
    }
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        // Si coinciden
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        // Si no coinciden, reiniciar después de 1 segundo
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="memory-game">
      <div className="card-grid">
        {cards.map(card => (
          <Card 
            key={card.id}
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === firstChoice || card === secondChoice || card.matched} 
            disabled={disabled} 
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
