'use client'

import React from 'react'
import { Sidebar } from '@/components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg-light">
      <Sidebar />
      <main className="flex-grow p-6 overflow-y-auto">{children}</main>
    </div>
  )
}
