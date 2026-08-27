"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProductsPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductsPagination({
  page,
  totalPages,
  onPageChange,
}: ProductsPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter((value) => value === 1 || value === totalPages || Math.abs(value - page) <= 1);

  return (
    <div className="mt-20 flex items-center justify-between">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        className="inline-flex items-center gap-2 text-[13px] font-medium text-[#1a73e8] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeft size={15} />
        Previous
      </button>

      <div className="flex items-center gap-2 text-[13px]">
        {pages.map((value, index) => (
          <div key={value} className="flex items-center gap-2">
            {index > 0 && pages[index - 1] !== value - 1 && (
              <span className="text-[#a7b3be]">...</span>
            )}
            <button
              type="button"
              onClick={() => onPageChange(value)}
              className={`h-9 w-9 rounded-[7px] ${
                page === value
                  ? "bg-[#e4efff] text-[#1a73e8]"
                  : "text-[#a7b3be]"
              }`}
            >
              {value}
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        className="inline-flex items-center gap-2 text-[13px] font-medium text-[#1a73e8] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ArrowRight size={15} />
      </button>
    </div>
  );
}
