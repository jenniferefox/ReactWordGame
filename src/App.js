import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

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

function Square() {
  const onChange = (e) => {
    console.log(e.target.value)
  };

  return (
  <input className='square' type='text' maxLength={1} onChange={onChange}/>
  );
}

function Grid() {
  const row_range = [...Array(6).keys()];
  const col_range = [...Array(5).keys()];

  return row_range.map((element) => {
      return (
        <div className='grid-row'>
          {col_range.map((item) => <Square />)}
        </div>
      )
  })
  };

function Key({legend}) {

  function handleKey(x) {
    console.log(x);
  }

  return (
    <button className='key' onClick={handleKey}>
    {legend}
    </button>
  )
}

function Keyboard () {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Del"],
  ];

  return keys.map((row) => {
    return (
      <div className='key-row'>
        {row.map((key) => <Key legend={key}/>)}
      </div>
    )
  });
}

export default App;
