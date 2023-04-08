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
  const [guess, setGuess] = useState("");

  const newRandomNumber = () => Math.floor(Math.random() * 10);
  console.log("randomNumber", randomNumber);

  const showGuessNumber = (guess) => setGuess(guess);

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
    setMessage(`SUPER ${firstname && firstname}`);
    setRandomNumber(newRandomNumber());
  };

  const handleScoreDecrement = () => {
    setScore((prev) => prev - 1);
    setMessage(`Du schafst es ${firstname && firstname}`);
  };

  const handleHighscoreDecrement = () => {
    setScore(3);
    setHighscore((prev) => prev - 1);
    setMessage(`Du schafst es ${firstname && firstname}`);
  };

  const handleGameOver = () => {
    setScore(0);
    setGameOver(true);
    setMessage(
      `${firstname ? firstname + " hat verloren!" : "Du hast verloren"}`
    );
    showRandomNumber();
    setTimeout(() => {
      setRandomNumber("?");
    }, 3000);
  };

  const handleGameWon = () => {
    setHighscore(3);
    setGameWon(true);
    setMessage(
      `${firstname ? firstname + " hat gewonnen!" : "Du hast gewonnen"}`
    );
  };

  const handleScoreTooHighMessage = () => {
    setScore((prev) => prev - 1);
    setMessage(`Zu hoch ${firstname && firstname}`);
  };

  const handleScoreTooLowMessage = () => {
    setScore((prev) => prev - 1);
    setMessage(`Zu niedrig ${firstname && firstname}`);
  };

  const handleGuess = (guess) => {
    showGuessNumber(guess);
    randomNumber !== "?" &&
    guess === randomNumber &&
    score !== 0 &&
    highscore < 2
      ? handleHighscoreIncrement()
      : (guess !== randomNumber && score === 0 && highscore === 0) ||
        (guess === randomNumber && score === 0 && highscore === 0)
      ? handleGameOver()
      : guess < randomNumber && score !== 0 && highscore >= 0
      ? handleScoreTooLowMessage()
      : guess > randomNumber && score !== 0 && highscore >= 0
      ? handleScoreTooHighMessage()
      : randomNumber !== "?" && guess !== randomNumber && score !== 0
      ? handleScoreDecrement()
      : guess !== randomNumber && score === 0 && highscore > 0
      ? handleHighscoreDecrement()
      : guess === randomNumber && score !== 0 && highscore >= 2
      ? handleGameWon()
      : setMessage(`${firstname}, tippe auf 'Start'!`);
  };

  const handleNewGame = () => {
    setShow(false);
    setScore(3);
    setHighscore(0);
    setMessage("");
    setGameOver(false);
    setGameWon(false);
    setRandomNumber(newRandomNumber());
    inputReset();
  };

  const inputReset = () => {
    const input = document.querySelector("input");
    input.value = "";
  };

  return (
    <div className='App'>
      <h1 className='header'>
        {gameWon || gameOver
          ? message
          : `Hallo ${firstname ? firstname : "..."}`}
      </h1>
      <h2 className='subheader'>{message ? message : "..."}</h2>
      <input
        required
        autoFocus
        placeholder='Wie heißt du?'
        type='text'
        onChange={handleFirstname}
      />
      <button className='start-btn' onClick={() => handleNewGame()}>
        Start
      </button>
      <div>
        <button className='score-btn'>Versuche: {score}</button>
        <button className='highscore-btn'>Leben: {highscore}</button>
      </div>
      <div className='show-wrapper'>
        <button className='show' onClick={() => showRandomNumber()}>
          <span className='show-span'>{show ? randomNumber : "?"}</span>
        </button>
        <button className='equal'>=</button>
        <button className='show-guess-number'>{guess ? guess : "?"}</button>
      </div>
      <div>
        <button className='nums' onClick={() => handleGuess(0)}>
          0
        </button>
        <button className='nums' onClick={() => handleGuess(1)}>
          1
        </button>
        <button className='nums' onClick={() => handleGuess(2)}>
          2
        </button>
        <button className='nums' onClick={() => handleGuess(3)}>
          3
        </button>
        <button className='nums' onClick={() => handleGuess(4)}>
          4
        </button>
      </div>
      <div>
        <button className='nums' onClick={() => handleGuess(5)}>
          5
        </button>
        <button className='nums' onClick={() => handleGuess(6)}>
          6
        </button>
        <button className='nums' onClick={() => handleGuess(7)}>
          7
        </button>
        <button className='nums' onClick={() => handleGuess(8)}>
          8
        </button>
        <button className='nums' onClick={() => handleGuess(9)}>
          9
        </button>
      </div>
    </div>
  );
};
