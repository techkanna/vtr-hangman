import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import FigureContainer from './components/FigureContainer';
import FinalMessage from './components/FinalMessage';
import Notification from './components/Notification';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import { notification } from './Helpers';

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetter] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    function keyHandler(e) {
      if (playable && e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetter((c) => [...c, letter]);
          } else {
            notification(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((w) => [...w, letter]);
          } else {
            notification(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [playable, wrongLetters, correctLetters]);

  const playAgain = () => {
    setPlayable(true);

    setCorrectLetter([]);
    setWrongLetters([]);

    selectedWord = words[Math.floor(Math.random() * words.length)];
  };

  return (
    <>
      <Header />
      <div className="game-container">
        <FigureContainer wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>

      <FinalMessage
        selectedWord={selectedWord}
        wrongLetters={wrongLetters}
        correctLetters={correctLetters}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
