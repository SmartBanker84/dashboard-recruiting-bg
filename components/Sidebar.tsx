'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  Users,
  BarChart2,
} from 'lucide-react'

const navItems = [
  {
    name: 'Home',
    href: '/',
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: 'Recruiting',
    href: '/dashboard/recruiting',
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: 'Manager',
    href: '/dashboard/manager',
    icon: <BarChart2 className="h-5 w-5" />,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full sm:w-64 bg-white border-r min-h-screen px-4 py-6 shadow-sm">
      <div className="text-xl font-bold text-bg-dark mb-6">Distretto Magnani</div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-100',
              pathname === item.href ? 'bg-gray-100 text-bg-dark' : 'text-gray-600'
            )}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
