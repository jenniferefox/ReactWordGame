import './App.css';
import Game from "./Game"

// Overall Screen that displays header and Game
//const game character length

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          You have 6 attempts to guess the correct 5-letter word.
        </p>
      </header>
      <div>
      <Game className='Game'/>
      </div>
    </div>
  );
};
