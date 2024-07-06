import React, { useState, useEffect } from 'react';
import './App.css';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const words = ["hello", "zoo", "car", "world"];
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [life, setLife] = useState(7);
  const [letter, setLetter] = useState("");

  useEffect(() => {
    setWord(words[getRandomInt(words.length)]);
  }, []);

  const handleInputChange = (event) => {
    setLetter(event.target.value);
  }

  const handleInput = () => {
    if (letter && !guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setLife(life - 1);
      }
    }
    setLetter("");
  }

  const getSpacedWord = () => {
    return word.split("").map((letter, index) => (
      <span key={index}>
        {guessedLetters.includes(letter) ? letter : '_'}{index < word.length - 1 && " "}
      </span>
    ));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hangman</h1>
        <h3>Life left: {life}</h3>
        <p>{getSpacedWord()}</p>
        <input 
          type="text" 
          name="letter" 
          value={letter}
          maxLength={1} 
          onChange={handleInputChange} 
          onKeyPress={(e) => { if (e.key === 'Enter') handleInput(); }}
        />
        <button onClick={handleInput}>Enter</button>
        {life <= 0 && <p>Game Over! The word was: {word}</p>}
        {word.split("").every(letter => guessedLetters.includes(letter)) && <p>Congratulations! You guessed the word: {word}</p>}
      </header>
    </div>
  );
}

export default App;
