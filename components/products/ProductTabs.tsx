"use client";

import { useState } from "react";

const tabs = ["Description", "Specifications", "Shipping Info"] as const;

type Tab = (typeof tabs)[number];

interface ProductTabsProps {
  description: string;
  specifications?: Record<string, string>;
  shippingInfo?: string;
  warranty?: string | null;
}

export default function ProductTabs({
  description,
  specifications,
  shippingInfo,
  warranty,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Description");
  const specEntries = Object.entries(specifications ?? {});
  if (warranty) {
    specEntries.unshift(["Warranty", warranty]);
  }

  return (
    <section>
      <div className="flex gap-8 sm:gap-12 border-b border-[#dfe5ea] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-4 whitespace-nowrap text-[14px] sm:text-[15px] font-semibold transition ${
              activeTab === tab
                ? "border-b-2 border-[#1a73e8] text-[#1a73e8]"
                : "text-[#7c858b]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        className="pt-7 text-[15px] leading-[27px] text-[#505960]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {activeTab === "Description" && (
          <div className="space-y-5">
            {description
              .split(/\n{2,}/)
              .filter(Boolean)
              .map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
          </div>
        )}

        {activeTab === "Specifications" && (
          specEntries.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4 max-w-[700px]">
              {specEntries.map(([title, value]) => (
                <Specification key={title} title={title} value={value} />
              ))}
            </div>
          ) : (
            <p>Specifications will be published by the office for this product.</p>
          )
        )}

        {activeTab === "Shipping Info" && (
          <p>
            {shippingInfo ||
              "Shipping details will be confirmed by the office for this product."}
          </p>
        )}
      </div>
    </section>
  );
}

function Specification({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[10px] bg-[#f4f7fb] p-4">
      <p className="text-[12px] uppercase text-[#7a858d]">{title}</p>

      <p className="mt-1 font-semibold text-[#30383e]">{value}</p>
    </div>
  );
}
