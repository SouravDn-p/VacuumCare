"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  signupSchema,
  type SignupFormValues,
} from "@/lib/validations/auth.schema";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

import { useCustomerSignupMutation } from "@/redux/features/api/auth/authApi";

const TERMS_VERSION = "2026-08-17";

export default function SignupForm() {
  const router = useRouter();

  const [customerSignup, { isLoading }] = useCustomerSignupMutation();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setApiError("");

    try {
      const response = await customerSignup({
        email: values.email,
        password: values.password,

        firstName: values.firstName,

        lastName: values.lastName,

        phone: values.phone,

        address: values.address,

        apartment: values.apartment || undefined,

        city: values.city,
        state: values.state,

        zipCode: values.zipCode,

        acceptTerms: values.acceptTerms,

        termsVersion: TERMS_VERSION,
      }).unwrap();

      if (response.emailVerificationRequired) {
        router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
      }
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Unable to create your account"));
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-[32px] sm:text-[36px] font-bold text-[#1a73e8]"
          style={{
            fontFamily: "Manrope, sans-serif",
          }}
        >
          Sign up
        </h1>

        <p className="mt-2 text-[15px] text-[#667085]">
          Create your customer account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Name */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="First Name*" error={errors.firstName?.message}>
            <input
              type="text"
              placeholder="First name"
              {...register("firstName")}
              className={inputClass(!!errors.firstName)}
            />
          </FormField>

          <FormField label="Last Name*" error={errors.lastName?.message}>
            <input
              type="text"
              placeholder="Last name"
              {...register("lastName")}
              className={inputClass(!!errors.lastName)}
            />
          </FormField>
        </div>

        {/* Email */}
        <FormField label="Email*" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            {...register("email")}
            className={inputClass(!!errors.email)}
          />
        </FormField>

        {/* Phone */}
        <FormField label="Phone*" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+1 416 555 0100"
            {...register("phone")}
            className={inputClass(!!errors.phone)}
          />
        </FormField>

        {/* Address */}
        <FormField label="Address*" error={errors.address?.message}>
          <input
            type="text"
            autoComplete="street-address"
            placeholder="123 Main Street"
            {...register("address")}
            className={inputClass(!!errors.address)}
          />
        </FormField>

        {/* Apartment */}
        <FormField label="Apartment / Unit" error={errors.apartment?.message}>
          <input
            type="text"
            placeholder="Unit 4B"
            {...register("apartment")}
            className={inputClass(!!errors.apartment)}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <FormField label="City*" error={errors.city?.message}>
            <input
              type="text"
              placeholder="Toronto"
              {...register("city")}
              className={inputClass(!!errors.city)}
            />
          </FormField>

          <FormField label="State*" error={errors.state?.message}>
            <input
              type="text"
              placeholder="ON"
              {...register("state")}
              className={inputClass(!!errors.state)}
            />
          </FormField>

          <FormField label="ZIP Code *" error={errors.zipCode?.message}>
            <input
              type="text"
              placeholder="M5V 2T6"
              {...register("zipCode")}
              className={inputClass(!!errors.zipCode)}
            />
          </FormField>
        </div>

        {/* Password */}
        <FormField label="Password*" error={errors.password?.message}>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
              {...register("password")}
              className={`${inputClass(!!errors.password)} pr-12`}
            />

            <PasswordToggle
              show={showPassword}
              onClick={() => setShowPassword((previous) => !previous)}
            />
          </div>
        </FormField>

        {/* Confirm */}
        <FormField
          label="Confirm Password*"
          error={errors.confirmPassword?.message}
        >
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirm password"
              {...register("confirmPassword")}
              className={`${inputClass(!!errors.confirmPassword)} pr-12`}
            />

            <PasswordToggle
              show={showConfirmPassword}
              onClick={() => setShowConfirmPassword((previous) => !previous)}
            />
          </div>
        </FormField>

        {/* Terms */}
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              {...register("acceptTerms")}
              className="mt-1 h-4 w-4 shrink-0 accent-[#1a73e8]"
            />

            <span className="text-[13px] leading-5 text-[#667085]">
              I agree to the{" "}
              <Link
                href="/terms"
                target="_blank"
                className="font-medium text-[#1a73e8] hover:underline"
              >
                Terms & Conditions
              </Link>{" "}
              and Privacy Policy.
            </span>
          </label>

          {errors.acceptTerms && (
            <p className="mt-1.5 text-[13px] text-red-500">
              {errors.acceptTerms.message}
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
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#2478e8] text-[16px] font-semibold text-white transition hover:bg-[#1269d8] disabled:opacity-60"
        >
          {isLoading && <LoaderCircle size={18} className="animate-spin" />}

          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-9 text-center text-[13px] text-[#667085]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[#0875f5] hover:underline"
        >
          Log in
        </Link>
      </p>
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
