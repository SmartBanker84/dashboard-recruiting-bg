import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import SupabaseProvider from './SupabaseProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Distretto Magnani Recruiting',
  description: 'Dashboard per la gestione delle candidature',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
