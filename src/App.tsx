import React, { useState } from "react";
import "./App.css";
import Field from "./components/Field";
import WinnerModal from "./components/WinnerModal";

const P1 = "X";
const P2 = "O";
const W = "W";

export default function App() {
  let localBoard;

  if(localStorage.getItem("boardData")) {
    localBoard = JSON.parse(localStorage.getItem("boardData")!);
  }else{
    localBoard = ["", "", "", "", "", "", "", "", "", ""];
  }

  const [board, setBoard] = useState<string[]>(localBoard);
  const [currentPlayer, setCurrentPlayer] = useState<string>(P1);
  const [winner, setWinner] = useState<string>("");

  const handleClick = (index:number):void => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    localStorage.setItem("boardData", JSON.stringify(newBoard));
    setBoard(newBoard);

    const newWinner = winingCondition(newBoard, currentPlayer);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === P1 ? P2 : P1);
    }
  };

  const winingCondition = (board:string[], player:string): string | null => {
    for (let i = 0; i < 9; i += 3) {
      if (board[i] === player && board[i + 1] === player && board[i + 2] === player) {
        const newBoard = [...board];
        newBoard[i] = W;
        newBoard[i+1] = W;
        newBoard[i+2] = W;
        setBoard(newBoard);
        return player;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (board[i] === player && board[i + 3] === player && board[i + 6] === player) {
        const newBoard = [...board];
        newBoard[i] = W;
        newBoard[i+3] = W;
        newBoard[i+6] = W;
        setBoard(newBoard);
        return player;
      }
    }

    if (board[0] === player && board[4] === player && board[8] === player) {
      const newBoard = [...board];
      newBoard[0] = W;
      newBoard[4] = W;
      newBoard[8] = W;
      setBoard(newBoard);
      return player;
    }

    if (board[2] === player && board[4] === player && board[6] === player) {
      const newBoard = [...board];
      newBoard[2] = W;
      newBoard[4] = W;
      newBoard[6] = W;
      setBoard(newBoard);
      return player;
    }

    return null;
  };

  const resetGame = ():void => {
    setBoard(["", "", "", "", "", "", "", "", "", ""]);
    setCurrentPlayer(P1);
    setWinner("");
    localStorage.setItem("boardData", JSON.stringify(["","","","","","","","",""]));
  };

  return (
    <div className="App">
      <h1 className="text-5xl mt-5 font-bold text-orange-400">XOXO</h1>
      
      <div className="board">
        {board.map((cell, index) => (
          <Field index={index} cell={cell} handleClick={handleClick}/>
        ))}
      </div>

      {winner ? (
        <WinnerModal winner={winner} setWinner={setWinner}/>
      ) : (
        <div className="current-player">
          <h2 className="text-xl text-center">{currentPlayer} <br /> Current player</h2>
        </div>
      )}

      <div>
        <button className="bg-orange-300 px-5 py-3" onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
}
