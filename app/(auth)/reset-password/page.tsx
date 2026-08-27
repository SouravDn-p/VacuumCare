import type { Metadata } from "next";
import { Suspense } from "react";

import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<ResetPasswordLoading />}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}

function ResetPasswordLoading() {
  return (
    <div>
      <div className="mb-8">
        <div className="mb-5 h-12 w-12 animate-pulse rounded-full bg-[#eef6ff]" />

        <div className="h-[43px] w-[260px] animate-pulse rounded-[8px] bg-[#edf2f7]" />

        <div className="mt-3 h-5 w-full max-w-[420px] animate-pulse rounded-[6px] bg-[#edf2f7]" />

        <div className="mt-2 h-5 w-[280px] animate-pulse rounded-[6px] bg-[#edf2f7]" />
      </div>

      <div className="space-y-5">
        <LoadingField />
        <LoadingField />
        <LoadingField />

        <div className="h-[48px] w-full animate-pulse rounded-[8px] bg-[#dce9fb]" />
      </div>
    </div>
  );
}

function LoadingField() {
  return (
    <div>
      <div className="mb-2 h-4 w-[120px] animate-pulse rounded bg-[#edf2f7]" />

      <div className="h-[48px] w-full animate-pulse rounded-[8px] bg-[#edf2f7]" />
    </div>
  );
}
