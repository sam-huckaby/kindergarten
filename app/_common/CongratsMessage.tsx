'use client';

import localFont from "next/font/local";
import { useEffect, useMemo, useState } from "react";

const openDyslexic = localFont({ src: './OpenDyslexic-Regular.otf' });

export const CongratsMessage = () => {
  const phrases = [
    "Great job!",
    "You're a true inspiration!",
    "Dazzling performance!",
    "Gold star for you!",
    "You make it look easy!",
    "You're on fire!",
    "Absolutely radiant!",
    "You're unstoppable!",
    "Rock on!",
    "You're a star!",
    "You're dynamite!",
    "That was legendary!",
    "Nailed it!",
    "You're the bomb!",
    "Out of this world!",
    "Hot stuff coming through!",
    "You just blew my mind!",
    "Crushing it!",
    "That's how it's done!",
    "Superstar status achieved!",
    "Top-notch performance!",
    "You're in a league of your own!",
    "You're a sensation!",
    "You've outdone yourself!",
    "You left me speechless!",
    "You stole the show!",
    "You raised the bar!",
    "That was a showstopper!",
    "That was nothing short of brilliant!",
    "That was a breathtaking performance!",
    "You made us all proud!",
    "You brought the house down!",
    "You truly shined!",
  ];

  const [ chosen, setChosen ] = useState("");

  useEffect(() => {
    // Generate random index
    const randomIndex = Math.floor(Math.random() * phrases.length);

    // Select random element
    const randomPhrase = phrases[randomIndex];

    // Update the displayed word
    setChosen(randomPhrase);
  }, []); // This is recalculated on every render on purpose

  return <h1 className={`text-2xl ${openDyslexic.className}`}>{chosen}</h1>
};
