import React from "react";

const AboutHero = () => {
  return (
    <section id="about" className="relative overflow-hidden pt-[72px]">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #eef7ff 0%, #ffffff 92%)",
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="min-h-[620px] lg:min-h-[700px] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-16 lg:py-20">
            {/* Left */}
            <div className="max-w-[650px] text-center lg:text-left">
              <p
                className="text-[14px] font-semibold text-[#1a73e8] tracking-[1.4px] uppercase mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                THE ELITE STORY
              </p>

              <h1
                className="text-[clamp(38px,6vw,64px)] font-extrabold text-[#0959c7] leading-[1.08] tracking-[-1.5px]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                About Elite
                <br className="hidden sm:block" />
                Central Vacuum
              </h1>

              <p
                className="mt-6 text-[16px] sm:text-[18px] leading-[28px] text-[#5d656c] max-w-[620px] mx-auto lg:mx-0"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Dedicated to reliable, professional & frictionless home wellness
                infrastructure since 2009.
              </p>
            </div>

            {/* Right image collage */}
            <div className="relative w-full max-w-[570px] mx-auto h-[430px] sm:h-[500px]">
              {/* Top image */}
              <div className="absolute top-0 left-[10%] sm:left-[14%] w-[58%] sm:w-[56%] aspect-[1.28/1] rounded-[24px] overflow-hidden shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=560&fit=crop&auto=format"
                  alt="Elite Central Vacuum service home"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom left */}
              <div className="absolute left-0 bottom-[2%] sm:bottom-0 w-[52%] aspect-square rounded-[24px] overflow-hidden shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=550&h=550&fit=crop&auto=format"
                  alt="Elite service vehicle"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom right */}
              <div className="absolute right-0 bottom-[14%] sm:bottom-[12%] w-[52%] aspect-square rounded-[24px] overflow-hidden shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=550&h=550&fit=crop&auto=format"
                  alt="Elite home services"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
