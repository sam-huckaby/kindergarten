'use client';

import React, { useState } from 'react';
import { AssessmentTile, AssessmentTileProps, Grade } from './AssessmentTile';

export const TileList = () => {
  const tiles: AssessmentTileProps[] = [
    { title: "Alphabet Flashcards (English & Koine Greek)", href: "/pk/alphabet", grade: "PK" },
    { title: "High-Frequency Words", href: "/k/heartwords", grade: "K" },
    { title: "Letter Sound Fluency", href: "/k/lettersounds", grade: "K" },
    { title: "Basic Counting", href: "/k/counting", grade: "K" },
  ];

  const [filterGrade, setFilterGrade] = useState<Grade | "All">("All");

  const selectGrade = (grade: Grade) => {
    setFilterGrade(grade);
  };

  const filterTiles = ({grade}: AssessmentTileProps) => {
    if(filterGrade === "All") return true;

    return grade === filterGrade;
  };

  return <div className="flex flex-col justify-center items-center">
      <select onChange={({ target: { value} }) => selectGrade(value as Grade)} className="mb-4 p-4 bg-transparent dark:bg-black rounded border border-solid border-black dark:border-neutral-200">
        <option className='hover:bg-red-600' value="All">All</option>
        <option value="PK">Pre-K</option>
        <option value="K">Kindergarten</option>
      </select>
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {
        tiles.filter(filterTiles).map(({title, href, grade}) => <AssessmentTile key={href} title={title} href={href} grade={grade} />)
      }
      </div>
  </div>;
};
