'use client';

import React, { ChangeEvent, useRef, useState } from "react";
import localFont from "next/font/local";

// Can't decide if this should be moved to a global location
// TODO: When more assessments are added, move it somewhere better
const openDyslexic = localFont({ src: '/OpenDyslexic-Regular.otf' })

export default function Practice() {
  // Maybe store these in a DB at some point
  const letters = [
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
  ];

  const soundsLike = [
    "\"Apple\" or \"Ant\"",
    "\"Boy\" or \"Ball\"",
    "\"Candy or Cat",
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
  ];

  const [position, setPosition] = useState(0);
  const [dyslexic, setDyslexic] = useState(false);
  const [jump, setJump] = useState<string>();

  const nextLetter = () => {
    setPosition(position + 1);
  };

  const prevLetter = () => {
    setPosition(position - 1);
  };

  const jumpToLetter = (letter: string) => {
    setPosition(letters.indexOf(letter));
    setJump("JUMP");
  };

  return (
    <main className="flex p-16 pt-24 h-full">
        <div className="flex flex-col items-center justify-between grow">
          <div className="timer-container flex flex-col items-center justify-center">
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className={`word text-6xl text-center font-lexend font-bold ${dyslexic ? openDyslexic.className : ''}`}>{letters[position]}</div>
            <div className={`word mt-4 italic text-2xl text-center font-lexend ${dyslexic ? openDyslexic.className : ''}`}>Like {soundsLike[position]}</div>
            {
              false && <button className="mt-8 text-gray-500 border border-solid border-gray-500 rounded p-2" onClick={() => setDyslexic(!dyslexic)}>Dyslexic mode: {dyslexic ? "on" : "off"}</button>
            }
          </div>
          <div className="flex flex-row justify-center items-center">
            <button className="p-4 rounded border border-black dark:border-white border-solid w-full text-center" disabled={position < 1} onClick={prevLetter}>Prev</button>
            <select value={jump} className="p-4 mx-4 rounded border border-solid border-black dark:border-white dark:bg-black" onChange={(e) => jumpToLetter(e.target.value)}>
              <option value="JUMP">Jump to</option>
              {
                letters.map((letter) => <option key={letter} value={letter}>{letter}</option>)
              }
            </select>
            <button className="p-4 rounded border border-black dark:border-white border-solid w-full text-center" disabled={position > 24} onClick={nextLetter}>Next</button>
          </div>
        </div>
    </main>
  )
}
