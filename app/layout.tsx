import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kindergarten Prep & Practice',
  description: 'A site to help parents partner with their children to learn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet" />
      </head>
      <body className={`h-full ${inter.className}`}>
        {children}
        {/*<div className="absolute bottom-[25px] left-[25px] w-[50px] h-[50px] rounded-full dark:text-black text-3xl border border-solid border-gray-800 bg-gray-200 flex flex-row items-center justify-center">=</div>*/}
      </body>
    </html>
  )
}
