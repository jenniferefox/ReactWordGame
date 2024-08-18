import {useState} from "react"
import Keyboard from "./Keyboard"
import checkAgainstAnswer from "./checkAgainstAnswer"
import {wordOfTheDay, congrats} from './Words';
import toast, { Toaster } from 'react-hot-toast';
import Confetti from "react-confetti"

const word_length = 5

export default function Game() {
  // Current guess
  const [guess, setGuess] = useState("");
  // List of prev guesses
  const [guesses, setGuesses] = useState([]);
  // Word of the day to guess
  const [answerWord, setAnswerWord] = useState(wordOfTheDay().toUpperCase())
  const onKey = (press) => {
    if (guess === "" && guesses[guesses.length-1] === answerWord) {
      return guess, guesses
    }
    if (press === 'Backspace' || press === 'Del') {
        setGuess(prevGuess => prevGuess.slice(0, -1))
    } else if (press === 'Enter') {
      if (guess.length === word_length) {
        setGuesses(prevGuesses => [...prevGuesses, guess])
        if (guess === answerWord) {
          toast(`${congrats()}, you win!`)
        }
        setGuess("")
      } else {
        toast('Enter a 5-letter word')
      }
    } else if (guess.length < word_length && press.match(/^[a-zA-Z]$/)) {
      setGuess(g => g + press)
      }
    };

  return (
    <div>
      <Toaster
        containerStyle={{
          top: 60,
        }}
      />
      <div className="grid">
        <OldGuesses prevGuesses={guesses} answerWord={answerWord}/>
        {guesses.length < 6 && <CurrentGuess currentGuess={guess} answerWord={answerWord}/>}
        {guesses.length < 6 && <EmptyRows prevGuesses={guesses}/>}
      </div>
      <Keyboard className="keyboard" onKey={onKey} prevGuesses={guesses} answerWord={answerWord}/>
      {(guesses[guesses.length-1] === answerWord) && <Confetti />}
    </div>
  )
};

// Function to check input against word of the day and return
// correct, incorrect or almost correct.
// 2 passes to:
// 1. check for correct letters in correct position
// 2. to then check for remaining correct letters in incorrect position

function OldGuesses(props) {
  const previousGuesses = Array.isArray(props.prevGuesses) && props.prevGuesses?.map((item, index) => <PrevGuessRow value={item} key={index} answerWord={props.answerWord}/>)
  return(
    <div>
      {previousGuesses}
    </div>
  )
};

function PrevGuessRow(props) {
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

  const className = props.validation
    ? "square " + props.validation
    : "square";

  return (
    <div className={className}>
      {props.letter}
    </div>
  )
};
