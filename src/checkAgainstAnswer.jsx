// Function to check input against word of the day and return
// correct, incorrect or almost correct.
// 2 passes to:
//  1. check for correct letters in correct position
//  2. to then check for remaining correct letters in incorrect position

export default function checkAgainstAnswer(guess, answerWord) {
  let currentGuess = guess.split("");
  let remainingLettersInWord = answerWord.split("");
  let result = ['false', 'false', 'false', 'false', 'false'];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answerWord[i]) {
      result.splice(i, 1,'true');
      remainingLettersInWord.splice(i, 1," ");
      currentGuess.splice(i, 1, " ")
    };
  };

  for (let j = 0; j < guess.length; j++) {
    if (currentGuess[j] != " ") {
      if (remainingLettersInWord.includes(currentGuess[j])) {
        remainingLettersInWord.splice(remainingLettersInWord.lastIndexOf(currentGuess[j]),1, " ")
        result.splice(j, 1,'almost');
    }
  }
  }
  return result;
};
