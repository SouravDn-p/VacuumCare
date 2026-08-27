import { ArrowRight, CalendarDays, ShoppingBasket, Wrench } from "lucide-react";

export default function CTACards() {
  return (
    <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shop Products */}
        <div className="relative overflow-hidden rounded-[12px] bg-[#edf1f9] p-7 sm:p-8 min-h-[240px] flex flex-col justify-between">
          {/* Decorative circle */}
          <div className="pointer-events-none absolute -top-[65px] -right-[35px] w-[160px] h-[160px] rounded-full border-[18px] border-[#e7e7e7] opacity-70" />

          <div className="relative z-10">
            {/* Icon */}
            <div className="w-11 h-11 rounded-[10px] bg-[#1a73e8] flex items-center justify-center mb-5">
              <ShoppingBasket
                size={22}
                strokeWidth={2}
                className="text-white"
              />
            </div>

            {/* Content */}
            <div>
              <h3
                className="text-[22px] sm:text-[24px] font-bold text-[#1a73e8] leading-8 mb-2"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Shop Products
              </h3>

              <p
                className="text-[16px] text-[#5b5b5b] leading-[26px] max-w-[540px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Browse premium vacuum systems, architectural inlets, and
                high-performance accessories.
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#products"
            className="relative z-10 mt-5 inline-flex w-fit items-center gap-2 text-[16px] font-semibold text-[#1a73e8] hover:gap-3 transition-all duration-200"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Shop Now
            <ArrowRight size={18} strokeWidth={2} />
          </a>
        </div>

        {/* Book a Service */}
        <div
          className="relative overflow-hidden rounded-[12px] p-7 sm:p-8 min-h-[240px] flex flex-col justify-between"
          style={{
            background:
              "linear-gradient(115.35deg, #0044ad 0.71%, #1a73e8 99.24%)",
          }}
        >
          {/* Decorative outer circle */}
          <div className="pointer-events-none absolute -top-[70px] -right-[40px] w-[165px] h-[165px] rounded-full border-[18px] border-white/[0.06]" />

          {/* Decorative inner circle */}
          <div className="pointer-events-none absolute -top-[38px] -right-[8px] w-[100px] h-[100px] rounded-full bg-white/[0.03]" />

          <div className="relative z-10">
            {/* Icon */}
            <div className="w-11 h-11 rounded-[10px] bg-white/10 backdrop-blur-[4px] flex items-center justify-center mb-5">
              <Wrench size={22} strokeWidth={2} className="text-white" />
            </div>

            {/* Content */}
            <div>
              <h3
                className="text-[22px] sm:text-[24px] font-bold text-white leading-8 mb-2"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Book a Service
              </h3>

              <p
                className="text-[16px] text-white/80 leading-[26px] max-w-[540px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Schedule professional repair, maintenance, or expert
                installation for your central system.
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#services"
            className="relative z-10 mt-5 inline-flex w-fit items-center gap-2 text-[16px] font-semibold text-white hover:opacity-80 transition-opacity"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Request Service
            <CalendarDays size={17} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
