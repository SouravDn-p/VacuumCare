import { z } from "zod";

/* =========================
   Login
========================= */

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),

  password: z.string().min(1, "Password is required"),

  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

/* =========================
   Customer Signup
========================= */

export const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),

    lastName: z.string().min(1, "Last name is required"),

    email: z.string().min(1, "Email is required").email("Enter a valid email"),

    phone: z.string().min(7, "Phone number is required"),

    address: z.string().min(3, "Address is required"),

    apartment: z.string().optional(),

    city: z.string().min(1, "City is required"),

    state: z.string().min(1, "State is required"),

    zipCode: z.string().min(2, "ZIP / Postal code is required"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    acceptTerms: z
      .boolean()
      .refine((value) => value, "You must accept the terms and conditions"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

/* =========================
   Verify Email
========================= */

export const verifyEmailSchema = z.object({
  otp: z.string().regex(/^\d{5}$/, "Enter the 5-digit verification code"),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

/* =========================
   Forgot Password
========================= */

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

/* =========================
   Reset Password
========================= */

export const resetPasswordSchema = z
  .object({
    otp: z.string().regex(/^\d{5}$/, "Enter the 5-digit reset code"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
