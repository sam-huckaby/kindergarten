'use client';

import { CongratsMessage } from "@common/CongratsMessage";
import React, { useEffect, useMemo, useState } from "react";

enum GameState {
  INITIAL = "initial",
  PLAY = "play",
  END = "end",
};

const timeLimit = 60;

export default function Practice() {
  const [mode, setMode] = useState<GameState>(GameState.INITIAL);
  const [score, setScore] = useState<number>(0);
  const [showTime, setShowTime] = useState(true);
  const [invert, setInvert] = useState(false);
  const [time, setTime] = useState(timeLimit);
  const [answer, setAnswer] = useState(0);
  const [timed, setTimed] = useState(true);

  useEffect(() => {
    nextNumber();
    setMode(GameState.PLAY);
  }, []);

  // Game loop
  useEffect(() => {
    if (mode !== GameState.PLAY || !timed) {
      return;
    }

    setTimeout(() => {
      if (!timed) return;
      // This happens at the END of each second, so when the second is 1, the next tick is the end
      if (time > 1) {
        setTime(time - 1);
      } else {
        endGame();
      }
    }, 1000);
  }, [time, mode]);

  const options = useMemo(() => {
    const opts = [answer];

    while (opts.length < 4) {
      let possible = Math.floor(Math.random() * 10) + 1;

      if (!opts.includes(possible)) {
        opts.push(possible);
      }
    }

    return opts.sort((a, b) => a - b);
  }, [answer]);

  const endGame = () => {
    setMode(GameState.END);
    nextNumber();
    setTime(timeLimit);
  };

  const restart = () => {
    setScore(0);
    nextNumber();
    setMode(GameState.PLAY);
  };

  const nextNumber = () => {
    // Let's prevent two of the same number in a row
    let possible = Math.floor(Math.random() * 10) + 1;

    while (possible === answer) {
      possible = Math.floor(Math.random() * 10) + 1;
    }

    setAnswer(possible);
    setInvert(Math.floor(Math.random() * 2) === 0);
  };

  const toggleTime = () => {
    setTimed(!timed);
    if (!timed) {
      setTime(time - 1);
    }
  };

  const guess = (val: number) => {
    if (val !== answer) {
      // WRONG ANSWER
      // Probably need to notify the user somehow
      // Maybe flash the button red or something?
      return false;
    }

    setScore(score + 1);
    nextNumber();
  };

  return (
    <main className="flex p-8 pt-28 h-full">
      {
        mode === GameState.INITIAL &&
        <div className="flex flex-row justify-center items-center grow">
          <div className="
            w-[50px] h-[50px]
            rounded-full animate-spin
            border-t-8 border-t-solid border-t-black dark:border-t-neutral-200
            border-r-8 border-r-solid border-r-black dark:border-r-neutral-200
            border-b-8 border-b-solid border-b-black dark:border-b-neutral-200
            border-l-8 border-l-solid border-l-transparent
            ">&nbsp;</div>
        </div>
      }
      {
        mode === GameState.PLAY &&
        <div className="w-full flex flex-col items-center justify-start grow">
          <div className="timer-container flex flex-row items-center justify-center gap-8">
            <div className="select-none text-gray-500 cursor-pointer border border-solid border-gray-500 rounded p-2" onClick={() => setShowTime(!showTime)}  >
              {showTime ? "hide time" : "show time"}
            </div>
            {
              showTime && <span className="select-none timer-time">{time}</span>
            }
            {
              showTime && <div className="select-none text-gray-500 cursor-pointer border border-solid border-gray-500 rounded p-2" onClick={toggleTime}  >
                {timed ? "stop" : "start"}
              </div>
            }
          </div>
          <div className="grow flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-6 flex-wrap text-8xl">
              {
                invert ?
                  <span className="select-none">{answer}</span> :
                  Array.from({ length: answer }).map((_, idx) => (
                    <div key={idx} className="rounded-full bg-neutral-800 dark:bg-neutral-200 h-10 w-10"></div>
                  ))
              }
            </div>
          </div>
          <div className="w-full grid grid-cols-2 sm:flex sm:flex-col sm:justify-start sm:items-center gap-4">
            {
              options.map((opt: number) =>
                <button key={opt} className="select-none flex flex-row justify-center items-center flex-wrap gap-2 px-4 py-8 sm:py-4 text-6xl rounded border border-black dark:border-white border-solid sm:w-full text-center disabled:bg-gray-300/50 disabled:text-gray-500 dark:disabled:bg-gray-800/50 dark:disabled:text-gray-500" onClick={() => guess(opt)}>
                  {
                    invert ?
                      Array.from({ length: opt }).map((_, idx) => (
                        <div key={idx} className="rounded-full bg-neutral-800 dark:bg-neutral-200 h-4 w-4 sm:h-8 sm:w-8"></div>
                      )) :
                      opt
                  }
                </button>
              )
            }
          </div>
        </div>
      }
      {
        mode === GameState.END &&
        <div className="flex flex-col items-center justify-around grow">
          <CongratsMessage />
          <p className="text-4xl">
            Score: <span className="font-bold">{score}</span>
          </p>
          <button onClick={restart} className="select-none p-4 rounded border border-black dark:border-white border-solid w-full text-center">Try Again</button>
        </div>
      }
    </main>
  )
}
