import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms that govern your use of Enhancement products, services, and accounts.",
};

export default function TermsPage() {
  return (
    <main className="bg-white pt-28 pb-20 lg:pt-32 lg:pb-28">
      <article className="mx-auto max-w-[760px] px-5 sm:px-8">
        <p className="text-[13px] font-semibold uppercase tracking-[1.2px] text-[#1a73e8]">
          Legal
        </p>
        <h1
          className="mt-3 text-[32px] sm:text-[40px] font-extrabold leading-[1.15] text-[#075fc7]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Terms of Service
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-[#5d656c]">
          By creating an Enhancement account or using our storefront, service
          requests, or support tools, you agree to provide accurate information
          and to use the platform only for legitimate household or commercial
          vacuum service.
        </p>
        <p className="mt-4 text-[15px] leading-7 text-[#5d656c]">
          Quotations, scheduling, installation, and repairs are subject to
          technician availability and the details you submit. Product purchases
          follow the order, payment, and return policies shown at checkout.
        </p>
        <p className="mt-4 text-[15px] leading-7 text-[#5d656c]">
          If you have questions about these terms, visit our{" "}
          <Link href="/contact" className="font-semibold text-[#1a73e8] hover:underline">
            contact page
          </Link>{" "}
          or email service@enhancement.com.
        </p>
      </article>
    </main>
  );
}
