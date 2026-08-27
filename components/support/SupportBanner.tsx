import Image from "next/image";

export default function SupportBanner() {
  return (
    <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pb-20 lg:pb-28">
      <div className="relative min-h-[340px] sm:min-h-[390px] lg:min-h-[420px] overflow-hidden rounded-[24px]">
        {/* Image */}
        <Image
          src="https://images.unsplash.com/photo-1758523670739-0d26a3ee976d?w=1320&h=516&fit=crop&auto=format"
          alt="Enhancement professional service vehicle"
          fill
          sizes="(max-width: 1320px) 100vw, 1320px"
          className="object-cover"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.48) 40%, rgba(0,0,0,0.05) 78%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 min-h-[340px] sm:min-h-[390px] lg:min-h-[420px] flex items-center px-7 sm:px-12 lg:px-20">
          <div className="max-w-[420px]">
            <h2
              className="text-[38px] sm:text-[44px] lg:text-[48px] font-extrabold text-white leading-[1.02] tracking-[-1px]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Architectural
              <br />
              Grade Care
            </h2>

            <p
              className="mt-6 text-[15px] sm:text-[16px] leading-[26px] text-white/85 max-w-[390px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Our specialized engineers are always on standby to ensure your
              home&apos;s air remains pristine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
