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
      } else if (isOver(board)) {
        alert('Game over!');
        setMessage('Game over!');
        setFinished(true);
      }
    }
  };

  const move = (
    moveFunction: (
      board: Array<Array<number>>,
      setScore: Dispatch<SetStateAction<number>>,
    ) => number[][],
  ) => {
    const newBoard = moveFunction(board, setScore);
    updateBoard(randomTile(newBoard));
    checkEnd();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        move(moveLeft);
        break;
      case 'ArrowRight':
        move(moveRight);
        break;
      case 'ArrowUp':
        move(moveUp);
        break;
      case 'ArrowDown':
        move(moveDown);
        break;
      default:
    }
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
