import localFont from "next/font/local";
import Link from "next/link";

const openDyslexic = localFont({ src: './OpenDyslexic-Regular.otf' })

export default function Home() {

  return (
    <main className="flex h-full flex-col items-center justify-start p-4 pt-24">
      <div className="fixed top-0 left-0 right-0 h-20 p-4 flex flex-row items-center justify-between bg-[#003865]">
        <span className={`text-2xl text-neutral-200 ${openDyslexic.className}`}>HomeThink</span>
        <Link className="flex flex-col border border-transparent hover:border-black rounded px-4 hidden" href="/">
          <span className="bg-neutral-200 h-[3px] w-[25px] mt-4 mb-2">&nbsp;</span>
          <span className="bg-neutral-200 h-[3px] w-[25px]">&nbsp;</span>
          <span className="bg-neutral-200 h-[3px] w-[25px] mt-2 mb-4">&nbsp;</span>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center p-8 width-full border border-solid border-black dark:border-neutral-200">
        <h1 className="text-2xl text-center mb-4">High-Frequency Word Practice</h1>
        <Link className="p-4 rounded border border-solid border-black dark:border-neutral-200 w-full text-center" href="/test">Start</Link>
      </div>
    </main>
  )
}
