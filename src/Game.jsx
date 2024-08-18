import {useState} from "react"
import Keyboard from "./Keyboard"
import wordOfTheDay from './Words';

const word_length = 5

export default function Game() {
  // Current guess
  const [guess, setGuess] = useState("");
  // List of prev guesses
  const [guesses, setGuesses] = useState([]);
  // Word of the day to guess
  const answerWord = wordOfTheDay().toUpperCase()
  const onKey = (press) => {
    if (press === 'Backspace' || press === 'Del') {
        setGuess(prevGuess => prevGuess.slice(0, -1))
    } else if (press === 'Enter') {
      if (guess.length === word_length) {
        setGuesses(prevGuesses => [...prevGuesses, guess])
        setGuess("")
      } else {
        alert('Enter a 5-letter word')
      }
    } else if (guess.length < word_length && press.match(/^[a-zA-Z]$/)) {
      setGuess(g => g + press)
      }
    };
  return (
    <div>
      <OldGuesses prevGuesses={guesses} answerWord={answerWord}/>
      <CurrentGuess currentGuess={guess} answerWord={answerWord}/>
      <EmptyRows prevGuesses={guesses}/>
      <Keyboard onKey={onKey} prevGuesses={guesses} answerWord={answerWord}/>
    </div>
  )
};

// Function to check input against word of the day and return
// correct, incorrect or almost correct.
// 2 passes to:
// 1. check for correct letters in correct position
// 2. to then check for remaining correct letters in incorrect position

function checkAgainstAnswer(guess, answerWord) {
  let currentGuess = guess.split("");
  let remainingLettersInWord = answerWord.split("");
  let result = ['F', 'F', 'F', 'F', 'F'];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answerWord[i]) {
      result.splice(i, 1,'T');
      remainingLettersInWord.splice(i, 1," ");
      currentGuess.splice(i, 1, " ")
    };
  };

  for (let j = 0; j < guess.length; j++) {
    if (currentGuess[j] != " ") {
      if (remainingLettersInWord.includes(currentGuess[j])) {
        remainingLettersInWord.splice(remainingLettersInWord.lastIndexOf(currentGuess[j]),1, " ")
        result.splice(j, 1,'A');
    }
  }
  }
  return result;
};


function OldGuesses(props) {
  const previousGuesses = Array.isArray(props.prevGuesses) && props.prevGuesses?.map((item, index) => <PrevGuessRow value={item} key={index} answerWord={props.answerWord}/>)
  return(
    <div>
      {previousGuesses}
    </div>
  )
};

function PrevGuessRow(props) {
  // const oldGuessToStringList = props.value.split("")
  const validation = checkAgainstAnswer(props.value, props.answerWord);
  const squares = props.value.split("").map((val, index) => <Square letter={val} validation={validation[index]} key={index}/>)
  return(
    <div className="row">
      {squares}
    </div>
  )
};

function CurrentGuess(props) {
  const currGuess = (props.currentGuess).padEnd(5," ")
  return(
    <div className="row">
      {currGuess.split("").map((g, i) => {
        return (
          <Square
            letter={g || " "}
            key={i}
          />
        );
      })}
    </div>
  )
};

function EmptyRows(props) {
  const emptyCount = 5 - props.prevGuesses.length
  if (emptyCount !== 0) {
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
    <div className="row">
      {emptySquares}
    </div>
  )
};

function Square(props) {
  const CLASS = {
    "T": "true",
    "F": "false",
    "A": "almost",
  };

  const className = props.validation
    ? "square " + CLASS[props.validation]
    : "square";

  return (
    <div className={className}>
      {props.letter}
    </div>
  )
};
