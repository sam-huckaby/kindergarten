import { AssessmentTile } from "./AssessmentTile";

export default function Home() {

  return (
    <main className="flex h-full flex-col items-center justify-start p-4 pt-24">
      <AssessmentTile title="Alphabet Flashcards (English & Koine Greek)" href="/pk/alphabet" grade="PK" />
      <AssessmentTile title="High-Frequency Words" href="/k/heartwords" grade="K" />
      <AssessmentTile title="Letter Sound Fluency" href="/k/lettersounds" grade="K" />
      <AssessmentTile title="Basic Counting" href="/k/counting" grade="K" />
    </main>
  )
}
