import React, { useEffect } from 'react';
import { getStatus } from '../Helpers';

function FinalMessage({
  selectedWord,
  wrongLetters,
  correctLetters,
  setPlayable,
  playAgain,
}) {
  let finalMsg = '';
  let playable = true;

  if (getStatus(selectedWord, correctLetters, wrongLetters) === 'win') {
    finalMsg = `Congratulations! You won! 😃`;
    playable = false;
  } else if (getStatus(selectedWord, correctLetters, wrongLetters) === 'lose') {
    finalMsg = `Unfortunately you lost.😕`;
    playable = false;
  }

  useEffect(() => setPlayable(playable));

  return (
    <div
      className="popup-container"
      style={finalMsg !== '' ? { display: 'flex' } : {}}
    >
      <div className="popup">
        <h2>{finalMsg}</h2>
        <h3>...the word was: {selectedWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
}

export default FinalMessage;
