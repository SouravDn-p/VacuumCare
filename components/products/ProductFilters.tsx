"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useGetCatalogCategoriesQuery } from "@/redux/features/api/customer/catalog/catalogApi";

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  maxPrice: number;
  onMaxPriceChange: (value: number) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;
}

export default function ProductFilters({
  search,
  onSearchChange,
  selectedCategories,
  onToggleCategory,
  maxPrice,
  onMaxPriceChange,
  inStockOnly,
  onInStockOnlyChange,
}: ProductFiltersProps) {
  const { data: categories } = useGetCatalogCategoriesQuery();
  const categoryOptions =
    categories && categories.length > 0
      ? categories
      : [
          { name: "Vacuum", count: 0 },
          { name: "Accessories", count: 0 },
        ];

  return (
    <aside className="lg:sticky lg:top-28">
      <div className="flex items-center gap-2 border-b border-dashed border-[#dce4ec] pb-5">
        <SlidersHorizontal size={17} className="text-[#1a73e8]" />

        <span className="text-[13px] font-semibold text-[#1a73e8]">
          FILTER BY
        </span>
      </div>

      {/* Search */}
      <div className="py-5 border-b border-dashed border-[#dce4ec]">
        <p className="text-[13px] text-[#1a73e8] mb-3">Quick search</p>

        <div className="relative">
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Model or part number..."
            className="h-11 w-full rounded-[8px] bg-[#dcecff] px-4 pr-10 text-[13px] outline-none placeholder:text-[#53606a]"
          />

          <Search
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#54616b]"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="py-5 border-b border-dashed border-[#dce4ec]">
        <p className="text-[13px] font-semibold text-[#1a73e8] uppercase mb-4">
          Categories
        </p>

        {categoryOptions.map((category) => (
          <label
            key={category.name}
            className="flex items-center gap-2 mb-3 cursor-pointer last:mb-0"
          >
            <input
              type="checkbox"
              className="accent-[#1a73e8]"
              checked={selectedCategories.includes(category.name)}
              onChange={() => onToggleCategory(category.name)}
            />
            <span className="text-[13px] text-[#1a73e8]">{category.name}</span>
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="py-5 border-b border-dashed border-[#dce4ec]">
        <p className="text-[13px] font-semibold text-[#1a73e8] uppercase mb-4">
          Price Ranges
        </p>

        <input
          type="range"
          min="0"
          max="1500"
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(Number(event.target.value))}
          className="w-full accent-[#1a73e8]"
        />

        <div className="mt-2 flex justify-between text-[11px] text-[#4f5960]">
          <span>$0</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      {/* Availability */}
      <div className="py-5">
        <p className="text-[13px] font-semibold text-[#1a73e8] uppercase mb-4">
          Availability
        </p>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="accent-[#1a73e8]"
            checked={inStockOnly}
            onChange={(event) => onInStockOnlyChange(event.target.checked)}
          />

          <span className="text-[13px] text-[#1a73e8]">In Stock Only</span>
        </label>
      </div>
    </aside>
  );
}
