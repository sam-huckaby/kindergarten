import localFont from "next/font/local";
import Link from "next/link";

const openDyslexic = localFont({ src: '/OpenDyslexic-Regular.otf' });

type Grade = "K" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

export interface AssessmentTileProps {
  title: string;
  href: string;
  grade: Grade;
};

const gradeTextColor = (grade: Grade) => {
  switch (grade) {
    case "K":
      return "bg-red-600";
    case "1":
      return "bg-blue-600";
    case "2":
      return "bg-yellow-600";
    case "3":
      return "bg-emerald-600";
    case "4":
      return "bg-orange-600";
    case "5":
      return "bg-violet-600";
    case "6":
      return "bg-teal-600";
    case "7":
      return "bg-slate-600";
    case "8":
      return "bg-rose-600";
    case "9":
      return "bg-black";
    case "10":
      return "bg-cyan-600";
    case "11":
      return "bg-lime-600";
    default:
      return "bg-white";
  }
}

const gradeBGColor = (grade: Grade) => {
  switch (grade) {
    case "K":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "10":
    case "11":
      return "text-white";
    default:
      return "text-black";
  }
}

export const AssessmentTile = ({ title, href, grade }: AssessmentTileProps) => {
  const textColor = gradeTextColor(grade);
  const bgColor = gradeBGColor(grade);

  return (
    <div className={`relative flex flex-col items-center justify-center p-[50px] w-full md:max-w-[500px] mb-4 border border-solid border-black dark:border-neutral-200 ${openDyslexic.className}`}>
      <span className={`
        absolute top-0 left-0 
        flex flex-col items-center justify-center 
        h-[50px] w-[50px] 
        border-r border-b border-solid border-black 
        font-bold text-2xl
        ${textColor} ${bgColor}`}>
        {grade}
      </span>
      <h1 className="text-2xl text-center mb-4">{title}</h1>
      <Link className="p-4 rounded border border-solid border-black dark:border-neutral-200 w-full text-center" href={href}>Start</Link>
    </div>
  );
};
