'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="inline-flex items-center space-x-2 cursor-pointer">
        <span className="text-sm text-gray-700">{label}</span>
        <span className="relative">
          <input
            type="checkbox"
            ref={ref}
            className={cn(
              'sr-only peer',
              className
            )}
            {...props}
          />
          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-red-600 transition-colors" />
          <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
        </span>
      </label>
    )
  }
)

Switch.displayName = 'Switch'

export { Switch }
