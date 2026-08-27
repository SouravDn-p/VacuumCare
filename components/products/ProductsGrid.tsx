import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";
import type { CatalogProductSort } from "@/types/customer/catalog";

interface ProductsGridProps {
  category: string;
  products: Product[];
  sort: CatalogProductSort;
  onSortChange: (sort: CatalogProductSort) => void;
}

const SORT_OPTIONS: { label: string; value: CatalogProductSort }[] = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
];

export default function ProductsGrid({
  category,
  products,
  sort,
  onSortChange,
}: ProductsGridProps) {
  return (
    <section>
      <div className="flex items-center justify-between gap-5 border-b border-dashed border-[#dce4ec] pb-5 mb-5">
        <h2
          className="text-[14px] font-bold text-[#1a73e8]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {category}
        </h2>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-semibold tracking-[1px] text-[#4f5960]">
            SORT BY:
          </span>

          <select
            className="bg-transparent text-[13px] font-semibold text-[#1a73e8] outline-none"
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value as CatalogProductSort)
            }
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
