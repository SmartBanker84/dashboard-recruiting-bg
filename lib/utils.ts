// utils.ts – Utility per gestire classi dinamiche con Tailwind (merge intelligente)

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Combina classi condizionali e gestisce conflitti con Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}
