"use client";

import { motion, MotionConfig } from "framer-motion";
import {
  fadeScale,
  fadeUp,
  staggerContainer,
} from "@/components/shared/motion";

export default function AboutHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="about" className="relative overflow-hidden pt-[72px]">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #eef7ff 0%, #ffffff 92%)",
          }}
        />

        <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="min-h-[620px] lg:min-h-[700px] flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-16 lg:py-20">
              <motion.div
                className="max-w-[650px] text-center lg:text-left"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.p
                  className="text-[14px] font-semibold text-[#1a73e8] tracking-[1.4px] uppercase mb-4"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  variants={fadeUp}
                >
                  THE ENHANCEMENT STORY
                </motion.p>

                <motion.h1
                  className="text-[clamp(38px,6vw,64px)] font-extrabold text-[#0959c7] leading-[1.08] tracking-[-1.5px]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                  variants={fadeUp}
                >
                  About Enhancement
                  <br className="hidden sm:block" />
                  Central Vacuum
                </motion.h1>

                <motion.p
                  className="mt-6 text-[16px] sm:text-[18px] leading-[28px] text-[#5d656c] max-w-[620px] mx-auto lg:mx-0"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  variants={fadeUp}
                >
                  Dedicated to reliable, professional & frictionless home
                  wellness infrastructure since 2009.
                </motion.p>
              </motion.div>

              <motion.div
                className="relative w-full max-w-[570px] mx-auto h-[430px] sm:h-[500px]"
                variants={fadeScale}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.12 }}
              >
                <div className="absolute top-0 left-[10%] sm:left-[14%] w-[58%] sm:w-[56%] aspect-[1.28/1] rounded-[24px] overflow-hidden shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=560&fit=crop&auto=format"
                    alt="Enhancement service home"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute left-0 bottom-[2%] sm:bottom-0 w-[52%] aspect-square rounded-[24px] overflow-hidden shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=550&h=550&fit=crop&auto=format"
                    alt="Enhancement service vehicle"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute right-0 bottom-[14%] sm:bottom-[12%] w-[52%] aspect-square rounded-[24px] overflow-hidden shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=550&h=550&fit=crop&auto=format"
                    alt="Enhancement home services"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
