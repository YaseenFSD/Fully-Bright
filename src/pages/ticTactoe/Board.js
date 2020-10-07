import React from "react";
import Square from "./Square";
const style = {
  border: "4px solid darkblue",
  borderRadius: "10px",
  width: "300px",
  height: "300px",
  margin: "250px",
  display: "grid",
  gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
};
function Board({ squares, onClick }) {
  return (
    <div style={style}>
       {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
       ))} 
      
    </div>
  );
}

export default Board;
