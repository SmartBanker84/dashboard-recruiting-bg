"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Distretto Magnani Recruiting',
  description: 'Dashboard per la gestione delle candidature',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Creiamo il client Supabase solo una volta per l'app
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <html lang="it">
      <body className={inter.className}>
        {/* Provider Supabase: tutto l'albero ha accesso a sessione/metodi */}
        <SessionContextProvider supabaseClient={supabase}>
          {children}
        </SessionContextProvider>
      </body>
    </html>
  )
}
