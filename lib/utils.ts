import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}

export function getMonthStats(candidates: { created_at?: string }[]) {
  const months = Array(12).fill(0)

  for (const c of candidates) {
    const date = c.created_at ? new Date(c.created_at) : null
    if (date instanceof Date && !isNaN(date.getTime())) {
      const month = date.getMonth()
      months[month]++
    }
  }

  return months
}
