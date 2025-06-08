import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard Recruiting - Banca Generali Private',
  description: 'Sistema di gestione recruiting per Banca Generali Private Distretto Magnani',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" dir="ltr">
      <body className={`${inter.className} bg-bg-light min-h-screen text-foreground antialiased`}>
        {children}
      </body>
    </html>
  )
}
