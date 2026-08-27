"use client";

import { ChevronDown, Mail, Phone } from "lucide-react";

import { useChat } from "@/context/ChatContext";

const faqs = [
  {
    question: "How do I track my installation?",
    answer:
      "Once your installation has been scheduled, our team will provide status updates using your service reference number.",
  },
  {
    question: "Where can I find my quotation?",
    answer:
      "Your quotation is normally sent to the email address used when requesting service. You can also contact our support team for another copy.",
  },
  {
    question: "How to reschedule a visit?",
    answer:
      "Contact our support team with your service ID and preferred new date. We will confirm the next available appointment.",
  },
  {
    question: "Warranty & refund policy",
    answer:
      "Warranty and refund eligibility depends on the product or service purchased. Contact support with your order number for assistance.",
  },
];

export default function SupportSidebar() {
  const { openChat } = useChat();

  return (
    <aside>
      {/* Contact card */}
      <div
        className="relative overflow-hidden rounded-[14px] p-7 sm:p-8 text-white"
        style={{
          background: "linear-gradient(125deg, #0d60d4 0%, #287bea 100%)",
        }}
      >
        {/* Decoration */}
        <div className="pointer-events-none absolute -top-16 -right-12 w-40 h-40 rounded-full border-[18px] border-white/[0.04]" />

        <div className="relative z-10">
          <h2
            className="text-[22px] sm:text-[24px] font-bold"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Contact Us Directly
          </h2>

          <div className="mt-7 space-y-5">
            {/* Email */}
            <a
              href="mailto:service@elitecentralvac.com"
              className="flex gap-3 group"
            >
              <Mail size={20} strokeWidth={1.7} className="mt-0.5 shrink-0" />

              <div>
                <p
                  className="text-[15px] font-semibold group-hover:underline"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  service@elitecentralvac.com
                </p>

                <p
                  className="mt-1 text-[12px] text-white/70"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Usually responds within 2–4 hours
                </p>
              </div>
            </a>

            {/* Phone */}
            <a href="tel:+1880555465215" className="flex gap-3 group">
              <Phone size={19} strokeWidth={1.7} className="mt-0.5 shrink-0" />

              <div>
                <p
                  className="text-[15px] font-semibold group-hover:underline"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  +1 (880) 555-465215
                </p>

                <p
                  className="mt-1 text-[12px] text-white/70"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Direct technical line
                </p>
              </div>
            </a>
          </div>

          {/* Live chat */}
          <button
            type="button"
            onClick={openChat}
            className="mt-7 w-full h-[48px] rounded-[9px] bg-white text-[#1a73e8] text-[14px] font-semibold transition hover:bg-[#f3f7ff]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Start Live Chat
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-10">
        <h2
          className="text-[22px] font-bold text-[#242a2e] mb-5"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Quick Answers
        </h2>

        <div>
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-[#edf0f4] last:border-b-0"
            >
              <summary className="list-none cursor-pointer py-5 flex items-center justify-between gap-5">
                <span
                  className="text-[14px] sm:text-[15px] font-semibold text-[#252a2f]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {faq.question}
                </span>

                <ChevronDown
                  size={16}
                  strokeWidth={1.8}
                  className="shrink-0 text-[#424a51] transition-transform duration-200 group-open:rotate-180"
                />
              </summary>

              <p
                className="pb-5 pr-8 text-[13px] sm:text-[14px] leading-[22px] text-[#6b747c]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </aside>
  );
}
