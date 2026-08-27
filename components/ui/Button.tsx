import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold font-[Inter] transition-all duration-200 cursor-pointer rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-offset-2";

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-[17px] text-base leading-6",
    lg: "px-10 py-5 text-base leading-6",
  };

  const variants = {
    primary: "text-white shadow-sm hover:opacity-90 active:opacity-80",
    outline:
      "text-[#1a73e8] border border-[rgba(192,200,200,0.3)] bg-transparent hover:bg-[#eef6ff] active:bg-[#d9e9ff]",
    ghost: "text-[#1a73e8] bg-transparent hover:bg-[#eef6ff] border-0",
    white:
      "bg-white text-[#1a73e8] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] hover:shadow-lg",
  };

  const primaryStyle =
    variant === "primary"
      ? {
          backgroundImage:
            "linear-gradient(161.95deg, #0044ad 0%, #1a73e8 100%)",
        }
      : {};

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={primaryStyle}
      {...props}
    >
      {children}
    </button>
  );
}
