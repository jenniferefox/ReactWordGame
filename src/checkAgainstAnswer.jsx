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
