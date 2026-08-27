"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { ArrowLeft, LoaderCircle, Mail } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validations/auth.schema";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

import { useForgotPasswordMutation } from "@/redux/features/api/auth/authApi";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [apiError, setApiError] = useState("");

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),

    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setApiError("");

    try {
      await forgotPassword({
        email: values.email,
      }).unwrap();

      router.push(`/reset-password?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Unable to send reset code"));
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef6ff] text-[#1a73e8]">
          <Mail size={22} />
        </div>

        <h1
          className="text-[32px] sm:text-[36px] font-bold text-[#1a73e8]"
          style={{
            fontFamily: "Manrope, sans-serif",
          }}
        >
          Forgot password?
        </h1>

        <p className="mt-3 text-[15px] leading-6 text-[#667085]">
          Enter your email and we&apos;ll send you a password reset code.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-[15px] font-medium text-[#20252b]">
            Email
          </label>

          <input
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            {...register("email")}
            className={`h-[48px] w-full rounded-[8px] border bg-white px-4 text-[15px] outline-none focus:ring-2 focus:ring-[#1a73e8]/10 ${
              errors.email
                ? "border-red-500"
                : "border-[#cfd6dd] focus:border-[#1a73e8]"
            }`}
          />

          {errors.email && (
            <p className="mt-1.5 text-[13px] text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {apiError && (
          <div className="rounded-[8px] bg-red-50 px-4 py-3 text-[13px] text-red-600">
            {apiError}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#2478e8] text-[16px] font-semibold text-white disabled:opacity-60"
        >
          {isLoading && <LoaderCircle size={18} className="animate-spin" />}

          {isLoading ? "Sending..." : "Send Reset Code"}
        </button>
      </form>

      <Link
        href="/login"
        className="mt-7 flex items-center justify-center gap-2 text-[14px] font-semibold text-[#667085] hover:text-[#1a73e8]"
      >
        <ArrowLeft size={16} />
        Back to login
      </Link>
    </div>
  );
}
