'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Recruiting', href: '/dashboard/recruiting' },
  { name: 'Manager', href: '/dashboard/manager' },
  { name: 'Analytics', href: '/dashboard/analytics', disabled: true },
  { name: 'Settings', href: '/dashboard/settings', disabled: true },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-bg-light">
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold text-bg-dark mb-6">Distretto Magnani</h2>
        <nav className="space-y-2">
          {navItems.map((item) =>
            item.disabled ? null : (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    'block px-4 py-2 rounded-xl text-sm font-medium hover:bg-bg-red hover:text-white transition-all',
                    pathname === item.href ? 'bg-bg-red text-white' : 'text-gray-700'
                  )}
                >
                  {item.name}
                </span>
              </Link>
            )
          )}
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
