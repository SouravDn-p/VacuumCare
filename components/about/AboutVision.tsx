import { Eye, Target } from "lucide-react";

const AboutVision = () => {
  return (
    <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Vision */}
        <div
          className="relative overflow-hidden rounded-[12px] p-7 sm:p-8 lg:p-10 min-h-[210px]"
          style={{
            background: "linear-gradient(120deg, #1765d4 0%, #287ced 100%)",
          }}
        >
          <div className="absolute -right-12 -top-12 w-[150px] h-[150px] rounded-full border-[18px] border-white/[0.04]" />

          <div className="relative z-10">
            <div className="w-11 h-11 rounded-[10px] bg-white/10 flex items-center justify-center mb-6">
              <Eye size={21} className="text-white" />
            </div>

            <h2
              className="text-[22px] sm:text-[24px] font-bold text-white leading-8"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Our Vision
            </h2>

            <p
              className="mt-3 text-[15px] sm:text-[16px] leading-[25px] text-white/90 max-w-[540px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              To make luxury home maintenance as simple as a single tap,
              ensuring healthy living environments for every premium property.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div
          className="relative overflow-hidden rounded-[12px] p-7 sm:p-8 lg:p-10 min-h-[210px]"
          style={{
            background: "linear-gradient(120deg, #1765d4 0%, #287ced 100%)",
          }}
        >
          <div className="absolute -right-12 -top-12 w-[150px] h-[150px] rounded-full border-[18px] border-white/[0.04]" />

          <div className="relative z-10">
            <div className="w-11 h-11 rounded-[10px] bg-white/10 flex items-center justify-center mb-6">
              <Target size={21} className="text-white" />
            </div>

            <h2
              className="text-[22px] sm:text-[24px] font-bold text-white leading-8"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Our Mission
            </h2>

            <p
              className="mt-3 text-[15px] sm:text-[16px] leading-[25px] text-white/90 max-w-[540px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Bridging high-end hardware and expert service through transparent
              pricing, certified talent, and smart tech.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;
