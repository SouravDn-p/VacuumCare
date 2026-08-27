"use client";

import { LoaderCircle } from "lucide-react";

interface AdminSubmitOverlayProps {
  open: boolean;
  message: string;
}

export default function AdminSubmitOverlay({
  open,
  message,
}: AdminSubmitOverlayProps) {
  if (!open) return null;

  return (
    <div className="admin-submit-overlay" role="status" aria-live="polite">
      <div className="admin-submit-overlay__card">
        <LoaderCircle size={28} className="admin-submit-overlay__spinner" />
        <p className="admin-submit-overlay__text">{message}</p>
      </div>
    </div>
  );
}
