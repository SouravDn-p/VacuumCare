"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Eye, EyeOff, KeyRound, LoaderCircle } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/validations/auth.schema";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

import { useResetPasswordMutation } from "@/redux/features/api/auth/authApi";

export default function ResetPasswordForm() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [apiError, setApiError] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),

    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!email) {
      setApiError(
        "Email address is missing. Please start the password reset process again.",
      );

      return;
    }

    setApiError("");

    try {
      await resetPassword({
        email,
        otp: values.otp,

        /*
         * confirmPassword is only
         * frontend validation.
         */
        password: values.password,
      }).unwrap();

      router.replace("/login?reset=success");
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Unable to reset your password"));
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef6ff] text-[#1a73e8]">
          <KeyRound size={22} />
        </div>

        <h1
          className="text-[32px] sm:text-[36px] font-bold text-[#1a73e8]"
          style={{
            fontFamily: "Manrope, sans-serif",
          }}
        >
          Reset password
        </h1>

        <p className="mt-3 text-[15px] leading-6 text-[#667085]">
          Enter the 5-digit code sent to{" "}
          <span className="font-semibold text-[#344054]">
            {email || "your email"}
          </span>{" "}
          and create your new password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField label="Reset Code*" error={errors.otp?.message}>
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            placeholder="00000"
            {...register("otp")}
            className={`${inputClass(
              !!errors.otp,
            )} text-center text-[20px] font-semibold tracking-[7px]`}
          />
        </FormField>

        <FormField label="New Password*" error={errors.password?.message}>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter new password"
              {...register("password")}
              className={`${inputClass(!!errors.password)} pr-12`}
            />

            <PasswordToggle
              show={showPassword}
              onClick={() => setShowPassword((previous) => !previous)}
            />
          </div>
        </FormField>

        <FormField
          label="Confirm Password*"
          error={errors.confirmPassword?.message}
        >
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirm new password"
              {...register("confirmPassword")}
              className={`${inputClass(!!errors.confirmPassword)} pr-12`}
            />

            <PasswordToggle
              show={showConfirm}
              onClick={() => setShowConfirm((previous) => !previous)}
            />
          </div>
        </FormField>

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

          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[15px] font-medium text-[#20252b]">
        {label}
      </label>

      {children}

      {error && <p className="mt-1.5 text-[13px] text-red-500">{error}</p>}
    </div>
  );
}

function PasswordToggle({
  show,
  onClick,
}: {
  show: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#1a73e8]"
    >
      {show ? <EyeOff size={19} /> : <Eye size={19} />}
    </button>
  );
}

function inputClass(hasError: boolean) {
  return `h-[48px] w-full rounded-[8px] border bg-white px-4 text-[15px] text-[#344054] outline-none transition focus:ring-2 focus:ring-[#1a73e8]/10 ${
    hasError ? "border-red-500" : "border-[#cfd6dd] focus:border-[#1a73e8]"
  }`;
}
