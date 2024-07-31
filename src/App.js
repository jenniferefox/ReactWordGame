import './App.css';
import { useEffect, useState } from 'react';
import { words } from './words.mjs';

function App() {
// Overall Screen
  return (
    <div className="App">
      <header className="App-header">
        <p>
          You have 6 attempts to guess the correct 5 letter word.
        </p>
      </header>
      <div>
      <Game className='Game'/>
      </div>
    </div>
  );
}

function wordOfTheDay() {
  var now = new Date();
  var fullDaysSinceEpoch = Math.floor(now/8.64e7);
  return words[fullDaysSinceEpoch % words.length];
  }

function Game() {
  const [{guess, prevGuess}, setGuess] = useState({ guess: "", prevGuess: []})
  const actual_word = wordOfTheDay()
  const onKey = (press) => {
    if (press === 'Backspace' || press === 'del') {
      setGuess(g => ({...g,  guess: g.guess.slice(0, -1) }))
    } else if (press === 'Enter') {
      if (guess.length === actual_word.length) {
        if (guess === wordOfTheDay()) {
          console.log("YOU WIN!")
          } else {
            checkAgainstAnswer(guess, actual_word)
          }
        setGuess(g => ({guess: "", prevGuess: g.guess.push(guess)}))
      }
        } else if (press.match(/[a-z]/)) {
          setGuess(g => ({...g, guess: g.guess + press}))
        }
    if (guess.length > 5) {
      alert('too many letters')
      setGuess(g => ({...g,  guess: g.guess.slice(0, -1) }))
    };
    console.log(guess)
    };
  return (
      <div>
        <Grid onKey={onKey}/>
        <p></p>
        <Keyboard onKey={onKey}/>
      </div>
    )
}

function Square({onKey}) {
  return (
  <div className='square' type='text' maxLength={1}  onChange={() => {onKey()}}/>
  );
}

function Grid({ onKey }) {
  var row_size = [...Array(6).fill('')];
  var col_size = [...Array(5).fill('')];

  return row_size.map(() => {
      return (
        <div className='grid-row'>
          {col_size.map(() => <Square onKey={() => onKey()}/>)}
        </div>
      )
  })
  };

function Key({ legend, onKey }) {

  return (
    <button className='key' onClick={() => {onKey(legend)}}>
    {legend}
    </button>
  )
}

function Keyboard ({ onKey }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        onKey('Backspace')
      } else if (e.key === 'Enter') {
        onKey("Enter")
      } else if (e.key.match(/[a-zA-Z]/)) {
        onKey(e.key)
      };
      };

      document.addEventListener("keydown", handler);
      return () => {
        document.removeEventListener("keydown", handler);
      }
    }, []);

  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Del"],
  ];

  return keys.map((row) => {
    return (
      <div className='key-row'>
        {row.map((key) => <Key legend={key} onKey={() => onKey(key.toLowerCase())}/>)}
      </div>
    )
  });
}

export default App;
