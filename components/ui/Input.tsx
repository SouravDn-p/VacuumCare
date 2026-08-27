import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: "search" | "email" | "phone";
}

export default function Input({ icon, className = "", ...props }: InputProps) {
  return (
    <div className="relative flex items-center">
      {icon === "search" && (
        <svg
          className="absolute left-3 text-[#1a73e8] pointer-events-none"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <circle
            cx="6.83"
            cy="6.83"
            r="5.83"
            stroke="#1A73E8"
            strokeWidth="2"
          />
          <path
            d="M11.5 11.5L14 14"
            stroke="#1A73E8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
      <input
        className={`
          w-full font-[Inter] text-[14px] text-[#404848]
          bg-white border border-[#eef6ff] rounded-[100px]
          py-2 pr-4 placeholder:text-[#9ca3af]
          focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent
          transition-all duration-200
          ${icon === "search" ? "pl-9" : "pl-4"}
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
