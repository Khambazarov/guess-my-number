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
    setMessage("SUPER, weiter so...");
    setRandomNumber(newRandomNumber());
    // setMessage(firstname ? `SUPER ${firstname}` : "SUPER");
  };

  const handleScoreDecrement = () => {
    setScore((prev) => prev - 1);
    setMessage("Du schafst es...");
    // setMessage(firstname ? `Du schafst es ${firstname}` : "Du schafst es");
  };

  const handleHighscoreDecrement = () => {
    setScore(3);
    setHighscore((prev) => prev - 1);
    setMessage("Du schafst es...");
    // setMessage(firstname ? `Du schafst es ${firstname}` : "Du schafst es");
  };

  const handleGameOver = () => {
    setScore(0);
    setGameOver(true);
    showRandomNumber();
    setMessage("Du hast verloren");
    // setMessage(firstname ? `${firstname} hat verloren!` : "Du hast verloren");
    setTimeout(() => {
      setRandomNumber("?");
    }, 3000);
  };

  const handleGameWon = () => {
    setHighscore(3);
    setGameWon(true);
    setMessage("Du hast gewonnen");
    // setMessage(firstname ? `${firstname} hat gewonnen!` : "Du hast gewonnen");
  };

  const handleScoreTooHighMessage = () => {
    setScore((prev) => prev - 1);
    setMessage("Zu hoch");
    // setMessage(firstname ? `Zu hoch ${firstname}` : "Zu hoch");
  };

  const handleScoreTooLowMessage = () => {
    setScore((prev) => prev - 1);
    setMessage("Zu niedrig");
    // setMessage(firstname ? `Zu niedrig ${firstname}` : "Zu niedrig");
  };

  const handleGuessingNumber = (guess) => {
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
      : setMessage("Tippe auf Start");
    // : setMessage(firstname ? `${firstname}, tippe auf Start` : `Tippe auf Start`);
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
      <div>
        <h1 className='header-firstname'>
          {firstname ? firstname : "Guess the number"}
        </h1>
        <h2 className='header-message'>{message}</h2>
        <input
          className='input-firstname'
          required
          autoFocus
          placeholder='Wie heißt du?'
          type='text'
          onChange={handleFirstname}
        />
      </div>
      <div className='score-wrapper'>
        <button className='score'>
          {score === 1 ? "Score" : "Scores"}
          <div>{score}</div>
        </button>
        <button className='score'>
          {highscore === 1 ? "Highscore" : "Highscores"}
          <div>{highscore}</div>
        </button>
      </div>
      <div className='number-pad'>
        <button className='nums' onClick={() => handleGuessingNumber(1)}>
          1
        </button>
        <button className='nums' onClick={() => handleGuessingNumber(2)}>
          2
        </button>
        <button className='nums' onClick={() => handleGuessingNumber(3)}>
          3
        </button>
        <button className='nums' onClick={() => handleGuessingNumber(4)}>
          4
        </button>
        <button className='nums' onClick={() => handleGuessingNumber(5)}>
          5
        </button>
        <button className='nums' onClick={() => handleGuessingNumber(6)}>
          6
        </button>
        <button className='nums' onClick={() => handleGuessingNumber(7)}>
          7
        </button>
        <button className='nums' onClick={() => handleGuessingNumber(8)}>
          8
        </button>
        <button className='nums' onClick={() => handleGuessingNumber(9)}>
          9
        </button>
        <button className='show' onClick={() => showRandomNumber()}>
          <span className='show'>{show ? randomNumber : "?"}</span>
        </button>
        <button className='nums' onClick={() => handleGuessingNumber(0)}>
          0
        </button>
        <button className='nums go' onClick={() => handleNewGame()}>
          GO
        </button>
      </div>
    </div>
  );
};
