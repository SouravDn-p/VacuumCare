import { ShieldCheck } from "lucide-react";

const AboutStory = () => {
  return (
    <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-14 xl:gap-20 items-center">
        {/* Image */}
        <div className="relative">
          <div className="rounded-[24px] overflow-hidden aspect-[1.12/0.9]">
            <img
              src="https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=650&fit=crop&auto=format"
              alt="Modern home technology"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Verified badge */}
          <div className="absolute -bottom-5 right-0 sm:right-5 bg-white shadow-[0px_8px_30px_rgba(0,0,0,0.08)] rounded-[12px] px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-[9px] bg-[#eef6ff] flex items-center justify-center">
              <ShieldCheck size={19} className="text-[#1a73e8]" />
            </div>

            <span
              className="text-[14px] font-semibold text-[#404848]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Verified Secure
            </span>
          </div>
        </div>

        {/* Content */}
        <div>
          <h2
            className="text-[32px] sm:text-[38px] lg:text-[44px] font-extrabold text-[#1a73e8] leading-[1.2] tracking-[-1px]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            A new standard for home
            <br className="hidden sm:block" />
            services.
          </h2>

          <div
            className="mt-5 space-y-3 text-[15px] sm:text-[16px] leading-[26px] text-[#667078]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <p>
              Elite was born out of frustration with the standard repair
              experience. We saw a world of slow callbacks, opaque pricing, and
              inconsistent quality in the built-in vacuum industry.
            </p>

            <p>
              We decided to fix it using technology. By building an intelligent
              booking platform and certifying the nation&apos;s top technicians,
              we&apos;ve created the first premium-tier service network designed
              specifically for the modern homeowner.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-14 sm:gap-20 mt-8">
            <div>
              <p
                className="text-[30px] sm:text-[34px] font-extrabold text-[#1a73e8]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                15 yr
              </p>

              <p
                className="mt-1 text-[11px] sm:text-[12px] text-[#7b848c] uppercase tracking-[0.4px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Industry Experience
              </p>
            </div>

            <div>
              <p
                className="text-[30px] sm:text-[34px] font-extrabold text-[#1a73e8]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                100%
              </p>

              <p
                className="mt-1 text-[11px] sm:text-[12px] text-[#7b848c] uppercase tracking-[0.4px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Service Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
