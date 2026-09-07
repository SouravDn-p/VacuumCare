"use client";

import { ArrowRight, Mail, PhoneCall } from "lucide-react";
import { motion, MotionConfig } from "framer-motion";
import { fadeUp, inView, staggerContainer } from "@/components/shared/motion";

const supportOptions = [
  {
    id: 1,
    icon: PhoneCall,
    title: "Call Support",
    description: "Mon–Sat, 11AM–9PM",
    buttonText: "CALL NOW",
    href: "tel:+1880555465215",
  },
  {
    id: 2,
    icon: Mail,
    title: "Email Support",
    description: "24/7",
    buttonText: "SEND EMAIL",
    href: "mailto:service@elitecentralvac.com",
  },
];

export default function ContactSupportCards() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 py-20 lg:py-28">
        <motion.div
          className="max-w-[720px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          {supportOptions.map((option) => {
            const Icon = option.icon;

            return (
              <motion.article
                key={option.id}
                className="rounded-[16px] border border-[#e9eef5] bg-[#f8fbff] shadow-[0px_4px_20px_rgba(0,0,0,0.025)] p-7 sm:p-8 flex flex-col items-center text-center"
                variants={fadeUp}
              >
                <div className="w-14 h-14 rounded-[12px] bg-[#dcecff] flex items-center justify-center">
                  <Icon
                    size={28}
                    strokeWidth={1.8}
                    className="text-[#1a73e8]"
                  />
                </div>

                <div className="mt-7">
                  <h2
                    className="text-[19px] sm:text-[20px] font-bold text-[#242a2e]"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {option.title}
                  </h2>

                  <p
                    className="mt-2 text-[13px] font-semibold text-[#1a73e8]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {option.description}
                  </p>
                </div>

                <a
                  href={option.href}
                  className="mt-8 w-full h-11 rounded-full bg-[#d4e7ff] text-[#1a73e8] flex items-center justify-center gap-2 text-[13px] font-bold hover:bg-[#1a73e8] hover:text-white transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {option.buttonText}
                  <ArrowRight size={15} strokeWidth={2} />
                </a>
              </motion.article>
            );
          })}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
