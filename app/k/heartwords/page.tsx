"use client";

import { FormEvent, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import localFont from "next/font/local";
import { CongratsMessage } from "@common/CongratsMessage";

enum GameState {
  INITIAL = "initial",
  PLAY = "play",
  END = "end",
  SELECT = "select",
};

const timeLimit = 60;

// Can't decide if this should be moved to a global location
// TODO: When more assessments are added, move it somewhere better
const openDyslexic = localFont({ src: '/OpenDyslexic-Regular.otf' })

export default function Practice() {
  // Type definitions
  interface WordSelections {
    [key: string]: boolean;
  }

  // Maybe store these in a DB at some point
  const words = [
    "i",
    "can",
    "see",
    "a",
    "the",
    "on",
    "like",
    "to",
    "is",
    "it",
    "big",
    "little",
    "my",
    "good",
    "yes",
    "no",
    "look",
    "he",
    "do",
    "you",
    "what",
    "this",
    "and",
    "under",
    "or",
    "are",
    "up",
    "down",
    "she",
    "her",
    "make",
    "they",
    "where",
    "with",
    "we",
    "play",
    "one",
    "have",
    "go",
    "hurt",
    "day",
    "of",
    "said",
    "that",
    "there",
    "out",
    "all",
    "read",
    "for",
    "finds",
    "was",
    "too",
    "come",
    "some",
    "your",
    "very",
    "use",
    "blue",
  ];

  const cookieValue = getCookie("homethink.heartwords");
  const savedSelections = cookieValue ? JSON.parse(cookieValue as string) as WordSelections : {};

  const initialSelected = new Set<string>(
    Object.entries(savedSelections)
      .filter(([_, selected]) => selected)
      .map(([word]) => word)
  );

  const [selectedWords, setSelectedWords] = useState<Set<string>>(initialSelected);

  const [available, setAvailable] = useState(words.filter((word) => savedSelections[word]));
  const [mode, setMode] = useState<GameState>(GameState.INITIAL);
  const [score, setScore] = useState<number>(0);
  const [showTime, setShowTime] = useState(true);
  const [time, setTime] = useState(timeLimit);
  const [word, setWord] = useState('');
  const [dyslexic, setDyslexic] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = (word: string) => {
    const newSelectedWords = new Set(selectedWords);
    if (newSelectedWords.has(word)) {
      newSelectedWords.delete(word);
    } else {
      newSelectedWords.add(word);
    }
    setSelectedWords(newSelectedWords);
  };

  useEffect(() => {
    randomize(words.filter((word) => savedSelections[word]));
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
    setAvailable(words.filter((word) => savedSelections[word]));
    setTime(timeLimit);
  };

  const randomize = (currentAvailable: string[]) => {
    const newAvailable = [...currentAvailable]; // Create a copy to avoid mutation
    const randomIndex = Math.floor(Math.random() * newAvailable.length);
    const randomWord = newAvailable[randomIndex];

    newAvailable.splice(randomIndex, 1); // Mutate the copy, not the original
    setAvailable(newAvailable); // Set the new array as state
    setWord(randomWord);
  };

  const nextWord = () => {
    setScore(score + 1);

    if (available.length === 1) {
      // If this is the last word, reset and randomize after the state updates
      const resetWords = words.filter((word) => savedSelections[word]);
      setAvailable(resetWords);
      setTimeout(() => randomize(resetWords), 0); // Defer randomization until state is updated
    } else {
      // Otherwise, proceed with the current available words
      randomize(available);
    }
  };

  const restart = async () => {
    setScore(0);
    randomize(words.filter((word) => savedSelections[word]));
    setMode(GameState.PLAY);
  };

  const saveSettings = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const wordMap: WordSelections = {};
    words.forEach((word) => {
      wordMap[word] = selectedWords.has(word);
    });

    setCookie('homethink.heartwords', JSON.stringify(wordMap), {
      maxAge: 60 * 60 * 24 * 7 // 7 days in seconds
    });
    setTime(timeLimit);
    restart();
  };

  return (
    <main className="flex p-16 pt-24 h-full">
      {
        mode === GameState.SELECT &&
        <div className="flex flex-col w-full">
          Configure Words:
          <form className="flex flex-col w-full h-full" onSubmit={saveSettings}>
            <div className="w-full h-full flex flex-col flex-wrap">
              {
                words.sort().map((word) => {
                  return <span key={word}>
                    <input
                      id={word}
                      name={word}
                      type="checkbox"
                      value={word}
                      checked={selectedWords.has(word)}
                      onChange={() => handleCheckboxChange(word)}
                    />
                    <label className="pl-2" htmlFor={word}>{word}</label>
                  </span>
                })
              }
            </div>
            <button className="border border-solid border-gray-300" type="submit">Save & Restart</button>
          </form>
        </div>
      }
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
        <div className="relative flex flex-col items-center justify-between grow">
          <button className="absolute top-1 right-1" onClick={() => setMode(GameState.SELECT)}><i className="bi-gear-fill text-3xl"></i></button>
          <div className="timer-container flex flex-col items-center justify-center">
            {showTime && <div className="timer text-xl text-center font-bold font-mono">{time}</div>}
            <div className="select-none mt-4 text-gray-500 cursor-pointer border border-solid border-gray-500 rounded p-2" onClick={() => setShowTime(!showTime)}  >
              {showTime ? "hide" : "show"}
            </div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className={`word text-6xl text-center font-lexend font-bold ${dyslexic ? openDyslexic.className : ''}`}>{word}</div>
            <button className="select-none mt-8 text-gray-500 border border-solid border-gray-500 rounded p-2" onClick={() => setDyslexic(!dyslexic)}>Dyslexic mode: {dyslexic ? "on" : "off"}</button>
          </div>
          <div className="flex flex-col items-center">
            <button className="select-none p-4 rounded border border-black dark:border-white border-solid w-full text-center" onClick={nextWord}>Next</button>
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
