import Button from "../ui/Button";

export default function CTABanner() {
  return (
    <section
      id="contact"
      className="max-w-[1920px] mx-auto px-6 lg:px-[300px] py-16"
    >
      <div className="relative rounded-[32px] overflow-hidden min-h-[516px] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1758523670739-0d26a3ee976d?w=1320&h=516&fit=crop&auto=format"
            alt="Professional vacuum service"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,13,32,0.9) 0%, rgba(0,0,0,0.55) 55.57%, rgba(0,0,0,0) 111.15%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-[120px] py-16 flex flex-col gap-8 max-w-[720px]">
          <h2
            className="text-[clamp(32px,4vw,48px)] font-extrabold text-white leading-[1.0]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Need help with your vacuum system?
          </h2>
          <p
            className="text-[18px] text-white leading-[28px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our concierge team is standing by to help you choose the right
            system or book a same-day repair appointment.
          </p>
          <div>
            <Button variant="white" size="lg">
              Request Service Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
