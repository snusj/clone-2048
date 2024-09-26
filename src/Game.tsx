import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import {
  checkWin,
  emptyBoard,
  isOver,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  randomTile,
} from './components/Board';
import { Tile } from './components/Tile';

const Game = ({
  setScore,
  setMessage,
}: {
  setScore: Dispatch<SetStateAction<number>>;
  setMessage: Dispatch<SetStateAction<string>>;
}) => {
  const [board, updateBoard] = useState(randomTile(emptyBoard()));
  const [finished, setFinished] = useState(false);

  const checkEnd = () => {
    if (!finished) {
      if (checkWin(board)) {
        alert('You win!');
        setMessage('You win!');
        setFinished(true);
        //setScore(v => v + 1);
      } else if (isOver(board)) {
        alert('Game over!');
        setMessage('Game over!');
        setFinished(true);
        //setScore(v => v - 1);
      }
    }
  };

  const left = () => {
    const newBoard = moveLeft(board, setScore);
    updateBoard(randomTile(newBoard));
    checkEnd();
  };

  const right = () => {
    const newBoard = moveRight(board, setScore);
    updateBoard(randomTile(newBoard));
    checkEnd();
  };

  const up = () => {
    const newBoard = moveUp(board, setScore);
    updateBoard(randomTile(newBoard));
    checkEnd();
  };

  const down = () => {
    const newBoard = moveDown(board, setScore);
    updateBoard(randomTile(newBoard));
    checkEnd();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    //if(!isOver(board)){
    switch (e.key) {
      case 'ArrowLeft':
        left();
        break;
      case 'ArrowRight':
        right();
        break;
      case 'ArrowUp':
        up();
        break;
      case 'ArrowDown':
        down();
        break;
      default:
    }
    //}
  };
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });
  return (
    <div className="game">
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((value, j) => (
              <Tile
                key={i * 4 + j}
                id={i * 4 + j}
                position={[j, i]}
                value={value}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
