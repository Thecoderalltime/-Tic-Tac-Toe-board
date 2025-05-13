import { useState } from "react";
import "./App.css";

const Square = ({ square, squareClick }) => {
  return (
    <div
      className=" cursor-pointer bg-white h-12 w-12 m-1 text-3xl border border-gray-400 text-center align-middle"
      onClick={squareClick}
    >
      {square}
    </div>
  );
};

function Board({ isNext, square, onPlay }) {
  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = `Winner is : ${winner}`;
  } else {
    status = "Next Player : " + (isNext ? "X" : "O");
  }

  function handleClick(i) {
    const newSquare = square.slice();

    if (square[i] || calculateWinner(square)) {
      return;
    }

    if (isNext) {
      newSquare[i] = "x";
    } else {
      newSquare[i] = "0";
    }

    onPlay(newSquare);
  }

  return (
    <div className="m-auto">
      <h3>{status}</h3>
      <div className="flex">
        <Square square={square[0]} squareClick={() => handleClick(0)} />
        <Square square={square[1]} squareClick={() => handleClick(1)} />
        <Square square={square[2]} squareClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square square={square[3]} squareClick={() => handleClick(3)} />
        <Square square={square[4]} squareClick={() => handleClick(4)} />
        <Square square={square[5]} squareClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square square={square[6]} squareClick={() => handleClick(6)} />
        <Square square={square[7]} squareClick={() => handleClick(7)} />
        <Square square={square[8]} squareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isNext, setIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    setIsNext(!isNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleMove(move) {
    setCurrentMove(move);
    setIsNext(move % 2 == 0);
  }
  const move = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = `Got to the move # ${move}`;
    } else {
      description = `Got to the start Game`;
    }
    return (
      <li key={move}>
        <button onClick={() => handleMove(move)}>{description}</button>
      </li>
    );
  });
  console.log(move);
  return (
    <div className="flex justify-center mt-20 ">
      <div className="mr-10">
        <Board isNext={isNext} square={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="p-3">
        <ol >{move} </ol>
      </div>
    </div>
  );
}
