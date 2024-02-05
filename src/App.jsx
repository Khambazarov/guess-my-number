import { useState } from "react";
import "./App.css";

export const App = () => {
  const [randomNumber, setRandomNumber] = useState("?");
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(5);
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");

  const newRandomNumber = () => Math.floor(Math.random() * 10);

  const handleFirstname = (e) => {
    setFirstname(e.target.value.toUpperCase());
  };

  const showRandomNumber = () => {
    setShow(!show);
    setTimeout(() => {
      setShow(show);
    }, 1000);
  };

  const handleGameOver = () => {
    setScore(0);
    showRandomNumber();
    // setMessage("Цlэпlэжь ухэнащ!");
    setMessage("Du hast verloren");
    setTimeout(() => {
      setRandomNumber("?");
    }, 2000);
  };

  const handleGameWon = () => {
    setScore((prev) => prev + 1);
    // setMessage("☻ Пэжщ кlуэцlыуэ уэ!");
    setMessage("Richtig, weiter so...");
    setRandomNumber(newRandomNumber());
  };

  const handleEndGame = () => {
    setScore(10);
    setMessage("☻ GEWONNEN!");
    // setMessage("☻ Маржэ УЕЙ УЕЙ!");
    // showRandomNumber();
    setTimeout(() => {
      setRandomNumber("?");
    }, 5000);
  };

  const handleScoreTooHigh = () => {
    setScore((prev) => prev - 1);
    // setMessage("↓↓↓ Лъэгэlуэщ ↓↓↓");
    setMessage("Zu hoch");
  };

  const handleScoreTooLow = () => {
    setScore((prev) => prev - 1);
    // setMessage("↑↑↑ Лъэхъшэlуэщ ↑↑↑");
    setMessage("Zu niedrig");
  };

  const handleGuessingNumber = (guess) => {
    handleInput();
    guess !== randomNumber && score <= 1
      ? handleGameOver()
      : guess < randomNumber
      ? handleScoreTooLow()
      : guess > randomNumber
      ? handleScoreTooHigh()
      : guess === randomNumber && score >= 9
      ? handleEndGame()
      : guess === randomNumber && score >= 1
      ? handleGameWon()
      : setMessage(`Name eingeben und "GO"`);
    // : setMessage("Щlэрыщlу щlэдзэж");
    // : setMessage("Щlэдзэм текъузэ");
  };

  const handleNewGame = () => {
    setShow(show);
    setScore(5);
    setMessage("");
    handleInput();
    setRandomNumber(newRandomNumber());
  };

  const handleReset = () => {
    setShow(show);
    setScore(5);
    setMessage("");
    handleInput();
    setRandomNumber("?");
    setFirstname("");
  };

  const handleInput = () => {
    const input = document.querySelector(".input-firstname");
    input.value = "";
  };

  return (
    <div className='App'>
      <h1 className='header-firstname'>
        {/* {firstname ? firstname : "Къащlэ бжыгъэр"} */}
        {firstname ? firstname : "Zahlenrätsel"}
      </h1>
      <h2 className='header-message'>{message}</h2>
      <input
        className='input-firstname'
        required
        autoFocus
        // placeholder={firstname ? "" : "Уицlэр хэт?"}
        placeholder={firstname ? "" : "Wie heißt du?"}
        type='text'
        onChange={handleFirstname}
      />
      <div className='score-wrapper'>
        <button className='score-btn text score'>
          {/* {score && "Псэ бжыгъэ"} */}
          {`${score} - ${score === 1 ? "Versuch" : "Versuche"}`}
        </button>
        {/* <button className='score-btn score'>{score}</button> */}
        <button className='show' onClick={() => showRandomNumber()}>
          {/* {show ? randomNumber : "Сыт бжыгъэ сгъэпщкlур?"} */}
          {show ? randomNumber : "?"}
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
        <button className='reset-btn' onClick={() => handleReset()}>
          {/* Щlэрыщlу джэгу */}
          RESET
        </button>
        <button className='nums' onClick={() => handleGuessingNumber(0)}>
          0
        </button>
        <button
          className='nums go'
          onClick={() =>
            firstname ? handleNewGame() : setMessage("Trage deinen Namen ein")
          }
        >
          {/* Щlэдзэ */}
          GO
        </button>
      </div>
    </div>
  );
};
