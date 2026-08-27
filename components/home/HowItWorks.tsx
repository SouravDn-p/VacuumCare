const steps = [
  {
    number: "1",
    title: "Submit Request",
    description: "Fill out our simple form with your needs.",
  },
  {
    number: "2",
    title: "Get Quotation",
    description: "Receive a clear, itemized digital estimate.",
  },
  {
    number: "3",
    title: "Schedule Service",
    description: "Choose a time that fits your lifestyle.",
  },
  {
    number: "4",
    title: "Service Completed",
    description: "Enjoy your optimized wellness system.",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
      <h2
        className="text-[26px] sm:text-[30px] font-extrabold text-[#1a73e8] text-center leading-[36px] mb-10 sm:mb-16"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        The Path to Pristine
      </h2>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
        {/* Connector line (desktop only) */}
        <div
          className="hidden md:block absolute top-6 bg-[rgba(192,200,200,0.3)] h-[2px]"
          style={{ left: "10.76%", right: "10.76%" }}
        />

        {steps.map((step) => (
          <div
            key={step.number}
            className="flex-1 flex flex-col items-center gap-2 text-center relative z-10 min-w-0"
          >
            <div
              className="bg-[#1a73e8] w-12 h-12 rounded-full flex items-center justify-center text-white text-[18px] font-semibold shrink-0"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {step.number}
            </div>
            <h4
              className="text-[16px] font-bold text-[#1a73e8] leading-6 mt-4"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {step.title}
            </h4>
            <p
              className="text-[14px] text-[#6b6b6b] leading-5 max-w-[160px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
