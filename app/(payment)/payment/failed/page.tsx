"use client";

import { Suspense } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, XCircle } from "lucide-react";

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<PaymentFailedFallback />}>
      <PaymentFailedContent />
    </Suspense>
  );
}

function PaymentFailedFallback() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1320px] px-5 pt-32 pb-32 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[600px] rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-5">
          <div className="rounded-[14px] bg-white px-6 py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fdeaea]">
              <XCircle size={34} className="text-red-600" />
            </div>
            <h1
              className="mt-6 text-[32px] font-extrabold text-[#1a73e8]"
              style={{ fontFamily: "Manrope,sans-serif" }}
            >
              Payment Failed
            </h1>
          </div>
        </div>
      </section>
    </main>
  );
}

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const requestId = searchParams.get("requestId");

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1320px] px-5 pt-32 pb-32 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[600px] rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-5">
          <div className="rounded-[14px] bg-white px-6 py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fdeaea]">
              <XCircle size={34} className="text-red-600" />
            </div>

            <h1
              className="mt-6 text-[32px] font-extrabold text-[#1a73e8]"
              style={{
                fontFamily: "Manrope,sans-serif",
              }}
            >
              Payment Failed
            </h1>

            <p className="mt-4 text-[14px] leading-[24px] text-[#68737a]">
              Your payment was not completed. Please try again or contact our
              support team if the problem continues.
            </p>

            {requestId && (
              <Link
                href={`/service-requests/${requestId}`}
                className="mt-8 flex h-[48px] items-center justify-center rounded-[8px] bg-[#1a73e8] text-[13px] font-semibold text-white hover:bg-[#0865d7]"
              >
                Try Payment Again
              </Link>
            )}

            {orderId && (
              <Link
                href={`/orders/${orderId}`}
                className="mt-8 flex h-[48px] items-center justify-center rounded-[8px] bg-[#1a73e8] text-[13px] font-semibold text-white hover:bg-[#0865d7]"
              >
                Return To Order
              </Link>
            )}

            {!orderId && !requestId && (
              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-[#1a73e8]"
              >
                <ArrowLeft size={14} />
                Back Home
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
