import { useEffect } from 'react';
//Keyboard component structures the on-screen keyboard and takes input from
// physical and software keyboard.

export default function Keyboard (props) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        props.onKey('Backspace')
      } else if (e.key === 'Enter') {
        props.onKey("Enter")
      } else if (e.key.match(/[a-zA-Z]/)) {
        props.onKey(e.key)
      };
      };

      document.addEventListener("keydown", handler);
      return () => {
        document.removeEventListener("keydown", handler);
      }
    }, [props.onKey]);

  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Del"],
  ];

  return keys.map((row, index) => {
    return (
      <div className='key-row' key={index}>
        {row.map((keyValue) => <Key key={keyValue} legend={keyValue} onKey={props.onKey}/>)}
      </div>
    )
  });
}

// Key component handles each Key in the Keyboard

function Key(props) {
  return (
    <button className='key' onClick={() => {props.onKey(props.legend)}}>
    {props.legend}
    </button>
  )
};
