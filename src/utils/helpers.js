// accept only letters and whitespaces
export const isKeyboardCodeAllowed = (code) => {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space"
  );
};

export const countAlphabetErrors = (actual, expected) => {
  const expectedCharacters = expected.split("");

  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const countWordErrors = (actual, expected) => {
  const actualWords = actual.split(" ");
  const expectedWords = expected.split(" ");

  return expectedWords.reduce((wordErrors, expectedWord, i) => {
    const actualWord = actualWords[i];
    if (actualWord !== expectedWord) {
      wordErrors++;
    }
    return wordErrors;
  }, 0);
}

export const GrossWPM = (totalTyped, timeElapsed) => {
  return Math.round((totalTyped / 5 / timeElapsed) * 60);
};


export const calculateAccuracyPercentage = (errors, total) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }

  return 0;
};

export const formatPercentage = (percentage) => {
  return percentage.toFixed(0) + "%";
};

export const debug = (str) => {
  if (process.env.NODE_ENV === "development") {
    console.debug(str);
  }
};