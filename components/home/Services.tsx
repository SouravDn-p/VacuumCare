import Link from "next/link";

function ArrowIcon() {
  return (
    <svg width="13" height="9" viewBox="0 0 13.2071 8.70711" fill="none">
      <path
        d="M0.707107 4.35355L0.353553 4L0 4.35355L0.353553 4.70711L0.707107 4.35355ZM12.7071 4.85355C12.9832 4.85355 13.2071 4.6297 13.2071 4.35355C13.2071 4.07741 12.9832 3.85355 12.7071 3.85355V4.35355V4.85355ZM4.70711 0.353553L4.35355 0L0.353553 4L0.707107 4.35355L1.06066 4.70711L5.06066 0.707107L4.70711 0.353553ZM0.707107 4.35355L0.353553 4.70711L4.35355 8.70711L4.70711 8.35355L5.06066 8L1.06066 4L0.707107 4.35355ZM0.707107 4.35355V4.85355H12.7071V4.35355V3.85355H0.707107V4.35355Z"
        fill="#1A73E8"
      />
    </svg>
  );
}

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M24.58 25.25L15.73 6.5C14.21 3.29 10.99 1.25 7.45 1.25C4.03 1.25 1.25 4.03 1.25 7.45V7.7C1.25 10.22 2.86 12.45 5.25 13.25"
          stroke="#1A73E8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M3.92 6.58C2.44 6.58 1.25 5.39 1.25 3.92C1.25 2.44 2.44 1.25 3.92 1.25C5.39 1.25 6.58 2.44 6.58 3.92C6.58 5.39 5.39 6.58 3.92 6.58Z"
          stroke="#1A73E8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M7.92 15.92H10.55C11.4 15.92 12.05 15.16 11.89 14.34L10.68 7.81C9.97 4.01 6.57 1.25 2.62 1.25C1.86 1.25 1.25 1.85 1.25 2.58V7.25"
          stroke="#1A73E8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M8.58 1.25H1.25"
          stroke="#1A73E8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    ),
    title: "Vacuum Repair",
    description:
      "Fast diagnostics and repair for all major central vacuum brands. We solve suction loss and motor failures with precision.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M10.85 5.25L11.83 2.71C11.99 2.28 12.29 1.91 12.66 1.65C13.04 1.39 13.49 1.25 13.95 1.25H15.83C16.29 1.25 16.74 1.39 17.12 1.65C17.5 1.91 17.79 2.28 17.95 2.71L18.94 5.25L22.27 7.17L24.97 6.76C25.42 6.7 25.88 6.77 26.28 6.97C26.69 7.17 27.03 7.49 27.26 7.88L28.17 9.48C28.41 9.88 28.51 10.34 28.48 10.8C28.45 11.26 28.28 11.7 27.99 12.06L26.32 14.19V18.03L28.03 20.15C28.32 20.51 28.49 20.95 28.53 21.42C28.56 21.88 28.45 22.34 28.22 22.74L27.3 24.34C27.08 24.73 26.74 25.04 26.33 25.24C25.92 25.44 25.47 25.52 25.02 25.46L22.32 25.04L18.98 26.96L18 29.5C17.83 29.93 17.54 30.3 17.16 30.56C16.78 30.82 16.33 30.96 15.87 30.96H13.95C13.49 30.96 13.04 30.82 12.66 30.56C12.29 30.3 11.99 29.93 11.83 29.5L10.85 26.96L7.51 25.04L4.81 25.46C4.36 25.52 3.9 25.44 3.5 25.24C3.09 25.04 2.75 24.73 2.53 24.34L1.61 22.74C1.38 22.34 1.27 21.88 1.3 21.42C1.33 20.95 1.51 20.51 1.79 20.15L3.46 18.03V14.19L1.75 12.06C1.46 11.7 1.29 11.26 1.26 10.8C1.22 10.34 1.33 9.88 1.57 9.48L2.48 7.88C2.71 7.49 3.05 7.17 3.45 6.97C3.86 6.77 4.32 6.7 4.77 6.76L7.46 7.17L10.85 5.25ZM10.32 16.11C10.32 17.01 10.59 17.9 11.09 18.65C11.59 19.4 12.31 19.98 13.14 20.33C13.98 20.68 14.9 20.77 15.78 20.59C16.67 20.41 17.48 19.98 18.12 19.34C18.76 18.7 19.2 17.89 19.37 17C19.55 16.11 19.46 15.19 19.11 14.36C18.77 13.52 18.18 12.81 17.43 12.31C16.68 11.8 15.8 11.54 14.89 11.54C13.68 11.54 12.52 12.02 11.66 12.87C10.8 13.73 10.32 14.89 10.32 16.11Z"
          stroke="#1A73E8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    ),
    title: "Maintenance",
    description:
      "Comprehensive annual check-ups including piping inspections, filter cleaning, and motor optimization for longevity.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M28.68 8.11H3.54C2.27 8.11 1.25 9.13 1.25 10.39V26.39C1.25 27.66 2.27 28.68 3.54 28.68H28.68C29.94 28.68 30.96 27.66 30.96 26.39V10.39C30.96 9.13 29.94 8.11 28.68 8.11Z"
          stroke="#1A73E8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M1.25 17.25H30.96"
          stroke="#1A73E8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M16.11 14.96V19.54"
          stroke="#1A73E8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M6.25 4.5C6.25 3.12 7.37 2 8.75 2H23.25C24.63 2 25.75 3.12 25.75 4.5V8.11H6.25V4.5Z"
          stroke="#1A73E8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    ),
    title: "Installation",
    description:
      "Seamless architectural integration for new builds or retrofitting modern systems into existing luxury estates.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="max-w-[1920px] mx-auto px-6 lg:px-[300px] py-16"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 items-center text-center mb-[64px]">
        <h2
          className="text-[36px] font-extrabold text-[#1a73e8] leading-[40px]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Engineered Support
        </h2>
        <p
          className="text-[16px] text-[#4d4d4d] max-w-[672px] leading-6"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Our specialized technicians ensure your architectural wellness system
          operates at peak efficiency.
        </p>
      </div>

      {/* Service cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white border border-[#ebebeb] rounded-[12px] p-6 flex flex-col gap-6 hover:shadow-md transition-shadow"
          >
            <div className="bg-[#d9e9ff] w-16 h-16 rounded-[16px] flex items-center justify-center">
              {service.icon}
            </div>
            <h3
              className="text-[24px] font-bold text-[#1a73e8] leading-8"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {service.title}
            </h3>
            <p
              className="text-[16px] text-[#4d4d4d] leading-[26px] flex-1"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {service.description}
            </p>
            <Link
              href="/services#service-request"
              className="flex items-center gap-2 text-[16px] font-semibold text-[#1a73e8] hover:gap-4 transition-all w-fit"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Book Schedule
              <ArrowIcon />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
