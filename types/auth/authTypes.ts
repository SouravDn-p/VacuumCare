export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

/* =========================
   User
========================= */

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

/* =========================
   Login
========================= */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/* =========================
   Customer Signup
========================= */

export interface CustomerSignupRequest {
  email: string;
  password: string;

  firstName: string;
  lastName: string;

  phone: string;

  address: string;
  apartment?: string;

  city: string;
  state: string;
  zipCode: string;

  acceptTerms: boolean;
  termsVersion: string;
}

/* =========================
   Technician Signup
========================= */

export interface TechnicianSignupRequest extends CustomerSignupRequest {
  serviceArea: string;
  skills: string[];

  employeeId: string;
  licenseNumber: string;

  yearsExperience: number;

  bio: string;
}

/* =========================
   Signup Response
========================= */

export interface SignupResponse {
  emailVerificationRequired: boolean;
  message: string;
}

/* =========================
   Verify Email
========================= */

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface VerifyEmailResponse extends AuthResponse {
  success: boolean;
}

/* =========================
   Resend Verification
========================= */

export interface ResendVerificationRequest {
  email: string;
}

/* =========================
   Forgot Password
========================= */

export interface ForgotPasswordRequest {
  email: string;
}

/* =========================
   Reset Password
========================= */

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
}

/* =========================
   Common Responses
========================= */

export interface MessageResponse {
  message: string;
}

export interface SuccessResponse {
  success: boolean;
}

/* =========================
   Address
========================= */

export interface UserAddress {
  id: string;
  userId: string;

  line1: string;
  apartment: string | null;

  city: string;
  state: string;
  zipCode: string;
  country: string;

  latitude: number | null;
  longitude: number | null;

  isPrimary: boolean;
}

/* =========================
   GET /auth/me
========================= */

export interface MeResponse {
  id: string;

  role: UserRole;
  email: string;

  firstName: string;
  lastName: string;

  phone: string | null;
  avatarUrl: string | null;

  company: unknown | null;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;

  termsAcceptedAt: string | null;
  termsVersion: string | null;

  onboardingCompletedAt: string | null;

  notificationEmail: boolean;
  notificationPush: boolean;

  addresses: UserAddress[];

  technician: unknown | null;
}
