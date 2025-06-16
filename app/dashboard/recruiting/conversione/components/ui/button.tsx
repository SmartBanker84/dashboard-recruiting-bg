'use client'

import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "success" | "default";
  size?: "sm" | "md" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "default", size = "md", ...props }, ref) => {
    let base = "rounded px-4 font-semibold transition";
    let color =
      variant === "success"
        ? "bg-green-600 hover:bg-green-700 text-white"
        : "bg-gray-200 hover:bg-gray-300 text-gray-900";
    let padding =
      size === "sm"
        ? "py-1 text-xs"
        : size === "lg"
        ? "py-3 text-base"
        : "py-2 text-sm";

    return (
      <button ref={ref} className={`${base} ${color} ${padding}`} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
