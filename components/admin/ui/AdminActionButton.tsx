"use client";

import type { ButtonHTMLAttributes } from "react";
import toast from "react-hot-toast";

type AdminButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface AdminActionButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  variant?: AdminButtonVariant;
  disabled?: boolean;
  disabledReason?: string;
}

export default function AdminActionButton({
  children,
  variant = "secondary",
  className = "",
  disabled = false,
  disabledReason,
  onClick,
  type = "button",
  ...props
}: AdminActionButtonProps) {
  const isBlocked = disabled || Boolean(disabledReason);

  return (
    <button
      {...props}
      type={type}
      aria-disabled={isBlocked}
      className={`admin-btn admin-btn--${variant} cursor-pointer${
        isBlocked ? " is-disabled" : ""
      }${className ? ` ${className}` : ""}`}
      onClick={(event) => {
        if (isBlocked) {
          event.preventDefault();
          toast.error(
            disabledReason || "This action is not available right now.",
          );
          return;
        }
        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
}
