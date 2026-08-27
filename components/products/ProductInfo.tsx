"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Box,
  Cog,
  ShoppingCart,
  Sparkles,
  Volume2,
  Zap,
} from "lucide-react";

import { formatPrice, type Product } from "@/data/products";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { CART_IMAGE_FALLBACK } from "@/types/customer/cart";
import { writeBuyNow } from "@/lib/buyNow";

const icons = [BadgeCheck, Box, Zap, Volume2, Sparkles, Cog];

export default function ProductInfo({ product }: { product: Product }) {
  const router = useRouter();

  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);

  const cartProduct = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    subtitle: product.subtitle,
    image: product.image || CART_IMAGE_FALLBACK,
    price: product.price,
  };

  const handleAddToCart = () => {
    void addItem(cartProduct, quantity);
  };

  const handleBuyNow = () => {
    writeBuyNow({
      productId: product.id,
      quantity,
      slug: product.slug,
      name: product.name,
      subtitle: product.subtitle,
      image: product.image || CART_IMAGE_FALLBACK,
      price: product.price,
    });
    router.push("/checkout?buyNow=1");
  };

  return (
    <div>
      <h1
        className="text-[36px] sm:text-[42px] lg:text-[48px] font-extrabold leading-[1.1] tracking-[-1.1px] text-[#263440]"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {product.name}
      </h1>

      <p
        className="mt-4 text-[26px] sm:text-[28px] font-bold text-[#0875f5]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {formatPrice(product.price)}
      </p>

      <p
        className="mt-8 text-[15px] sm:text-[16px] leading-[27px] text-[#505960]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {product.description}
      </p>

      {/* Quantity */}
      <div className="mt-7 inline-flex h-11 items-center rounded-[9px] border border-[#dde4eb] bg-white">
        <button
          type="button"
          onClick={() => setQuantity((previous) => Math.max(1, previous - 1))}
          className="h-full w-12 text-[#1a73e8]"
        >
          -
        </button>

        <span className="w-10 text-center text-[14px] text-[#1a73e8]">
          {quantity}
        </span>

        <button
          type="button"
          onClick={() => setQuantity((previous) => previous + 1)}
          className="h-full w-12 text-[#1a73e8]"
        >
          +
        </button>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <button
          type="button"
          onClick={handleBuyNow}
          className="h-[52px] rounded-[9px] bg-gradient-to-r from-[#0754c6] to-[#1a73e8] text-white font-semibold flex items-center justify-center gap-2"
        >
          <ShoppingCart size={17} />
          Buy Now
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          className="h-[52px] rounded-[9px] bg-[#dcecff] text-[#1a73e8] font-semibold flex items-center justify-center gap-2"
        >
          <ShoppingCart size={17} />
          Add to Cart
        </button>
      </div>

      {/* Features */}
      <div className="mt-8 pt-5 border-t border-[#dfe6ec] space-y-4">
        {product.features.map((feature, index) => {
          const Icon = icons[index % icons.length];

          return (
            <div key={feature} className="flex items-start gap-3">
              <Icon
                size={18}
                strokeWidth={1.7}
                className="shrink-0 mt-[2px] text-[#1a73e8]"
              />

              <p className="text-[13px] sm:text-[14px] leading-[21px] text-[#404848]">
                {feature}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
