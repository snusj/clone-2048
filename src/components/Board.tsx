//import Tile from './Tile';

import type { Dispatch, SetStateAction } from "react";

export const emptyBoard = () => {
  return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  //return Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
};

export const randomTile = (board: Array<Array<number>>) => {
  const emptyTiles: Array<[number, number]> = [];
  board.forEach((row, i) => {
    row.forEach((tile, j) => {
      if (tile === 0) {
        emptyTiles.push([i, j]);
      }
    });
  });

  if (emptyTiles.length === 0) {
    return board;
  }

  const tile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  if (tile != null) {
    const [i, j] = tile;
    if (board[i] != null && board[i][j] !== undefined) {
      board[i][j] = Math.random() < 0.9 ? 2 : 4;
    }
  }
  return board;
};

const isFull = (board: Array<Array<number>>) => {
  return !board.some((row) => row.includes(0));
};

const compress = (board: Array<Array<number>>): Array<Array<number>> => {
  return board.map((row) => {
    const newRow: number[] = row.filter((tile) => tile !== 0);
    const zeros: number[] = Array<number>(4 - newRow.length).fill(0);
    return [...newRow, ...zeros];
  });
};

const merge = (board: Array<Array<number>>, setScore: Dispatch<SetStateAction<number>>) => {
  return board.map((row) => {
    const newRow: number[] = row;
    newRow.forEach((tile, i) => {
      if (i < 3) {
        if (tile === newRow[i + 1]) {
          newRow[i] = tile * 2;
          newRow[i + 1] = 0;
          setScore((prev) => prev + tile * 2);
        }
      }
    });
    return newRow;
  });
};

const checkMerge = (board: Array<Array<number>>) => {
    return board.map((row) => {
      const newRow: number[] = row;
      newRow.forEach((tile, i) => {
        if (i < 3) {
          if (tile === newRow[i + 1]) {
            newRow[i] = tile * 2;
            newRow[i + 1] = 0;
          }
        }
      });
      return newRow;
    });
  };

export const moveLeft = (board: Array<Array<number>>, setScore: Dispatch<SetStateAction<number>>) => {
  return compress(merge(compress(board), setScore));
};

export const checkLeft = (board: Array<Array<number>>) => {
    return compress(checkMerge(compress(board)));
};

const rotateLeft = (board: Array<Array<number>>) => {
  const newBoard = board.map((row, i) =>
    row.map((_, j) => (board[j] != null ? board[j][3 - i] : 0)),
  );
  return newBoard as Array<Array<number>>;
  // const newBoard = emptyBoard();
  // for(let i = 0; i < 4; i++) {
  //     for(let j = 0; j < 4; j++) {
  //         newBoard[i][j] = board[j][3-i];
  //     }
  // }
  // return newBoard;
};

const rotateRight = (board: Array<Array<number>>) => {
  return rotateLeft(rotateLeft(rotateLeft(board)));
};

export const moveUp = (board: Array<Array<number>>, setScore: Dispatch<SetStateAction<number>>) => {
  return rotateRight(moveLeft(rotateLeft(board), setScore));
};

export const moveDown = (board: Array<Array<number>>, setScore: Dispatch<SetStateAction<number>>) => {
  return rotateLeft(moveLeft(rotateRight(board), setScore));
};

export const moveRight = (board: Array<Array<number>>, setScore: Dispatch<SetStateAction<number>>) => {
  return rotateLeft(rotateLeft(moveLeft(rotateLeft(rotateLeft(board)), setScore)));
};

export const checkUp = (board: Array<Array<number>>) => {
  return rotateRight(checkLeft(rotateLeft(board)));
}

export const checkDown = (board: Array<Array<number>>) => {
    return rotateLeft(checkLeft(rotateRight(board)));
}

export const checkRight = (board: Array<Array<number>>) => {
    return rotateLeft(rotateLeft(checkLeft(rotateLeft(rotateLeft(board)))));
}

export const checkWin = (board: Array<Array<number>>) => {
  // For convenience, 128 was used instead of 2048
  return board.some((row) => row.includes(128));
};

const hasDiff = (
  board1: Array<Array<number>>,
  board2: Array<Array<number>>,
) => {
  return board1.some((row, i) =>
    row.some((tile, j) => tile !== (board2[i] != null ? board2[i][j] : 0)),
  );
};

export const isOver = (board: Array<Array<number>>) => {
  return (
    isFull(board) &&
    ![checkLeft, checkRight, checkUp, checkDown].some((move) =>
      hasDiff(board, move(board)),
    )
  );
  //return isFull(board);
};

//export const move = (board: Array<Array<number | null>>, direction: string) => {}
