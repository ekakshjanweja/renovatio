import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './style.css'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js + Replicate + Typescript',
  description: 'Replicate Typescript Starter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
