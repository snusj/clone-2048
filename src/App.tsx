//import './reset.css';
import './styles.css';

//import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';

//import Board from './components/Board';
import { Score } from './components/Score';
import Game from './Game';

export const App = () => {
  //const [score, setScore] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  return (
    <div className="app">
      <Score score={score} bestScore={bestScore} message={message} />
      <Game setScore={setScore} setMessage={setMessage} />
    </div>
  );
};
