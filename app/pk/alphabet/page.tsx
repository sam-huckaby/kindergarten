'use client';

import React, { useState } from "react";
import localFont from "next/font/local";

// Can't decide if this should be moved to a global location
// TODO: When more assessments are added, move it somewhere better
const openDyslexic = localFont({ src: '/OpenDyslexic-Regular.otf' });

export type Language = "english" | "greek";

export type AlphabetData = {
  letters: string[];
  soundsLike: string[];
};

export type Alphabets = Record<Language, AlphabetData>;

export default function Practice() {
  // Maybe store these in a DB at some point
  const alphabets: Alphabets = {
    english: {
      letters: [
        "A a",
        "B b",
        "C c",
        "D d",
        "E e",
        "F f",
        "G g",
        "H h",
        "I i",
        "J j",
        "K k",
        "L l",
        "M m",
        "N n",
        "O o",
        "P p",
        "Q q",
        "R r",
        "S s",
        "T t",
        "U u",
        "V v",
        "W w",
        "X x",
        "Y y",
        "Z z",
      ],
      soundsLike: [
        "\"Apple\" or \"Ant\"",
        "\"Boy\" or \"Ball\"",
        "\"Candy\" or \"Cat\"",
        "\"Dad\" or \"Dinosaur\"",
        "\"Echo\" or \"Excited\"",
        "\"Fancy\" or \"Fun\"",
        "\"Good\" or \"Game\"",
        "\"Happy\" or \"Hot\"",
        "\"Ink\" or \"Inside\"",
        "\"Jump\" or \"Joke\"",
        "\"Kichen\" or \"Kitten\"",
        "\"Lady\" or \"Lamb\"",
        "\"Mom\" or \"Magic\"",
        "\"Nut\" or \"Never\"",
        "\"On\" or \"Out\"",
        "\"Pet\" or \"Pretty\"",
        "\"Queen\" or \"Quick\"",
        "\"Rain\" or \"Run\"",
        "\"Soft\" or \"Silly\"",
        "\"Touch\" or \"Take\"",
        "\"Under\" or \"Up\"",
        "\"Very\" or \"Victory\"",
        "\"Wash\" or \"Wall\"",
        "\"T-Rex\" or \"Box\"",
        "\"Yes\" or \"Yellow\"",
        "\"Zebra\" or \"Zipper\"",
      ],
    },
    greek: {
      letters: [
        "Α α",
        "Β β",
        "Γ γ",
        "Δ δ",
        "Ε ε",
        "Ζ ζ",
        "Η η",
        "Θ θ",
        "Ι ι",
        "Κ κ",
        "Λ λ",
        "Μ μ",
        "Ν ν",
        "Ξ ξ",
        "Ο ο",
        "Π π",
        "Ρ ρ",
        "Σ σ/ς",
        "Τ τ",
        "Υ υ",
        "Φ φ",
        "Χ χ",
        "Ψ ψ",
        "Ω ω",
      ],
      soundsLike: [
        "\"Apple\" or \"Ant\"",
        "\"Boy\" or \"Ball\"",
        "\"Good\" or \"Game\"",
        "\"Dad\" or \"Dinosaur\"",
        "\"Echo\" or \"Excited\"",
        "\"Zebra\" or \"Zoom\"",
        "\"Ate\" or \"Aim\"",
        "\"THink\" or \"THunder\"",
        "\"Ink\" or \"Inside\"",
        "\"Comb\" or \"Cotton\"",
        "\"Lady\" or \"Lamb\"",
        "\"Mom\" or \"Magic\"",
        "\"Nut\" or \"Never\"",
        "\"t-reX\" or \"boX\"",
        "\"On\" or \"Out\"",
        "\"Pet\" or \"Pretty\"",
        "\"Rain\" or \"Run\"",
        "\"Soft\" or \"Silly\"",
        "\"Touch\" or \"Take\"",
        "\"sOOn\" or \"mOOd\"",
        "\"PHilosophy\" or \"PHineas\"",
        "\"loCH\" or \"CHasm\"",
        "\"PSsst\" (The P is not silent)",
        "\"Own\" or \"Over\"",
      ],
    },
  };

  const [language, setLanguage] = useState<Language>('english');
  const [position, setPosition] = useState(0);
  const [dyslexic, setDyslexic] = useState(false);
  const [jump, setJump] = useState<string>();

  const changeLanguage = (language: Language) => {
    setPosition(0);
    setLanguage(language);
  };

  const nextLetter = () => {
    setPosition(position + 1);
  };

  const prevLetter = () => {
    setPosition(position - 1);
  };

  const jumpToLetter = (letter: string) => {
    setPosition(alphabets[language].letters.indexOf(letter));
    setJump("JUMP");
  };

  return (
    <main className="flex p-16 pt-24 h-full">
      <div className="flex flex-col items-center justify-between grow">
        <div className="timer-container flex flex-col items-center justify-center">
          <select onChange={(e) => changeLanguage(e.target.value as Language)} className="select-none p-4 mx-4 rounded border border-solid border-black dark:border-white dark:bg-black">
            <option value="english">English</option>
            <option value="greek">Koine Greek</option>
          </select>
        </div>
        <div className="flex flex-col items-center justify-between">
          <div className={`word text-6xl text-center font-lexend font-bold ${dyslexic ? openDyslexic.className : ''}`}>{alphabets[language].letters[position]}</div>
          <div className={`word p-4 mt-4 italic text-2xl text-center font-lexend ${dyslexic ? openDyslexic.className : ''}`}>Like {alphabets[language].soundsLike[position]}</div>
          {
            false && <button className="select-none mt-8 text-gray-500 border border-solid border-gray-500 rounded p-2" onClick={() => setDyslexic(!dyslexic)}>Dyslexic mode: {dyslexic ? "on" : "off"}</button>
          }
        </div>
        <div className="flex flex-row justify-center items-center">
          <button className="select-none p-4 rounded border border-black dark:border-white border-solid w-full text-center disabled:bg-gray-300/50 disabled:text-gray-500 dark:disabled:bg-gray-800/50 dark:disabled:text-gray-500" disabled={position < 1} onClick={prevLetter}>Prev</button>
          <select value={jump} className="select-none p-4 mx-4 rounded border border-solid border-black dark:border-white dark:bg-black" onChange={(e) => jumpToLetter(e.target.value)}>
            <option value="JUMP">Jump to</option>
            {
              alphabets[language].letters.map((letter) => <option key={letter} value={letter}>{letter}</option>)
            }
          </select>
          <button className="select-none p-4 rounded border border-black dark:border-white border-solid w-full text-center disabled:bg-gray-300/50 disabled:text-gray-500 dark:disabled:bg-gray-800/50 dark:disabled:text-gray-500" disabled={position > alphabets[language].letters.length-2} onClick={nextLetter}>Next</button>
        </div>
      </div>
    </main>
  )
}
