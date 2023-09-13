import Link from "next/link";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl">High-Frequency</h1>
        <h1 className="text-2xl mb-4">Word Assessment</h1>
        <Link className="p-4 rounded border border-black border-solid w-full text-center" href="/test">Start</Link>
      </div>
    </main>
  )
}
