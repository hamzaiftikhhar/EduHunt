import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const variantClasses = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-400",
  secondary: "bg-secondary-600 text-white hover:bg-secondary-700 disabled:bg-secondary-400",
  outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 disabled:opacity-50",
  ghost: "text-primary-600 hover:bg-primary-50 disabled:opacity-50",
};

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-6 py-2 text-base",
  lg: "px-8 py-3 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`rounded-lg font-semibold transition-all ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
