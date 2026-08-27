"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validations/auth.schema";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

import { useLoginMutation } from "@/redux/features/api/auth/authApi";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");

  const [showPassword, setShowPassword] = useState(false);

  const [apiError, setApiError] = useState("");

  const [googleNotice, setGoogleNotice] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setApiError("");

    try {
      await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      /*
       * accessToken + refreshToken + user
       * are already saved by authApi.
       */

      const destination =
        nextPath && nextPath.startsWith("/") ? nextPath : "/";
      router.replace(destination);
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Invalid email or password"));
    }
  };

  return (
    <div>
      <div className="mb-9">
        <h1
          className="text-[32px] sm:text-[36px] font-bold text-[#1a73e8] leading-tight"
          style={{
            fontFamily: "Manrope, sans-serif",
          }}
        >
          Log in
        </h1>

        <p className="mt-3 text-[15px] sm:text-[16px] text-[#20252b]">
          Welcome back! Please enter your details.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-[16px] font-medium text-[#20252b]"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            {...register("email")}
            className={inputClass(!!errors.email)}
          />

          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-[16px] font-medium text-[#20252b]"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              {...register("password")}
              className={`${inputClass(!!errors.password)} pr-12`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#1a73e8]"
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              {...register("remember")}
              className="h-4 w-4 accent-[#1a73e8]"
            />

            <span className="text-[14px] text-[#667085]">
              Remember for 30 days
            </span>
          </label>

          <Link
            href="/forgot-password"
            className="text-[14px] font-semibold text-[#0875f5] hover:underline"
          >
            Forgot password
          </Link>
        </div>

        {apiError && (
          <div className="rounded-[8px] bg-red-50 px-4 py-3 text-[13px] text-red-600">
            {apiError}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#2478e8] text-[16px] font-semibold text-white transition hover:bg-[#1269d8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading && <LoaderCircle size={18} className="animate-spin" />}

          {isLoading ? "Signing in..." : "Sign in"}
        </button>

        <button
          type="button"
          onClick={() => setGoogleNotice(true)}
          className="flex h-[48px] w-full items-center justify-center gap-3 rounded-[8px] border border-[#cfd6dd] bg-white text-[16px] font-medium text-[#344054] transition hover:bg-[#f8fafc]"
        >
          <GoogleIcon />
          Sign in with Google
        </button>

        {googleNotice && (
          <p className="text-center text-[12px] text-[#667085]">
            Google sign-in is coming soon. Please use email and password for
            now.
          </p>
        )}
      </form>

      <p className="mt-9 text-center text-[13px] text-[#667085]">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-[#0875f5] hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-[13px] text-red-500">{children}</p>;
}

function inputClass(hasError: boolean) {
  return `h-[48px] w-full rounded-[8px] border bg-white px-4 text-[15px] text-[#344054] outline-none transition focus:ring-2 focus:ring-[#1a73e8]/10 ${
    hasError ? "border-red-500" : "border-[#cfd6dd] focus:border-[#1a73e8]"
  }`;
}

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.39a4.61 4.61 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.97-4.34 2.97-7.38Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.89 6.63-2.4l-3.24-2.5c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.05v2.58A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.93a6.02 6.02 0 0 1 0-3.86V7.49H3.05a10 10 0 0 0 0 9.02l3.34-2.58Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.94c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.95 5.49l3.34 2.58C7.18 7.7 9.39 5.94 12 5.94Z"
      />
    </svg>
  );
}
