"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { LoaderCircle, MailCheck } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  verifyEmailSchema,
  type VerifyEmailFormValues,
} from "@/lib/validations/auth.schema";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

import {
  useResendVerificationMutation,
  useVerifyEmailMutation,
} from "@/redux/features/api/auth/authApi";

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [apiError, setApiError] = useState("");

  const [message, setMessage] = useState("");

  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();

  const [resendVerification, { isLoading: isResending }] =
    useResendVerificationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),

    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: VerifyEmailFormValues) => {
    if (!email) {
      setApiError("Email address is missing. Please sign up again.");

      return;
    }

    setApiError("");
    setMessage("");

    try {
      await verifyEmail({
        email,
        otp: values.otp,
      }).unwrap();

      /*
       * Verification response contains
       * access + refresh tokens.
       * authApi saves them automatically.
       */

      router.replace("/");
    } catch (error) {
      setApiError(
        getApiErrorMessage(error, "Invalid or expired verification code"),
      );
    }
  };

  const handleResend = async () => {
    if (!email) return;

    setApiError("");
    setMessage("");

    try {
      const response = await resendVerification({
        email,
      }).unwrap();

      setMessage(response.message);
    } catch (error) {
      setApiError(
        getApiErrorMessage(error, "Unable to resend verification code"),
      );
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef6ff] text-[#1a73e8]">
          <MailCheck size={23} />
        </div>

        <h1
          className="text-[32px] sm:text-[36px] font-bold text-[#1a73e8]"
          style={{
            fontFamily: "Manrope, sans-serif",
          }}
        >
          Verify your email
        </h1>

        <p className="mt-3 text-[15px] leading-6 text-[#667085]">
          We sent a 5-digit verification code to{" "}
          <span className="font-semibold text-[#344054]">
            {email || "your email"}
          </span>
          .
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-[15px] font-medium text-[#20252b]">
            Verification Code
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            placeholder="00000"
            {...register("otp")}
            className={`h-[52px] w-full rounded-[8px] border bg-white px-4 text-center text-[22px] font-semibold tracking-[8px] outline-none focus:ring-2 focus:ring-[#1a73e8]/10 ${
              errors.otp
                ? "border-red-500"
                : "border-[#cfd6dd] focus:border-[#1a73e8]"
            }`}
          />

          {errors.otp && (
            <p className="mt-1.5 text-[13px] text-red-500">
              {errors.otp.message}
            </p>
          )}
        </div>

        {apiError && (
          <div className="rounded-[8px] bg-red-50 px-4 py-3 text-[13px] text-red-600">
            {apiError}
          </div>
        )}

        {message && (
          <div className="rounded-[8px] bg-[#eef6ff] px-4 py-3 text-[13px] text-[#1a73e8]">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isVerifying}
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#2478e8] text-[16px] font-semibold text-white disabled:opacity-60"
        >
          {isVerifying && <LoaderCircle size={18} className="animate-spin" />}

          {isVerifying ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      <p className="mt-6 text-center text-[13px] text-[#667085]">
        Didn&apos;t receive a code?{" "}
        <button
          type="button"
          disabled={isResending || !email}
          onClick={handleResend}
          className="font-semibold text-[#1a73e8] hover:underline disabled:opacity-50"
        >
          {isResending ? "Sending..." : "Resend code"}
        </button>
      </p>
    </div>
  );
}
