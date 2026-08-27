import {
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Zap,
} from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Expert Technicians",
    description: "Factory certified specialists.",
  },
  {
    icon: Clock3,
    title: "Reliable Service",
    description: "Punctual and professional care.",
  },
  {
    icon: BadgeDollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees, ever.",
  },
  {
    icon: Zap,
    title: "Fast Response",
    description: "Same-day service availability.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="about"
      className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 py-16"
    >
      <div className="bg-[#f2f6ff] rounded-[32px] lg:rounded-[48px] p-6 sm:p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-12">
        {/* Left: Trust Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 shrink-0 w-full lg:w-[580px]">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-[16px] p-6 sm:p-8 flex flex-col gap-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                {/* Icon */}
                <div className="mb-1">
                  <Icon
                    size={22}
                    strokeWidth={1.8}
                    className="text-[#1a73e8]"
                  />
                </div>

                <h4
                  className="text-[16px] font-bold text-[#1a73e8] leading-6"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  {item.title}
                </h4>

                <p
                  className="text-[14px] text-[#404848] leading-5"
                  style={{
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right: Statement */}
        <div className="flex flex-col gap-6 max-w-[580px]">
          <h2
            className="text-[clamp(32px,4vw,48px)] font-extrabold text-[#1a73e8] leading-[1.08]"
            style={{
              fontFamily: "Manrope, sans-serif",
            }}
          >
            We define the standard of home air infrastructure.
          </h2>

          <p
            className="text-[16px] sm:text-[18px] text-[#404848] leading-[28px]"
            style={{
              fontFamily: "Inter, sans-serif",
            }}
          >
            PristineAir goes beyond surface cleaning. We focus on the
            architectural integrity of your home&apos;s air quality through
            high-suction, low-noise systems designed to last a lifetime.
          </p>

          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <CheckCircle2
                size={21}
                strokeWidth={2}
                className="shrink-0 text-[#1a73e8]"
              />

              <span
                className="text-[16px] font-semibold text-[#1a73e8]"
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                30+ Years of Engineering Excellence
              </span>
            </li>

            <li className="flex items-center gap-3">
              <CheckCircle2
                size={21}
                strokeWidth={2}
                className="shrink-0 text-[#1a73e8]"
              />

              <span
                className="text-[16px] font-semibold text-[#1a73e8]"
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Licensed and Insured Professionals
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
