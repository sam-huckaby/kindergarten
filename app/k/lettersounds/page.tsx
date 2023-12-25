'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import localFont from "next/font/local";
import { CongratsMessage } from "@common/CongratsMessage";

enum GameState {
  INITIAL = "initial",
  PLAY = "play",
  END = "end",
};

const timeLimit = 60;

// Can't decide if this should be moved to a global location
// TODO: When more assessments are added, move it somewhere better
const openDyslexic = localFont({ src: '/OpenDyslexic-Regular.otf' })

export default function Practice() {
  // Maybe store these in a DB at some point
  const words = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const [available, setAvailable] = useState(words);
  const [mode, setMode] = useState<GameState>(GameState.INITIAL);
  const [score, setScore] = useState<number>(0);
  const [showTime, setShowTime] = useState(true);
  const [time, setTime] = useState(timeLimit);
  const [letter, setLetter] = useState('');
  const [dyslexic, setDyslexic] = useState(false);

  useEffect(() => {
    randomize();
    setMode(GameState.PLAY);
  }, []);

  // Game loop
  useEffect(() => {
    if (mode !== GameState.PLAY) {
      return;
    }

    setTimeout(() => {
      // This happens at the END of each second, so when the second is 1, the next tick is the end
      if (time > 1) {
        setTime(time - 1);
      } else {
        endGame();
      }
    }, 1000);
  }, [time, mode]);

  const endGame = () => {
    setMode(GameState.END);
    setAvailable(words);
    setTime(timeLimit);
  };

  const randomize = () => {
    // Select random letter
    let randomLetter = available[Math.floor(Math.random() * available.length)];

    // Do not show the same letter twice in a row, because it is confusing
    while (randomLetter === letter) {
      randomLetter = available[Math.floor(Math.random() * available.length)];
    }

    // Update the displayed word
    setLetter(randomLetter);
  };

  const nextLetter = () => {
    setScore(score + 1);

    // If all words have been read end the game
    if (available.length === 0) {
      endGame();
      return;
    }

    // Otherwise, set the current word to a new random word
    randomize();
  };

  const restart = async () => {
    setScore(0);
    randomize();
    setMode(GameState.PLAY);
  };

  return (
    <main className="flex p-16 pt-24 h-full">
      {
        mode === GameState.INITIAL &&
        <div className="flex flex-row justify-center items-center grow">
          <div className="
            w-[50px] h-[50px]
            rounded-full animate-spin
            border-t-8 border-t-solid border-t-black dark:border-t-neutral-200
            border-r-8 border-r-solid border-r-black dark:border-r-neutral-200
            border-b-8 border-b-solid border-b-black dark:border-b-neutral-200
            border-l-8 border-l-transparent border-l-solid
            ">&nbsp;</div>
        </div>
      }
      {
        mode === GameState.PLAY &&
        <div className="flex flex-col items-center justify-between grow">
          <div className="timer-container flex flex-col items-center justify-center">
            {showTime && <div className="timer text-xl text-center font-bold font-mono">{time}</div>}
            <div className="mt-4 text-gray-500 cursor-pointer border border-solid border-gray-500 rounded p-2" onClick={() => setShowTime(!showTime)}  >
              {showTime ? "hide" : "show"}
            </div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className={`word text-6xl text-center font-lexend font-bold ${dyslexic ? openDyslexic.className : ''}`}>{letter}</div>
            <button className="mt-8 text-gray-500 border border-solid border-gray-500 rounded p-2" onClick={() => setDyslexic(!dyslexic)}>Dyslexic mode: {dyslexic ? "on" : "off"}</button>
          </div>
          <div className="flex flex-col items-center">
            <button className="p-4 rounded border border-black dark:border-white border-solid w-full text-center" onClick={nextLetter}>Next</button>
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
          <button onClick={restart} className="p-4 rounded border border-black dark:border-white border-solid w-full text-center">Try Again</button>
        </div>
      }
    </main>
  )
}
