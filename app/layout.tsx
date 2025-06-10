import './globals.css'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Distretto Magnani Recruiting',
  description: 'Dashboard per la gestione delle candidature',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-bg-light p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
