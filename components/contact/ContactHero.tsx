import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative pt-[72px]">
      <div className="relative min-h-[380px] sm:min-h-[430px] lg:min-h-[510px] overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/contact/contact.png"
          alt="Elite Central Vacuum professional service"
          className="absolute inset-0 w-full h-full object-cover"
          width={1600}
          height={1600}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.52) 46%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 min-h-[380px] sm:min-h-[430px] lg:min-h-[470px] flex items-center">
          <div className="max-w-[560px]">
            <p
              className="text-[14px] sm:text-[15px] font-semibold text-white uppercase tracking-[0.6px] mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              CALL & CHATS
            </p>

            <h1
              className="text-[40px] sm:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-[-1.3px]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Contact Us
            </h1>

            <p
              className="mt-5 text-[16px] sm:text-[18px] leading-[28px] text-white/90 max-w-[520px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              We are here to help you anytime. Choose your preferred way to
              reach our specialists.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}