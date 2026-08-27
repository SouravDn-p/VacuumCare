import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[560px] sm:min-h-[640px] lg:min-h-[800px] flex items-center">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #d8e9ff, #ffffff)",
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 w-full pt-24 sm:pt-28 lg:pt-[100px] pb-14 sm:pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-6">
          {/* Text content */}
          <div className="flex flex-col gap-8 sm:gap-11 flex-1 max-w-[760px] text-center lg:text-left items-center lg:items-start">
            <div className="flex flex-col gap-5">
              <h1
                className="text-[clamp(34px,7vw,68px)] font-bold leading-[1.15] sm:leading-[1.2] tracking-[-1.2px] sm:tracking-[-1.8px] bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(107.84deg, #0044ad 1.71%, #1a73e8 87.91%)",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                Powerful Central Vacuum Solutions for Modern Homes
              </h1>
              <p
                className="text-[17px] sm:text-[20px] text-[#404848] leading-[1.6] max-w-[718px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Shop high-performance systems or request expert repair services
                with ease. Experience the invisible infrastructure of a truly
                clean environment.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 sm:pt-4">
              <Button variant="primary" size="md">
                Shop Products
              </Button>
              <Button variant="outline" size="md">
                Request Service
              </Button>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative shrink-0 w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[534px] aspect-square lg:w-[534px]">
            <img
              src="https://images.unsplash.com/photo-1765970101531-8d116223af49?w=534&h=534&fit=crop&auto=format"
              alt="Central vacuum system"
              className="w-full h-full object-cover mix-blend-multiply rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
