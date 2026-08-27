"use client";

import { SlidersHorizontal } from "lucide-react";

export default function PreferencesSettings() {
  return (
    <section className="rounded-[16px] border border-[#edf1f5] bg-white p-6 sm:p-8 shadow-[0px_4px_24px_rgba(0,0,0,0.025)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <SlidersHorizontal
          size={21}
          strokeWidth={1.8}
          className="text-[#1a73e8]"
        />

        <h2
          className="text-[20px] sm:text-[22px] font-semibold text-[#1a73e8]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Preferences
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Language */}
        <div>
          <label
            htmlFor="language"
            className="block mb-2 text-[13px] font-medium text-[#404848]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Language
          </label>

          <div className="relative">
            <select
              id="language"
              defaultValue="en-US"
              className="w-full h-[48px] appearance-none rounded-[10px] bg-[#f2f6ff] px-4 pr-10 text-[14px] text-[#404848] outline-none border border-transparent focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <option value="en-US">English (United States)</option>
              <option value="en-UK">English (United Kingdom)</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>

            <SelectArrow />
          </div>
        </div>

        {/* Timezone */}
        <div>
          <label
            htmlFor="timezone"
            className="block mb-2 text-[13px] font-medium text-[#404848]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Timezone
          </label>

          <div className="relative">
            <select
              id="timezone"
              defaultValue="pacific"
              className="w-full h-[48px] appearance-none rounded-[10px] bg-[#f2f6ff] px-4 pr-10 text-[14px] text-[#404848] outline-none border border-transparent focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <option value="pacific">Pacific Time (PT)</option>
              <option value="mountain">Mountain Time (MT)</option>
              <option value="central">Central Time (CT)</option>
              <option value="eastern">Eastern Time (ET)</option>
            </select>

            <SelectArrow />
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectArrow() {
  return (
    <svg
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="#667085"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
