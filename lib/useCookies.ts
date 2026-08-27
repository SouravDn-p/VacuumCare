import Cookies from "js-cookie";

import type { User } from "@/types/auth/authTypes";

export const ACCESS_TOKEN_KEY = "elite-access-token";
export const REFRESH_TOKEN_KEY = "elite-refresh-token";
export const USER_KEY = "elite-user";

const cookieOptions = {
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

/* ── Access Token ───────────────────────── */

export const getAccessToken = (): string | undefined => {
  if (typeof window === "undefined") return undefined;

  return Cookies.get(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (token: string) => {
  if (typeof window === "undefined") return;

  Cookies.set(ACCESS_TOKEN_KEY, token, {
    ...cookieOptions,
    expires: 7,
  });
};

/* ── Refresh Token ──────────────────────── */

export const getRefreshToken = (): string | undefined => {
  if (typeof window === "undefined") return undefined;

  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token: string) => {
  if (typeof window === "undefined") return;

  Cookies.set(REFRESH_TOKEN_KEY, token, {
    ...cookieOptions,
    expires: 30,
  });
};

/* ── User ───────────────────────────────── */

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = Cookies.get(USER_KEY);

    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

export const setUser = (user: User) => {
  if (typeof window === "undefined") return;

  Cookies.set(USER_KEY, JSON.stringify(user), {
    ...cookieOptions,
    expires: 7,
  });
};

export const getUserType = (): string | null => {
  return getUser()?.role ?? null;
};

/* ── Save Session ───────────────────────── */

export const setAuthCookies = (
  accessToken: string,
  refreshToken: string,
  user?: User,
) => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);

  if (user) {
    setUser(user);
  }
};

/* ── Clear ──────────────────────────────── */

export const clearAuthCookies = () => {
  if (typeof window === "undefined") return;

  [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY].forEach((key) => {
    Cookies.remove(key, { path: "/" });
    Cookies.remove(key);
  });
};
