import { useState } from "react";
import "./App.css";

export const App = () => {
  const [randomNumber, setRandomNumber] = useState("?");
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(3);
  const [highscore, setHighscore] = useState(0);
  const [message, setMessage] = useState("");
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [firstname, setFirstname] = useState("");

  const newRandomNumber = () => Math.floor(Math.random() * 10);
  console.log("randomNumber", randomNumber);

  const handleFirstname = (e) => {
    setFirstname(e.target.value.toUpperCase());
  };

  const showRandomNumber = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  const handleHighscoreIncrement = () => {
    setHighscore((prev) => prev + 1);
    setMessage(`SUPER ${firstname}, weiter so!`);
    setRandomNumber(newRandomNumber());
  };

  const handleScoreDecrement = () => {
    setScore((prev) => prev - 1);
    setMessage(`Du schafst es ${firstname}, versuch es noch einmal!`);
  };

  const handleHighscoreDecrement = () => {
    setScore(3);
    setHighscore((prev) => prev - 1);
    setMessage(`Du schafst es ${firstname}, versuch es noch einmal!`);
  };

  const handleGameOver = () => {
    setScore(0);
    setGameOver(true);
    setMessage(`${firstname}, du hast leider verloren!`);
    showRandomNumber();
    setTimeout(() => {
      setRandomNumber("?");
    }, 3000);
  };

  const handleGameWon = () => {
    setHighscore(3);
    setGameWon(true);
    setMessage(`SUPER ${firstname}, du hast gewonnen!!`);
  };

  const handleGuess = (guess) => {
    guess === randomNumber && score !== 0 && highscore < 2
      ? handleHighscoreIncrement()
      : randomNumber !== "?" && guess !== randomNumber && score > 1
      ? handleScoreDecrement()
      : guess !== randomNumber && score === 1 && highscore > 0
      ? handleHighscoreDecrement()
      : guess !== randomNumber && score <= 1 && highscore < 1
      ? handleGameOver()
      : guess === randomNumber && score !== 0 && highscore === 2
      ? handleGameWon()
      : setMessage(`${firstname}, tippe auf 'Start' und lege los!`);
  };

  const handleNewGame = () => {
    setShow(false);
    setScore(3);
    setHighscore(0);
    setMessage("");
    setGameOver(false);
    setGameWon(false);
    setRandomNumber(newRandomNumber());
  };

  return (
    <div className='App'>
      <h1 className='header'>
        {message ? message : `${firstname}, errate die Zahl zwischen 0 und 9`}
      </h1>
      <input
        autoFocus
        placeholder='Wie heißt du?'
        type='text'
        onChange={handleFirstname}
      />
      <button onClick={() => handleNewGame()}>Start</button>
      <div>
        <button>Score: {score}</button>
        <button>Highscore: {highscore}</button>
      </div>
      <div>
        <button className='show' onClick={() => showRandomNumber()}>
          {show ? randomNumber : "?"}
        </button>
      </div>
      <div>
        <button onClick={() => handleGuess(0)}>0</button>
        <button onClick={() => handleGuess(1)}>1</button>
        <button onClick={() => handleGuess(2)}>2</button>
        <button onClick={() => handleGuess(3)}>3</button>
        <button onClick={() => handleGuess(4)}>4</button>
      </div>
      <div>
        <button onClick={() => handleGuess(5)}>5</button>
        <button onClick={() => handleGuess(6)}>6</button>
        <button onClick={() => handleGuess(7)}>7</button>
        <button onClick={() => handleGuess(8)}>8</button>
        <button onClick={() => handleGuess(9)}>9</button>
      </div>
    </div>
  );
};
