'use client';

import { useEffect, useState } from "react";

enum GameState {
  INITIAL = "initial",
  PLAY = "play",
  END = "end",
};

const timeLimit = 10;

export default function Home() {

  const words = [
    "I",
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

  const [available, setAvailable] = useState(words);
  const [mode, setMode] = useState<GameState>(GameState.INITIAL);
  const [score, setScore] = useState<number>(0);
  const [showTime, setShowTime] = useState(true);
  const [time, setTime] = useState(timeLimit);
  const [word, setWord] = useState('');

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
    // Generate random index
    const randomIndex = Math.floor(Math.random() * available.length);

    // Select random element
    const randomWord = available[randomIndex];

    available.splice(randomIndex, 1);
    // Remove the word from the available pool of words
    setAvailable(available);
    // Update the displayed word
    setWord(randomWord);
  };

  const nextWord = () => {
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
    <main className="flex min-h-screen p-24 h-full">
      {
        mode === GameState.INITIAL &&
        <div className="flex flex-row justify-center items-center grow">
          <div className="
            w-[50px] h-[50px]
            rounded-full animate-spin
            border-t-8 border-t-black border-t-solid
            border-r-8 border-r-black border-r-solid
            border-b-8 border-b-black border-b-solid
            border-l-8 border-l-transparent border-l-solid
            ">&nbsp;</div>
        </div>
      }
      {
        mode === GameState.PLAY &&
        <div className="flex flex-col items-center justify-between grow">
          <div className="timer-container flex flex-col items-center justify-center">
            {showTime && <div className="timer text-xl text-center font-bold font-mono">{time}</div>}
            <div className="text-gray-500 cursor-pointer" onClick={() => setShowTime(!showTime)}  >
              {showTime ? "(hide)" : "(show)"}
            </div>
          </div>
          <div className="word text-6xl text-center font-sans font-bold">{word}</div>
          <div className="flex flex-col items-center">
            <button className="p-4 rounded border border-black dark:border-white border-solid w-full text-center" onClick={nextWord}>Next</button>
          </div>
        </div>
      }
      {
        mode === GameState.END &&
        <div className="flex flex-col items-center justify-around grow">
          <h1 className="text-2xl">Good Job!</h1>
          <p className="text-4xl">
            Score: <span className="font-bold">{score}</span>
          </p>
          <button onClick={restart} className="p-4 rounded border border-black dark:border-white border-solid w-full text-center">Try Again</button>
        </div>
      }
    </main>
  )
}
