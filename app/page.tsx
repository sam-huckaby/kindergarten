import { AssessmentTile, AssessmentTileProps } from "./AssessmentTile";

export default function Home() {
  const tiles: AssessmentTileProps[] = [
    { title: "Alphabet Flashcards (English & Koine Greek)", href: "/pk/alphabet", grade: "PK" },
    { title: "High-Frequency Words", href: "/k/heartwords", grade: "K" },
    { title: "Letter Sound Fluency", href: "/k/lettersounds", grade: "K" },
    { title: "Basic Counting", href: "/k/counting", grade: "K" },
  ];

  return (
    <main className="flex h-full flex-col items-center justify-start p-4 pt-24">
      {
        tiles.map(({title, href, grade}) => <AssessmentTile title={title} href={href} grade={grade} />)
      }
    </main>
  )
}
