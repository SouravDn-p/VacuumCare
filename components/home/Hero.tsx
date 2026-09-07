"use client";

import { motion, MotionConfig } from "framer-motion";
import Button from "../ui/Button";
import { useGetPublicSettingsQuery } from "@/redux/features/api/admin/settingsApi";
import { fadeScale, fadeUp, staggerContainer } from "@/components/shared/motion";

const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1765970101531-8d116223af49?w=534&h=534&fit=crop&auto=format";

export default function Hero() {
  const { data } = useGetPublicSettingsQuery();
  const heroImage = data?.landingHeroImageUrl || FALLBACK_HERO_IMAGE;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden min-h-[520px] sm:min-h-[600px] lg:min-h-[800px] flex items-center">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #d8e9ff, #ffffff)",
          }}
        />

        <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 w-full pt-24 sm:pt-28 lg:pt-[100px] pb-10 sm:pb-16 lg:pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-6">
            {/* Text content */}
            <motion.div
              className="flex flex-col gap-6 sm:gap-11 flex-1 max-w-[760px] text-center lg:text-left items-center lg:items-start w-full"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex flex-col gap-4 sm:gap-5" variants={fadeUp}>
                <h1
                  className="text-[clamp(30px,8vw,68px)] font-bold leading-[1.12] sm:leading-[1.2] tracking-[-1px] sm:tracking-[-1.8px] bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(107.84deg, #0044ad 1.71%, #1a73e8 87.91%)",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  Powerful Central Vacuum Solutions for Modern Homes
                </h1>
                <p
                  className="text-[15px] sm:text-[20px] text-[#404848] leading-[1.6] max-w-[718px] mx-auto lg:mx-0"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Shop high-performance systems or request expert repair services
                  with ease. Experience the invisible infrastructure of a truly
                  clean environment.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row w-full sm:w-auto justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-4"
                variants={fadeUp}
              >
                <Button
                  href="/products"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Shop Products
                </Button>
                <Button
                  href="/services"
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Request Service
                </Button>
              </motion.div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              className="relative shrink-0 w-full max-w-[260px] sm:max-w-[380px] lg:max-w-[534px] aspect-square lg:w-[534px]"
              variants={fadeScale}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt="Central vacuum system"
                className="w-full h-full object-cover mix-blend-multiply rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
