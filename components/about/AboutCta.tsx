import Button from "../ui/Button";

const AboutCta = () => {
  return (
    <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-8 pb-24 lg:pt-12 lg:pb-32">
      <div className="text-center max-w-[720px] mx-auto">
        <h2
          className="text-[34px] sm:text-[40px] lg:text-[44px] font-extrabold text-[#1a73e8] leading-[1.15]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Work with the best.
        </h2>

        <p
          className="mt-4 text-[15px] sm:text-[16px] text-[#657078] leading-[26px] max-w-[590px] mx-auto"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Experience the most sophisticated vacuum service in the industry. Your
          home deserves the Enhancement standard.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/services" variant="primary" size="sm" className="min-w-[150px] rounded-full">
            Schedule Service
          </Button>

          <Button href="/contact" variant="outline" size="sm" className="min-w-[150px]">
            Contact Our Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
