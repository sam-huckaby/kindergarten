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
      <button className="flex flex-col border border-transparent hover:border-neutral-200 rounded px-4" onClick={() => setOpen(!open)}>
        <span className="select-none bg-neutral-200 h-[3px] w-[25px] mt-4 mb-2">&nbsp;</span>
        <span className="select-none bg-neutral-200 h-[3px] w-[25px]">&nbsp;</span>
        <span className="select-none bg-neutral-200 h-[3px] w-[25px] mt-2 mb-4">&nbsp;</span>
      </button>
    </div>
    <div className={`fixed top-20 right-0 bottom-0 left-0 z-40 bg-gray-500/50 ${open ? 'flex' : 'hidden'}`} onClick={() => setOpen(false)}>
      <div className={`
          md:w-[300px] flex-col ${open ? 'flex' : 'hidden'} justify-between
          fixed right-0 left-0 md:left-auto top-20 bottom-0 z-50
          md:border-l border-solid border-black
          bg-neutral-200 dark:bg-neutral-800`}>
        <div>
          <div className="menu-header h-20 p-4 flex flex-row items-center text-2xl font-bold">For Parents</div>
          <Link className={`h-16 p-4 flex flex-row items-center hover:bg-gray-400/25 cursor-pointer text-xl`} href="/about">Where Am I?</Link>
        </div>
        <Link className={`h-16 p-2 m-2 border border-solid border-black dark:border-neutral-200 rounded flex flex-row items-center justify-center hover:bg-gray-400/25 cursor-pointer text-xl`} href="/">Home</Link>
      </div>
    </div>
  </>;
};
