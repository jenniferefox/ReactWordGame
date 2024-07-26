import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  //Overall Screen
  return (
    <div className="App">
      <header className="App-header">
        <p>
          You have 6 attempts to guess the correct 5 letter word.
        </p>
      </header>
      <Grid />
      <p></p>
      <Keyboard />
    </div>
  );
}

function Square() {
  <input className='square' type='text' maxLength={1}/>
}

function Grid() {
  return(
    <>
    <div className='grid-row'>
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
    <div className='grid-row'>
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
    <div className='grid-row'>
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
    <div className='grid-row'>
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
    <div className='grid-row'>
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
    <div className='grid-row'>
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
    </>
  )
}

function Key() {
  const [value, setValue] = useState(null)

  function handleKey(x) {
    console.log('hi');
  }

  return (
    <button className='key' value={value} onClick={e => handleKey(e.target.value)}/>
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
        {row.map((key) => <button className='key'>{key}</button>)}
      </div>
    )
  });
}

export default App;
