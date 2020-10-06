import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "./helper";
const styles={
    width: '300px',
    margin: '20px auto'
}
function TictacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);
  const handleClick = (i) => {
    const boardCopy = [...board];
    if (winner || boardCopy[i]) return;
    boardCopy[i] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    setXisNext(!xIsNext);
  };

  
  const renderMoves = () => {
      return <button onClick={()=>setBoard(Array(9).fill(null))}>Start Game</button>
  };
  return(
   <>
  <Board squares={board} onClick={handleClick} />
  <div style ={styles}>
      <p>{winner ? 'Winner: '+ winner : 'Next Player: ' + (xIsNext ? 'X':'O')}</p>
  {renderMoves()}
  </div>
  </>
  )}

export default TictacToe;
