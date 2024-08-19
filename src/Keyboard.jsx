import { useEffect } from 'react';
import checkAgainstAnswer from './checkAgainstAnswer'
//Keyboard component structures the on-screen keyboard and takes input from
// physical and software keyboard.

export default function Keyboard (props) {
  //handles input
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        props.onKey('Backspace')
      } else if (e.key === 'Enter') {
        props.onKey('Enter')
      } else if (e.key.match(/[a-zA-Z]/)) {
        props.onKey(e.key.toUpperCase())
      };
      };

      document.addEventListener("keydown", handler);
      return () => {
        document.removeEventListener("keydown", handler);
      }
    }, [props.onKey]);

  const keyColours = keyColourUpdate(props.prevGuesses, props.answerWord);

  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Del"],
  ];

  return keys.map((row, index) => {
    return (
      <div className='key-row' key={index}>
        {row.map((keyValue) => <Key key={keyValue} legend={keyValue} keyColours={keyColours} onKey={props.onKey}/>)}
      </div>
    )
  });
}

function keyColourUpdate(prevGuesses, answerWord) {
  const KEYCOL = new Map()
  for (let k = 0; k < prevGuesses.length; k++) {
    const letterCheck = checkAgainstAnswer(prevGuesses[k], answerWord);
    for (let l = 0; l < letterCheck.length; l++) {
      if (!(KEYCOL.get(prevGuesses[k][l]))) {
        KEYCOL.set(prevGuesses[k][l], letterCheck[l])
      } else if ((KEYCOL.get(prevGuesses[k][l]) === 'almost' || KEYCOL.get(prevGuesses[k][l]) === 'false') && letterCheck[l] === 'true') {
        KEYCOL.set(prevGuesses[k][l], letterCheck[l])
      };
      };
    };
  return KEYCOL;
}

// Key component handles each Key in the Keyboard

function Key(props) {
  const colour = (props.keyColours).get(props.legend)
  return (
    <div className={`key ${colour}`} onClick={() => {props.onKey(props.legend)}}>
    {props.legend}
    </div>
  )
};
