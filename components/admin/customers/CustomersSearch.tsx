"use client";

import { Search } from "lucide-react";

interface CustomersSearchProps {
  query: string;
  onQueryChange: (val: string) => void;
}

export default function CustomersSearch({
  query,
  onQueryChange,
}: CustomersSearchProps) {
  return (
    <div className="cust-search-box">
      <Search size={18} strokeWidth={1.8} className="cust-search-box__icon" />
      <input
        id="cust-search-input"
        type="text"
        className="cust-search-box__input"
        placeholder="Search by customer name, email, phone, or address"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="Search customers"
      />
    </div>
  );
}
