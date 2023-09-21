import React, { useState, useEffect, useRef} from 'react'
import './RockPaperScissors.css'

export default function RockPaperScissors() {
    const [playerChoice, setPlayerChoice] = useState("");
    const [computerChoice, setComputerChoice] = useState("");
    const [gameState, setGameState] = useState({
      player: 0,
      computer: 0,
      push: 0
    });
    const [winner, setWinner] = useState("Choose rock paper or scissors");
    const shouldUseEffectRun = useRef(false);
  
    useEffect(() => {
      if (shouldUseEffectRun.current) {
        shouldUseEffectRun.current = false;
        decideWhoIsTheWinner();
      }
    });
  
    function handleClick(rockPaperScissors) {
      setPlayerChoice(() => rockPaperScissors);
      let RockPaperScissors = ["Rock", "Paper", "Scissors"];
      setComputerChoice(
        () => RockPaperScissors[[0, 1, 2][Math.floor(Math.random() * 3)]]
      );
      shouldUseEffectRun.current = true;
    }
  
    function decideWhoIsTheWinner() {
      let newGameState = JSON.parse(JSON.stringify(gameState));
      if (playerChoice === computerChoice) {
        setWinner("Push");
        newGameState.push += 1;
        setGameState(newGameState);
      } else if (
        (playerChoice === "Rock" && computerChoice === "Paper") ||
        (playerChoice === "Paper" && computerChoice === "Scissors") ||
        (playerChoice === "Scissors" && computerChoice === "Rock")
      ) {
        setWinner("The winner is the Computer");
        newGameState.computer += 1;
        setGameState(newGameState);
      } else {
        setWinner("You are the winner");
        newGameState.player += 1;
        setGameState(newGameState);
      }
    }
  
    let Buttons = (
      <>
        <button onClick={() => handleClick("Rock")}>Rock</button>
        <button onClick={() => handleClick("Paper")}>Paper</button>
        <button onClick={() => handleClick("Scissors")}>Scissors</button>
      </>
    );
  
    return (
      <div className="KőPapírOlló">
        <table>
          <thead>
            <tr>
              <th colSpan="3">Game state</th>
            </tr>
            {/* <tr>
              <th colSpan="3">{winner}</th>
            </tr> */}
          </thead>
          <tbody>
            <tr>
              <td>You won</td>
              <td>Push</td>
              <td>Computer won</td>
            </tr>
            <tr>
              <td>{gameState.player}</td>
              <td>{gameState.push}</td>
              <td>{gameState.computer}</td>
            </tr>
            <tr>
              <td>{playerChoice}</td>
              <td></td>
              <td>{computerChoice}</td>
            </tr>
          </tbody>
        </table>
        <div className='winner'>{winner}</div>
        <div className="buttons">
            {Buttons}
        </div>
      </div>
    );
  }