import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Enhancement collects, uses, and protects your information.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-[#5d656c]">
          Enhancement collects the information you provide when you create an
          account, request service, place an order, or contact support. We use
          that information to fulfill requests, process payments, and communicate
          about your home systems.
        </p>
        <p className="mt-4 text-[15px] leading-7 text-[#5d656c]">
          We do not sell personal information. Access to customer data is limited
          to authorized staff and technicians working on your service. You can
          update your profile details or ask us to close your account at any time.
        </p>
        <p className="mt-4 text-[15px] leading-7 text-[#5d656c]">
          Questions about this policy can be sent through our{" "}
          <Link href="/contact" className="font-semibold text-[#1a73e8] hover:underline">
            contact page
          </Link>{" "}
          or to service@enhancement.com.
        </p>
      </article>
    </main>
  );
}
