import {useState} from "react"
import Keyboard from "./Keyboard"
import checkAgainstAnswer from "./checkAgainstAnswer"
import {wordOfTheDay, congrats} from './Words';
import toast, { Toaster } from 'react-hot-toast';
import Confetti from "react-confetti";
import { fiveLetterWords } from "./fiveLetterWords";

const wordLength = 5;
const rowCount = 6;

export default function Game() {
  // Current guess
  const [guess, setGuess] = useState("");
  // List of prev guesses
  const [guesses, setGuesses] = useState([]);
  // Word of the day to guess
  const [answerWord, ] = useState(wordOfTheDay().toUpperCase());

  //determines what happens when a key is pressed (for both software and physical keyboard)
  const onKey = (press) => {
    if (guess === "" && guesses[guesses.length-1] === answerWord) {
      return guess, guesses
    }
    if (guess === "" && guesses.length === rowCount && guesses[guesses.length-1] !== answerWord) {
      return guess, guesses
    }
    if (press === 'Backspace' || press === 'Del') {
      setGuess(prevGuess => prevGuess.slice(0, -1))
    } else if (press === 'Enter') {
      if (!(fiveLetterWords.includes(guess.toLowerCase()))) {
        toast("Not a word!")
        setGuess("")
      } else if (guesses.includes(guess)) {
        toast("Use another word!")
        setGuess("")
      } else if (guess.length === wordLength) {
        setGuesses(prevGuesses => [...prevGuesses, guess])
        if (guess === answerWord) {
          toast(`${congrats()}, you win!`)
        } else if (guesses.length === wordLength) {
          toast('Booo, you lose!')
        }
        setGuess("")
        } else {
        toast('Enter a 5-letter word')
        }
    } else if (guess.length < wordLength && press.match(/^[a-zA-Z]$/)) {
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
        {guesses.length < rowCount && <CurrentGuess currentGuess={guess} answerWord={answerWord}/>}
        {guesses.length < rowCount && <EmptyRows prevGuesses={guesses}/>}
      </div>
      <Keyboard className="keyboard" onKey={onKey} prevGuesses={guesses} answerWord={answerWord}/>
      {(guesses[guesses.length-1] === answerWord) && <Confetti />}
    </div>
  )
};

//Rows of OldGuesses, stored in the guesses state

function OldGuesses(props) {
  const previousGuesses = Array.isArray(props.prevGuesses) && props.prevGuesses?.map((item, index) => <PrevGuessRow value={item} key={index} answerWord={props.answerWord}/>);
  return(
    <div>
      {previousGuesses}
    </div>
  )
};

//defines each row of OldGuesses

function PrevGuessRow(props) {
  const validation = checkAgainstAnswer(props.value, props.answerWord);
  const squares = props.value.split("").map((val, index) => <Square letter={val} validation={validation[index]} key={index}/>);
  return(
    <div className="row">
      {squares}
    </div>
  )
};

//CurrentGuess Row

function CurrentGuess(props) {
  const currGuess = (props.currentGuess).padEnd(wordLength," ");
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

//Empty Rows where there is no guess yet

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

//defines each row of EmptyRows

function EmptyRow() {
  const letterCount = [...Array(wordLength).keys()]
  const emptySquares = letterCount.map((val, index) => <Square letter={" "} key={index}/>)
  return (
    <div className="row">
      {emptySquares}
    </div>
  )
};

//Defines each individual square within a row

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
