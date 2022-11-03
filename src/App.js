import React from "react";
import { useCallback, useEffect, useState } from "react";
import GeneratedWords from "./components/GeneratedWords";
import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import UserTypings from "./components/UserTypings";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helpers";
import CtrlKey from "../src/Assets/ctrl-key.png";
import {useDispatch, useSelector} from 'react-redux';
import { settingTimer } from "./Redux/timerSlice";
import { addingResults } from "./Redux/resultsSlice";
import { ResultsList } from "./components/ResultsList";


const App = () => {
  const { words, typed, timeLeft, errors, state, restart, totalTyped, wordErrors, wpm } =
    useEngine();
  const [chosen, setChosen] = useState(0);
  const [timer, setTimer] = useState(15);
  const [timerOptions, setTimerOptions] = useState(true);

  const dispatch = useDispatch();

  const {results} = useSelector((state) => state.results);
  console.log(results);

    // handle what happens on key press
    const handleKeyPress = useCallback((event) => {
      if (event.key === "Control") {
        restart();
        setTimerOptions(true);
        return
      }
      setTimerOptions(false);
    }, []);
  
    useEffect(() => {
      // attach the event listener
      document.addEventListener('keydown', handleKeyPress);
  
      // remove the event listener
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, [handleKeyPress]);

    //dispatch timer to redux store
    useEffect(() => {
      dispatch(settingTimer(timer))
    }, [timer])

    useEffect(() => {
      if (state === "finish") {
        let accuracy = calculateAccuracyPercentage(errors, totalTyped)
        dispatch(addingResults(
          accuracy,
          errors,
          wordErrors,
          totalTyped,
          wpm,
        ))
      }
    }, [state])


  return (
    <>
    { timerOptions &&
      <div className="inline-flex">
        <h2 className="text-primary-400 font-medium">Time: &nbsp;</h2>
        <h2 
          className={`font-medium cursor-pointer ${chosen == 0 ? 'text-primary-400' : 'text-slate-400'} `}
          onClick={() => {setChosen(0); setTimer(15);}} 
        >15</h2>
        <h2 className="text-primary-400 font-medium">&nbsp; / &nbsp;</h2>
        <h2 
          className={`font-medium cursor-pointer ${chosen == 1 ? 'text-primary-400' : 'text-slate-400'} `}
          onClick={() => {setChosen(1); setTimer(30)}}
          >30</h2>
        <h2 className="text-primary-400 font-medium">&nbsp; / &nbsp;</h2>
        <h2 
          className={`font-medium cursor-pointer ${chosen == 2 ? 'text-primary-400' : 'text-slate-400'} `}
          onClick={() => {setChosen(2); setTimer(60)}}
          >60</h2>
      </div>
    }
     { !timerOptions && <CountdownTimer timeLeft={timeLeft} /> }
      <WordsContainer>
        <GeneratedWords key={words} words={words} />
        {/* User typed characters will be overlayed over the generated words */}
        <UserTypings
          className="absolute inset-0 letter-spacing-2 tracking-wide"
          words={words}
          userInput={typed}
        />
      </WordsContainer>
      <div className="flex items-center justify-center mt-5">
        <RestartButton
          className={"text-slate-400 mr-2"}
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
      <ResultsList />
    </>
  );
};

const WordsContainer = ({ children }) => {
  return (
    <div className="relative text-3xl max-w-6xl leading-relaxed mt-3">
      {children}
    </div>
  );
};

const CountdownTimer = ({ timeLeft }) => {
  return <h2 className="text-primary-400 font-medium">Time: &nbsp;{timeLeft}</h2>;
};

export default App;