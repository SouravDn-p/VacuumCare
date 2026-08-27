"use client";

import Link from "next/link";
import Image from "next/image";

import { formatPrice } from "@/data/products";
import { toStoreProduct } from "@/lib/mapCatalogProduct";
import { useCart } from "@/context/CartContext";
import { addToCartOrLogin } from "@/lib/addToCartOrLogin";
import { useGetCatalogProductsQuery } from "@/redux/features/api/customer/catalog/catalogApi";

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18"
        stroke="#1A73E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 10a4 4 0 01-8 0"
        stroke="#1A73E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FeaturedProducts() {
  const { addItem } = useCart();
  const { data } = useGetCatalogProductsQuery({
    page: 1,
    pageSize: 4,
    sort: "popularity",
  });
  const products = (data?.items ?? []).map(toStoreProduct);

  return (
    <section
      id="products"
      className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 py-16"
    >
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-16 lg:mb-20">
        <div className="flex flex-col gap-2">
          <p
            className="text-[14px] font-semibold text-[#1a73e8] tracking-[1.4px] uppercase"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            THE COLLECTION
          </p>
          <h2
            className="text-[28px] sm:text-[32px] lg:text-[36px] font-extrabold text-[#1a73e8] leading-[1.15] lg:leading-[40px]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Featured Performance Units
          </h2>
        </div>
        <Link
          href="/products"
          className="text-[16px] font-semibold text-[#1a73e8] hover:opacity-75 transition-opacity shrink-0"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          View All Products
        </Link>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="col-span-full text-[14px] text-[#68737a]">
            Products will appear here once the catalog is published.
          </p>
        ) : (
          products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-[32px] border border-[#ebebeb] shadow-[0px_0px_3px_rgba(0,0,0,0.04)] p-5 flex flex-col hover:shadow-md transition-shadow"
          >
            {/* Product image */}
            <Link
              href={`/products/${product.slug}`}
              className="aspect-square w-full relative rounded-[12px] overflow-hidden mb-0 bg-[#f9fafb] block"
            >
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="272px"
                  className="object-contain p-4"
                />
              ) : null}
              <div className="absolute inset-0 border border-[#f4f4f4] rounded-[12px] pointer-events-none" />
            </Link>

            {/* Info */}
            <div className="pt-3">
              <Link href={`/products/${product.slug}`}>
                <h3
                  className="text-[18px] font-extrabold text-[#1a73e8] leading-[28px] hover:underline"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {product.name}
                </h3>
              </Link>
              <p
                className="text-[14px] text-[#404848] leading-[20px] mt-0.5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {product.subtitle}
              </p>
            </div>

            {/* Price + cart */}
            <div className="flex items-center justify-between pt-3 mt-auto">
              <span
                className="text-[20px] font-semibold text-[#1a73e8] leading-[28px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {formatPrice(product.price)}
              </span>
              <button
                type="button"
                aria-label={`Add ${product.name} to cart`}
                onClick={() => {
                  void addToCartOrLogin(() =>
                    addItem({
                      id: product.id,
                      slug: product.slug,
                      name: product.name,
                      subtitle: product.subtitle,
                      image: product.image,
                      price: product.price,
                    }),
                  );
                }}
                className="bg-[#d9e9ff] p-2 rounded-full hover:bg-[#1a73e8] group transition-colors"
              >
                <div className="group-hover:[&_path]:stroke-white">
                  <CartIcon />
                </div>
              </button>
            </div>
          </div>
        ))
        )}
      </div>
    </section>
  );
}
