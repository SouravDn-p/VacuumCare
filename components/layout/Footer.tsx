const footerLinks = {
  Explore: ["Products", "Services"],
  Company: ["About Us", "Privacy Policy", "Terms of Service"],
};

export default function Footer() {
  return (
    <footer className="bg-[#1a73e8] text-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="2" />
                  <path
                    d="M5 8h6M8 5v6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span
                className="text-[22px] font-extrabold tracking-tight text-white"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                ELITE
              </span>
            </div>
            <p
              className="text-[14px] text-[#cadbdb] leading-[1.625]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Engineered for Architectural Wellness. We provide the hidden
              infrastructure for a healthy, dust-free home.
            </p>
          </div>

          {/* Explore & Company */}
          {Object.entries(footerLinks).map(([heading, items]) => (
            <div key={heading} className="flex flex-col gap-6">
              <p
                className="text-[16px] font-semibold text-white"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {heading}
              </p>
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[14px] text-[#cadbdb] hover:text-white transition-colors leading-[1.625]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p
              className="text-[14px] font-semibold text-[#f9fafb] tracking-wide uppercase"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Contact Us
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-start">
                <svg
                  className="shrink-0 mt-0.5"
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                >
                  <path
                    d="M8 10.25C8 11.49 7.01 12.5 5.75 12.5C4.49 12.5 3.5 11.49 3.5 10.25C3.5 9.01 4.49 8 5.75 8C7.01 8 8 9.01 8 10.25Z"
                    stroke="#CADBDB"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.75 19.625C5.75 19.625 1 16.2 1 10.25C1 7.714 3.014 4 5.75 4C8.486 4 12.5 7.714 12.5 10.25"
                    stroke="#CADBDB"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p
                  className="text-[14px] text-[#cadbdb] leading-[1.45]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  123 Elite Plaza, Wellness Drive
                  <br />
                  Greenwich, CT 06830
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <svg
                  className="shrink-0"
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                >
                  <path
                    d="M10.5 1.5H5.5C4.4 1.5 3.5 2.4 3.5 3.5V16.5C3.5 17.6 4.4 18.5 5.5 18.5H10.5C11.6 18.5 12.5 17.6 12.5 16.5V3.5C12.5 2.4 11.6 1.5 10.5 1.5Z"
                    stroke="#CADBDB"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p
                  className="text-[14px] text-[#cadbdb] leading-[1.75] break-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  +1 (880) 555-465215
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <svg
                  className="shrink-0"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M16.3 5.06V12.94C16.3 13.38 16.13 13.81 15.82 14.13C15.5 14.45 15.07 14.63 14.63 14.63H3.38C2.93 14.63 2.5 14.45 2.18 14.13C1.87 13.81 1.69 13.38 1.69 12.94V5.06M1.69 5.06V5.25C1.69 5.53 1.76 5.82 1.9 6.07C2.04 6.32 2.24 6.53 2.49 6.68L8.12 10.14C8.38 10.31 8.69 10.39 9 10.39C9.31 10.39 9.62 10.31 9.89 10.14L15.51 6.68C15.76 6.53 15.96 6.32 16.1 6.07C16.24 5.82 16.31 5.53 16.31 5.24V5.06C16.31 4.61 16.13 4.19 15.82 3.87C15.5 3.55 15.07 3.38 14.63 3.38H3.38C2.93 3.38 2.5 3.55 2.18 3.87C1.87 4.19 1.69 4.61 1.69 5.06Z"
                    stroke="#CADBDB"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p
                  className="text-[14px] text-[#cadbdb] leading-[1.75] break-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  service@elitecentralvac.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex gap-3.5 mb-8">
          {/* Facebook */}
          <a
            href="#"
            className="hover:opacity-75 transition-opacity"
            aria-label="Facebook"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M2.5 12C2.5 7.52 2.5 5.28 3.89 3.89C5.28 2.5 7.52 2.5 12 2.5C16.48 2.5 18.72 2.5 20.11 3.89C21.5 5.28 21.5 7.52 21.5 12C21.5 16.48 21.5 18.72 20.11 20.11C18.72 21.5 16.48 21.5 12 21.5C7.52 21.5 5.28 21.5 3.89 20.11C2.5 18.72 2.5 16.48 2.5 12Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M16.9 8.03H13.98C12.94 8.03 12.09 8.87 12.08 9.91L11.99 21.43"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.08 14H14.88"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="#"
            className="hover:opacity-75 transition-opacity"
            aria-label="Instagram"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12C3 7.76 3 5.64 4.32 4.32C5.64 3 7.76 3 12 3C16.24 3 18.36 3 19.68 4.32C21 5.64 21 7.76 21 12C21 16.24 21 18.36 19.68 19.68C18.36 21 16.24 21 12 21C7.76 21 5.64 21 4.32 19.68C3 18.36 3 16.24 3 12Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.25 6.75H17.38"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="#"
            className="hover:opacity-75 transition-opacity"
            aria-label="LinkedIn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 10V17"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 13V17M11 13C11 11.34 12.34 10 14 10C15.66 10 17 11.34 17 13V17M11 13V10"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.125 6.75H7"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-white/10 pt-8">
          <p
            className="text-[13px] sm:text-[14px] text-[#f9fafb] text-center leading-[1.75]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            © 2025 | ELITE CENTRAL VACCUM SERVICES LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
