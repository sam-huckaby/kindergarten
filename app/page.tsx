import Link from "next/link";

export default function Home() {

  return (
    <main className="flex h-full flex-col items-center justify-center p-16">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl text-center mb-4">High-Frequency Word Practice</h1>
        <Link className="p-4 rounded border border-solid border-black dark:border-neutral-200 w-full text-center" href="/test">Start</Link>
      </div>
    </main>
  )
}
