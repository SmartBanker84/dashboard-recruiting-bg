import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-bg-red focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-bg-red text-white hover:bg-bg-red/90",
        outline: "border border-gray-300 bg-white text-bg-dark hover:bg-gray-50",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        ghost: "bg-transparent hover:bg-gray-100 text-bg-dark",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
