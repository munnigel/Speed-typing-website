import React from "react";
import { useCallback, useEffect } from "react";
import GeneratedWords from "./components/GeneratedWords";
import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import UserTypings from "./components/UserTypings";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helpers";
import CtrlKey from "../src/Assets/ctrl-key.png";


const App = () => {
  const { words, typed, timeLeft, errors, state, restart, totalTyped, wordErrors, wpm } =
    useEngine();

    // handle what happens on key press
    const handleKeyPress = useCallback((event) => {
      if (event.key === "Control") {
        restart();
      }
    }, []);
  
    useEffect(() => {
      // attach the event listener
      document.addEventListener('keydown', handleKeyPress);
  
      // remove the event listener
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, [handleKeyPress]);

  return (
    <>
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords key={words} words={words} />
        {/* User typed characters will be overlayed over the generated words */}
        <UserTypings
          className="absolute inset-0 letter-spacing-3 tracking-wider"
          words={words}
          userInput={typed}
        />
      </WordsContainer>
      <div className="flex items-center justify-center mt-5">
        <RestartButton
          className={" text-slate-400 mr-2"}
          onRestart={restart}
        />
        <div>/</div>
        <img src={CtrlKey} alt="ctrl key" className=" w-12 ml-7 text-slate-500" />
      </div>
      <Results
        className="mt-10"
        state={state}
        errors={errors}
        wordErrors={wordErrors}
        wpm={wpm}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
      />
    </>
  );
};

const WordsContainer = ({ children }) => {
  return (
    <div className="relative text-3xl max-w-4xl leading-relaxed mt-3">
      {children}
    </div>
  );
};

const CountdownTimer = ({ timeLeft }) => {
  return <h2 className="text-primary-400 font-medium">Time: {timeLeft}</h2>;
};

export default App;