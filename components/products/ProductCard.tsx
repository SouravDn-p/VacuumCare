"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { addToCartOrLogin } from "@/lib/addToCartOrLogin";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
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
  };

  return (
    <article className="rounded-[24px] border border-[#e9edf2] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition hover:shadow-md">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-[16px] border border-[#f0f2f5] bg-white">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 320px"
              className="object-contain p-4 transition duration-300 hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[12px] text-[#8a959d]">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="pt-4">
        <Link href={`/products/${product.slug}`}>
          <h3
            className="text-[16px] sm:text-[17px] font-bold text-[#0875f5] hover:underline"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {product.name}
          </h3>
        </Link>

        <p
          className="mt-1 text-[12px] sm:text-[13px] text-[#5d666d]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {product.subtitle}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span
            className="text-[19px] font-semibold text-[#0875f5]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {formatPrice(product.price)}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dcecff] text-[#1a73e8] transition hover:bg-[#1a73e8] hover:text-white"
          >
            <ShoppingCart size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
