import logo from './logo.svg';
import './App.css';

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
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
    </div>
    <div className='grid-row'>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
    </div>
    <div className='grid-row'>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
    </div>
    <div className='grid-row'>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
    </div>
    <div className='grid-row'>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
    </div>
    <div className='grid-row'>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
      <input className="square"></input>
    </div>
    </>
  )
}

function Key() {
  return (
    <button className='key'/>
  )
}

function Keyboard () {
  return (
    <>
    <div className='key-row'>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
    </div>
    <div className='key-row'>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
    </div>
    <div className='key-row'>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
      <button className='key'>Q</button>
    </div>
    </>
  )
}



export default App;
