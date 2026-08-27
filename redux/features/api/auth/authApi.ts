import baseApi from "../baseApi";

import {
  clearAuthCookies,
  getRefreshToken,
  setAuthCookies,
} from "@/lib/useCookies";

import type {
  AuthResponse,
  CustomerSignupRequest,
  ForgotPasswordRequest,
  LoginRequest,
  MeResponse,
  MessageResponse,
  ResendVerificationRequest,
  ResetPasswordRequest,
  SignupResponse,
  SuccessResponse,
  TechnicianSignupRequest,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from "@/types/auth/authTypes";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ────────────────────────────────
         Customer Signup
      ──────────────────────────────── */

    customerSignup: builder.mutation<SignupResponse, CustomerSignupRequest>({
      query: (body) => ({
        url: "/auth/customer/signup",

        method: "POST",

        body,
      }),
    }),

    /* ────────────────────────────────
         Technician Signup
      ──────────────────────────────── */

    technicianSignup: builder.mutation<SignupResponse, TechnicianSignupRequest>(
      {
        query: (body) => ({
          url: "/auth/technician/signup",

          method: "POST",

          body,
        }),
      },
    ),

    /* ────────────────────────────────
         Login
      ──────────────────────────────── */

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",

        method: "POST",

        body,
      }),

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          setAuthCookies(data.accessToken, data.refreshToken, data.user);
        } catch (error) {
          console.error("Login failed:", error);
        }
      },

      invalidatesTags: ["Auth", "Profile"],
    }),

    /* ────────────────────────────────
         Verify Email
      ──────────────────────────────── */

    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (body) => ({
        url: "/auth/verify-email",

        method: "POST",

        body,
      }),

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          /*
           * Verification also logs
           * the user in.
           */

          setAuthCookies(data.accessToken, data.refreshToken, data.user);
        } catch (error) {
          console.error("Email verification failed:", error);
        }
      },

      invalidatesTags: ["Auth", "Profile"],
    }),

    /* ────────────────────────────────
         Resend Verification
      ──────────────────────────────── */

    resendVerification: builder.mutation<
      MessageResponse,
      ResendVerificationRequest
    >({
      query: (body) => ({
        url: "/auth/resend-verification",

        method: "POST",

        body,
      }),
    }),

    /* ────────────────────────────────
         Forgot Password
      ──────────────────────────────── */

    forgotPassword: builder.mutation<MessageResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: "/auth/forgot-password",

        method: "POST",

        body,
      }),
    }),

    /* ────────────────────────────────
         Reset Password
      ──────────────────────────────── */

    resetPassword: builder.mutation<SuccessResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: "/auth/reset-password",

        method: "POST",

        body,
      }),
    }),

    /* ────────────────────────────────
         Current User
      ──────────────────────────────── */

    getMe: builder.query<MeResponse, void>({
      query: () => ({
        url: "/auth/me",

        method: "GET",
      }),

      providesTags: ["Profile"],
    }),

    /* ────────────────────────────────
         Logout
      ──────────────────────────────── */

    logout: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: "/auth/logout",

        method: "POST",

        body: {
          refreshToken: getRefreshToken(),
        },
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Logout failed:", error);
        } finally {
          clearAuthCookies();

          dispatch(baseApi.util.resetApiState());
        }
      },
    }),
  }),

  overrideExisting: false,
});

export const {
  useCustomerSignupMutation,
  useTechnicianSignupMutation,

  useLoginMutation,
  useLogoutMutation,

  useVerifyEmailMutation,
  useResendVerificationMutation,

  useForgotPasswordMutation,
  useResetPasswordMutation,

  useGetMeQuery,
  useLazyGetMeQuery,
} = authApi;
