import {useState} from "react"
import Keyboard from "./Keyboard"
import wordOfTheDay from './Words';

export default function Game() {
  // Current guess
  const [guess, setGuess] = useState("");
  // List of prev guesses
  const [guesses, setGuesses] = useState([]);
  // Word of the day to guess
  const answer_word = wordOfTheDay().toUpperCase()
  console.log(answer_word)
  const onKey = (press) => {
    if (press === 'Backspace' || press === 'Del') {
        setGuess(prevGuess => prevGuess.slice(0, -1))
    } else if (press === 'Enter') {
      if (guess.length === answer_word.length) {
        checkAgainstAnswer({guess, answer_word})
        setGuesses(prevGuesses => ({...prevGuesses, guess}))
        setGuess("")
      } else {
        alert('Enter a 5-letter word')
      }
    } else if (guess.length === 5) {
      alert('Too many letters')
    } else if (press.match(/^[a-zA-Z]$/)) {
      setGuess(g => g + press)
      }
    };

  return (
    <div>
      <OldGuesses prevGuesses={guesses}/>
      <CurrentGuess currentGuess={guess}/>
      <EmptyRows prevGuesses={guesses}/>
      <p></p>
      <Keyboard onKey={onKey} />
    </div>
  )
};

// Incomplete. Function to check input against word of the day and return
// correct, incorrect or almost correct.
// 2 passes to 1. check for correct letters in correct position
// 2. to then check for remaining correct letters in incorrect position

function checkAgainstAnswer({ guess, answer_word }) {
  let currentGuess = guess;
  let remainingLettersInWord = answer_word;
  let result = ['F', 'F', 'F', 'F', 'F'];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer_word[i]) {
      console.log('correct letter')
      result.splice(i, 1,'T');
      remainingLettersInWord.splice(i, 1,"");
    };

  for (let j = 0; j < guess.length; j++) {
    if (remainingLettersInWord[j] != '') {
      if (remainingLettersInWord.includes(currentGuess[j])) {
        remainingLettersInWord = remainingLettersInWord.replace(guess[i], "")
        result.splice(j, 1,'A');
        console.log('correct letter, incorrect position')
    }
      } else {
        console.log('incorrect letter')
        result = result.push('F');
      }
  }
  }
  console.log(result)
  return result;
};


function OldGuesses(props) {
  const previousGuesses = Array.isArray(props.prevGuesses) && props.prevGuesses?.map((item, index) => <PrevGuessRow value={item} key={index}/>)
  return(
    <div>
      {previousGuesses}
    </div>
  )
};

function PrevGuessRow(props) {
  const squares = props.value.map((val, index) => <Square letter={val} key={index}/>)
  return(
    <div>
      {squares}
    </div>
  )
};

function CurrentGuess(props) {
  const currGuess = (props.currentGuess).padEnd(5," ")
  const currSquares = currGuess.split("").map((s, index) => <Square letter={s} key={index}/>)
  return(
    <div>
      {currSquares}
    </div>
  )
};

function EmptyRows(props) {
  const emptyCount = 5 - (props.prevGuesses.length)
  console.log(emptyCount)
  if (emptyCount === 0) {
    return 0
  } else {
  const emptyRows = [...Array(emptyCount).keys()]
  const empties = emptyRows.map((val, index) => <EmptyRow key={index}/>)
  return (
    <div>
      {empties}
    </div>
  )
}};

function EmptyRow() {
  const letterCount = [...Array(5).keys()]
  const emptySquares = letterCount.map((val, index) => <Square letter={" "} key={index}/>)
  return (
    <div>
      {emptySquares}
    </div>
  )
};

function Square(props) {
  return (
    <div className='square' type='text'>
      {props.letter}
    </div>
  )
};
