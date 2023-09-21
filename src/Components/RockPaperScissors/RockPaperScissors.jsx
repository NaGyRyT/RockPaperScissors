import React, { useState, useEffect } from 'react'
import './RockPaperScissors.css'

export default function RockPaperScissors() {
    const [playerChoice, setPlayerChoice] = useState("");
    const [computerChoice, setComputerChoice] = useState("");
    const [gameState, setGameState] = useState({
      player: 0,
      computer: 0,
      push: 0,
      round: 1
    });
    const [winner, setWinner] = useState("Choose rock paper or scissors");
    const [shouldUseEffectRun, setShouldUseEffectRun] = useState(false);
  
    useEffect(() => {
      if (shouldUseEffectRun) {
        setShouldUseEffectRun(false);
        decideWhoIsTheWinner();
      }
    }, [shouldUseEffectRun]);
  
    function handleClick(rockPaperScissors) {
      setPlayerChoice(() => rockPaperScissors);
      let RockPaperScissors = ["Rock", "Paper", "Scissors"];
      setComputerChoice(
        () => RockPaperScissors[[0, 1, 2][Math.floor(Math.random() * 3)]]
      );
      setShouldUseEffectRun(true);
    }

    function handleReset() {
        setPlayerChoice("");
        setComputerChoice("");
        setGameState({
            player: 0,
            computer: 0,
            push: 0,
            round: 1
          });
        setWinner("Choose rock paper or scissors");
    }
  
    function decideWhoIsTheWinner() {
      let newGameState = JSON.parse(JSON.stringify(gameState));
      if (playerChoice === computerChoice) {
        setWinner("Push");
        newGameState.push += 1;
      } else if (
        (playerChoice === "Rock" && computerChoice === "Paper") ||
        (playerChoice === "Paper" && computerChoice === "Scissors") ||
        (playerChoice === "Scissors" && computerChoice === "Rock")
      ) {
        setWinner("The winner is the Computer");
        newGameState.computer += 1;
      } else {
        setWinner("You are the winner");
        newGameState.player += 1;
      }
      newGameState.round += 1;
      setGameState(newGameState);
    }
  
    let Buttons = (
      <>
        <div className='button' onClick={() => handleClick("Rock")}>Rock</div>
        <div className="button" onClick={() => handleClick("Paper")}>Paper</div>
        <div className="button" onClick={() => handleClick("Scissors")}>Scissors</div>
      </>
    );
  
    return (
      <div className="KőPapírOlló">
        <table>
          <thead>
            <tr>
                <th>
                    <div className='round'>Round {gameState.round}</div>
                </th>
                <th>
                    Game state
                </th>
                <th>
                    <div className='button-small' onClick={handleReset}>Reset</div>
                </th>
            </tr>
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