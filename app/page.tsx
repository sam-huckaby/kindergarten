import localFont from "next/font/local";
import Link from "next/link";
import { AssessmentTile } from "./AssessmentTile";

const openDyslexic = localFont({ src: '/OpenDyslexic-Regular.otf' });

export default function Home() {

  return (
    <main className="flex h-full flex-col items-center justify-start p-4 pt-24">
      <div className="fixed top-0 left-0 right-0 h-20 p-4 flex flex-row items-center justify-between bg-[#003865]">
        <span className={`text-2xl text-neutral-200 ${openDyslexic.className}`}>HomeThink</span>
        {/* The link below is hidden on purpose, beause the menu is not yet built. The hidden class should be changed to flex when it is */}
        <Link className="hidden flex-col border border-transparent hover:border-black rounded px-4" href="/">
          <span className="bg-neutral-200 h-[3px] w-[25px] mt-4 mb-2">&nbsp;</span>
          <span className="bg-neutral-200 h-[3px] w-[25px]">&nbsp;</span>
          <span className="bg-neutral-200 h-[3px] w-[25px] mt-2 mb-4">&nbsp;</span>
        </Link>
      </div>
      <AssessmentTile title="High-Frequency Words" href="/heartwords" grade="K" />
      <AssessmentTile title="Letter Sound Fluency" href="/lettersounds" grade="K" />
    </main>
  )
}
