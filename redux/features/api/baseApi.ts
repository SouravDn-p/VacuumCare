import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import {
  clearAuthCookies,
  getAccessToken,
  getRefreshToken,
  setAuthCookies,
} from "@/lib/useCookies";

import type { AuthResponse } from "@/types/auth/authTypes";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

/* =========================================
   Normal API Request
========================================= */

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,

  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json");

    const token = getAccessToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

/* =========================================
   Refresh Request

   Separate query because we don't need
   Authorization header for /auth/refresh
========================================= */

const refreshBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,

  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json");

    return headers;
  },
});

/* =========================================
   Don't Refresh These Routes
========================================= */

const publicAuthRoutes = [
  "/auth/login",
  "/auth/customer/signup",
  "/auth/technician/signup",
  "/auth/verify-email",
  "/auth/resend-verification",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/refresh",
  "/auth/logout",
  "/public/",
];

const shouldSkipRefresh = (args: string | FetchArgs) => {
  const url = typeof args === "string" ? args : args.url;

  return publicAuthRoutes.some((route) => url.startsWith(route));
};

/* =========================================
   Refresh Lock

   If 3 requests fail with 401 together,
   only ONE refresh request will run.
========================================= */

let refreshPromise: Promise<boolean> | null = null;

/* =========================================
   Base Query With Auto Refresh
========================================= */

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  /* ── First Request ─────────────────── */

  let result = await rawBaseQuery(args, api, extraOptions);

  /* ── Not Unauthorized ──────────────── */

  if (result.error?.status !== 401) {
    return result;
  }

  /* ── Don't Refresh Auth Routes ─────── */

  if (shouldSkipRefresh(args)) {
    return result;
  }

  const refreshToken = getRefreshToken();

  /* ── No Refresh Token ──────────────── */

  if (!refreshToken) {
    clearAuthCookies();

    return result;
  }

  /* ── Refresh Token ─────────────────── */

  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshResult = await refreshBaseQuery(
        {
          url: "/auth/refresh",
          method: "POST",

          body: {
            refreshToken,
          },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const data = refreshResult.data as AuthResponse;

        /*
         * IMPORTANT:
         * Backend rotates both tokens.
         */

        setAuthCookies(data.accessToken, data.refreshToken, data.user);

        return true;
      }

      clearAuthCookies();

      return false;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  const refreshed = await refreshPromise;

  /* ── Refresh Failed ────────────────── */

  if (!refreshed) {
    return result;
  }

  /* ── Retry Original Request ────────── */

  result = await rawBaseQuery(args, api, extraOptions);

  return result;
};

/* =========================================
   Base API
========================================= */

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: baseQueryWithReauth,

 tagTypes: [
  "Auth",
  "User",
  "Profile",
  "Addresses",
  "Payments",
  "Catalog",
  "Orders",
  "Cart",
  "AdminDashboard",
  "AdminReports",
  "AdminOrders",
  "AdminReturns",
  "AdminSettings",
  "AdminEquipment",

  "ServiceRequests",
  "Counteroffers",
  "Notifications",
  "Conversations",

  "Dashboard",
  "Branches",
  "Categories",
  "Subcategories",
  "KitchenStations",
  "Staff",
  "StaffAttendance",
  "AdminServiceRequests",
  "AdminTechnicians",
  "AdminQuotations",
  "AdminSchedule",
  "AdminCustomers",
  "AdminCounteroffers",
  "AdminProducts",
  "AdminPayments",
  "AdminNotifications",
],

  endpoints: () => ({}),
});

export default baseApi;
