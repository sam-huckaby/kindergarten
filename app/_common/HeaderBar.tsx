'use client';

import localFont from "next/font/local";
import Link from "next/link";
import { useState } from "react";

const openDyslexic = localFont({ src: './OpenDyslexic-Regular.otf' });

export const HeaderBar = () => {
  const [open, setOpen] = useState(false);

  return <>
    <div className="fixed top-0 left-0 right-0 z-40 h-20 p-4 flex flex-row items-center justify-between bg-[#003865]">
      <Link href="/" className={`text-2xl text-neutral-200 ${openDyslexic.className}`}>HomeThink</Link>
      {/* The link below is hidden on purpose, beause the menu is not yet built. The hidden class should be changed to flex when it is */}
      <button className="flex flex-col border border-transparent hover:border-black rounded px-4" onClick={() => setOpen(!open)}>
        <span className="bg-neutral-200 h-[3px] w-[25px] mt-4 mb-2">&nbsp;</span>
        <span className="bg-neutral-200 h-[3px] w-[25px]">&nbsp;</span>
        <span className="bg-neutral-200 h-[3px] w-[25px] mt-2 mb-4">&nbsp;</span>
      </button>
    </div>
    <div className={`fixed top-0 right-0 bottom-0 left-0 z-40 bg-gray-500/50 ${open ? 'flex' : 'hidden'}`} onClick={() => setOpen(false)}>
      <div className={`
          w-[300px] flex-col ${open ? 'flex' : 'hidden'} justify-between
          fixed right-0 top-0 bottom-0 z-50
          border-l border-solid border-black
          bg-gray-400 text-2xl`}>
        <div>
          <Link className={`h-20 p-4 flex flex-row items-center hover:bg-gray-200/25 cursor-pointer`} href="/about">Where Am I?</Link>
        </div>
        <Link className={`h-20 p-4 flex flex-row items-center hover:bg-gray-200/25 cursor-pointer`} href="/">Home</Link>
      </div>
    </div>
  </>;
};
