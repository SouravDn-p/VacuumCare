import type { Metadata } from "next";

import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="py-12 text-center">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
