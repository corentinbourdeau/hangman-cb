import React, { useState, useEffect } from "react";
import "./App.css";
import { FaUndo } from "react-icons/fa";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const words = [
    "hello",
    "zoo",
    "car",
    "world",
    "first",
    "somewhere",
    "work",
    "computer",
  ];
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [life, setLife] = useState(6);
  const [letter, setLetter] = useState("");

  useEffect(() => {
    setWord(words[getRandomInt(words.length)]);
  }, []);

  const handleInputChange = (event) => {
    setLetter(event.target.value);
  };

  const handleInput = () => {
    if (letter && !guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setLife(life - 1);
      }
    }
    setLetter("");
  };

  const getSpacedWord = () => {
    return word.split("").map((letter, index) => (
      <span key={index}>
        {guessedLetters.includes(letter) ? letter : "_"}
        {index < word.length - 1 && " "}
      </span>
    ));
  };

  const handleReload = () => {
    setWord(words[getRandomInt(words.length)]);
    setLife(7);
    setLetter("");
    setGuessedLetters([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <tr>
            <td></td>
            <td>{life < 6 ? 0 : ""}</td>
            <td></td>
          </tr>
          <tr>
            <td>{life < 5  ? "-" : ""}</td>
            <td>{life < 4 ? 8 : ""}</td>
            <td>{life < 3 ? "-" : ""}</td>
          </tr>
          <tr>
            <td>{life < 2 ? "/" : ""}</td>
            <td></td>
            <td>{life < 1 ? "\\" : ""}</td>
          </tr>
        </table>
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            borderRadius: "5px",
            fontSize: 12,
          }}
        >
          <a
            href="https://github.com/corentinbourdeau/hangman-cb"
            style={{
              padding: "10px",
              backgroundColor: "#282c34",
              color: "white",
              textDecoration: "none",
            }}
          >
            Show Code
          </a>
        </div>
        <h1>Hangman</h1>
        <h3>
          Life left :{" "}
          {life == 2 ? (
            <span style={{ color: "orange" }}>{life}</span>
          ) : life <= 1 ? (
            <span style={{ color: "red" }}>{life}</span>
          ) : (
            life
          )}
        </h3>
        <p>
          {getSpacedWord()}{" "}
          <button onClick={handleReload}>
            <FaUndo />
          </button>
        </p>
        <div>
          <input
            type="text"
            name="letter"
            value={letter}
            maxLength={1}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleInput();
            }}
          />
          <button onClick={handleInput}>Enter</button>
        </div>
        {life <= 0 && <p>Game Over ! The word was : {word}</p>}
        {word.split("").every((letter) => guessedLetters.includes(letter)) && (
          <p>Congratulations ! You guessed the word : {word}</p>
        )}
        <p>
          {guessedLetters.length == 1
            ? "Guessed letter : "
            : guessedLetters.length > 1
            ? "Guessed letters : "
            : ""}
          {guessedLetters.map((letter) => {
            return (letter + " ").toUpperCase();
          })}
        </p>
      </header>
    </div>
  );
}

export default App;
