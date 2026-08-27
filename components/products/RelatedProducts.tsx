import Link from "next/link";

import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";

export default function RelatedProducts({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section>
      <div className="flex items-end justify-between gap-5 mb-10">
        <h2
          className="text-[30px] sm:text-[34px] font-extrabold text-[#1a73e8]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          You may also like
        </h2>

        <Link
          href="/products"
          className="text-[13px] font-semibold text-[#1a73e8] hover:underline"
        >
          View Entire Store →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
