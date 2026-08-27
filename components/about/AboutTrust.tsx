import { Award, BadgeCheck, ShieldCheck, UserRound } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    label: "VDMA Certified",
  },
  {
    icon: BadgeCheck,
    label: "Home Guard Gold",
  },
  {
    icon: UserRound,
    label: "10k+ Members",
  },
  {
    icon: Award,
    label: "Enhancement Guarantee",
  },
];

const AboutTrust = () => {
  return (
    <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 py-12 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {trustItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="min-h-[94px] rounded-[12px] border border-[#edf1f5] bg-white shadow-[0px_2px_12px_rgba(0,0,0,0.025)] px-5 flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-[9px] bg-[#e8f2ff] flex items-center justify-center shrink-0">
                <Icon size={21} strokeWidth={1.8} className="text-[#1a73e8]" />
              </div>

              <p
                className="text-[15px] sm:text-[16px] font-semibold text-[#404848]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutTrust;
