import Image from "next/image";
import Link from "next/link";

export default function ShopHero() {
  return (
    <section className="bg-gradient-to-b from-[#f2f8ff] to-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-28 lg:pt-32 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div
              className="flex items-center gap-1 text-[13px] text-[#1a73e8] mb-5"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Link href="/" className="hover:underline">
                Home
              </Link>

              <span>›</span>

              <span>Store</span>
            </div>

            <h1
              className="text-[38px] sm:text-[46px] lg:text-[50px] leading-[1.12] font-extrabold tracking-[-1.3px] text-[#1a73e8]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Shop Central Vacuum
              <br />
              Products
            </h1>

            <p
              className="mt-5 max-w-[620px] text-[16px] leading-[27px] text-[#4c555c]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              The invisible infrastructure for a healthier home. Discover our
              range of high-performance power units and precision cleaning kits.
            </p>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="relative w-[360px] h-[260px]">
              <Image
                src="/images/products/wall-inlets.png"
                alt="Enhancement product"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
