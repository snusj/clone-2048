//import React from 'react';

export const Score = ({ score, bestScore, message }: { score: number; bestScore: number; message: string }) => {
  return (
    <div className="score">
      <div className="score-title">{'2048'}</div>
      <div className="score-container">
        <div className="score-label">{'SCORE:'}</div>
        <div className="score-value">{score}</div>
      </div>
      <div className="score-container">
        <div className="score-label">{'BEST SCORE:'}</div>
        <div className="score-value">{bestScore}</div>
      </div>
      <div className="score-container">
        <div className="score-value">{message}</div>
      </div>
    </div>
  );
}
