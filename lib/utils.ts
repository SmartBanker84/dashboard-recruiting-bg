import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}

export function getMonthStats(candidates: { created_at?: string }[]) {
  const monthly = new Array(12).fill(0)

  candidates.forEach((c) => {
    if (c.created_at) {
      const month = new Date(c.created_at).getMonth()
      monthly[month]++
    }
  })

  return monthly
}
