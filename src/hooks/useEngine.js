import { useCallback, useEffect, useState } from "react";
import { countAlphabetErrors, debug, countWordErrors } from "../utils/helpers";
import useCountdown from "./useCountdown";
import useTypings from "./useTypings";
import useWords from "./useWords";


const NUMBER_OF_WORDS = 30;
const COUNTDOWN_SECONDS = 15;

const useEngine = () => {
  const [state, setState] = useState("start");
  const { timeLeft, startCountdown, resetCountdown } = useCountdown(COUNTDOWN_SECONDS);
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(state !== "finish");
  const [errors, setErrors] = useState(0);
  const [wordErrors, setWordErrors] = useState(0);
  const [wpm, setWpm] = useState(0);

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const restart = useCallback(() => {
    debug("restarting...");
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    setWordErrors(0);
    setWpm(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  const sumAlphabetErrors = useCallback(() => {
    debug(`cursor: ${cursor} - words.length: ${words.length}`);
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    setErrors((prevErrors) => prevErrors + countAlphabetErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  const sumWordErrors = useCallback(() => {
    debug(`cursor: ${cursor} - words.length: ${words.length}`);
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    setWordErrors((prevErrors) => prevErrors + countWordErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  const calculateWpm = useCallback(() => {
    const minutes = (COUNTDOWN_SECONDS - timeLeft) / 60;
    const wpm = Math.round(totalTyped / 5 / minutes);
    setWpm(wpm);
  }, [timeLeft, totalTyped]);

  // as soon the user starts typing the first letter, we start
  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  // when the time is up, we've finished
  useEffect(() => {
    if (!timeLeft && state === "run") {
      debug("time is up...");
      setState("finish");
      sumAlphabetErrors();
      calculateWpm();
      sumWordErrors();
    }
  }, [timeLeft, state, sumAlphabetErrors, calculateWpm, sumWordErrors]);


  /**
   * when the current words are all filled up,
   * we generate and show another set of words
   */
  useEffect(() => {
    if (areWordsFinished) {
      debug("words are finished...");
      sumAlphabetErrors();
      sumWordErrors();
      calculateWpm();
      updateWords();
      clearTyped();
    }
  }, [clearTyped, areWordsFinished, updateWords, sumAlphabetErrors, sumWordErrors, calculateWpm]);

  return { state, words, typed, errors, restart, timeLeft, totalTyped, wordErrors, wpm };
};

export default useEngine;