import { AssessmentTile } from "./AssessmentTile";

export default function Home() {

  return (
    <main className="flex h-full flex-col items-center justify-start p-4 pt-24">
      <AssessmentTile title="Alphabet Flashcards (English & Koine Greek)" href="/alphabet" grade="PK" />
      <AssessmentTile title="High-Frequency Words" href="/heartwords" grade="K" />
      <AssessmentTile title="Letter Sound Fluency" href="/lettersounds" grade="K" />
    </main>
  )
}
