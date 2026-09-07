"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { fadeUp, staggerContainer } from "@/components/shared/motion";

export default function ContactHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative pt-[72px]">
        <div className="relative min-h-[380px] sm:min-h-[430px] lg:min-h-[510px] overflow-hidden">
          <Image
            src="/images/contact/contact.png"
            alt="Enhancement professional service"
            className="absolute inset-0 w-full h-full object-cover"
            width={1600}
            height={1600}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.52) 46%, rgba(0,0,0,0.08) 100%)",
            }}
          />

          <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 min-h-[380px] sm:min-h-[430px] lg:min-h-[470px] flex items-center">
            <motion.div
              className="max-w-[560px]"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                className="text-[14px] sm:text-[15px] font-semibold text-white uppercase tracking-[0.6px] mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
                variants={fadeUp}
              >
                CALL & CHATS
              </motion.p>

              <motion.h1
                className="text-[40px] sm:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-[-1.3px]"
                style={{ fontFamily: "Manrope, sans-serif" }}
                variants={fadeUp}
              >
                Contact Us
              </motion.h1>

              <motion.p
                className="mt-5 text-[16px] sm:text-[18px] leading-[28px] text-white/90 max-w-[520px]"
                style={{ fontFamily: "Inter, sans-serif" }}
                variants={fadeUp}
              >
                We are here to help you anytime. Choose your preferred way to
                reach our specialists.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
