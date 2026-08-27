import type { Metadata } from "next";
import { Suspense } from "react";

import AuthLayout from "@/components/auth/AuthLayout";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<VerifyEmailLoading />}>
        <VerifyEmailForm />
      </Suspense>
    </AuthLayout>
  );
}

function VerifyEmailLoading() {
  return (
    <div>
      <div className="mb-8">
        {/* Icon */}
        <div className="mb-5 h-12 w-12 animate-pulse rounded-full bg-[#eef6ff]" />

        {/* Title */}
        <div className="h-[43px] w-[260px] animate-pulse rounded-[8px] bg-[#edf2f7]" />

        {/* Description */}
        <div className="mt-3 h-5 w-full max-w-[420px] animate-pulse rounded-[6px] bg-[#edf2f7]" />

        <div className="mt-2 h-5 w-[280px] animate-pulse rounded-[6px] bg-[#edf2f7]" />
      </div>

      <div className="space-y-5">
        {/* OTP field */}
        <div>
          <div className="mb-2 h-4 w-[140px] animate-pulse rounded bg-[#edf2f7]" />

          <div className="h-[52px] w-full animate-pulse rounded-[8px] bg-[#edf2f7]" />
        </div>

        {/* Submit button */}
        <div className="h-[48px] w-full animate-pulse rounded-[8px] bg-[#dce9fb]" />

        {/* Resend */}
        <div className="mx-auto h-4 w-[210px] animate-pulse rounded bg-[#edf2f7]" />
      </div>
    </div>
  );
}
