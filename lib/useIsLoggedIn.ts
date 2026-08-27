"use client";

import { useSyncExternalStore } from "react";

import { getAccessToken, getUser } from "@/lib/useCookies";

export type AuthKind = "guest" | "customer" | "other";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("focus", onStoreChange);
  return () => window.removeEventListener("focus", onStoreChange);
}

function getSnapshot(): AuthKind {
  const token = getAccessToken();
  const user = getUser();
  if (!token || !user) return "guest";
  if (user.role === "CUSTOMER") return "customer";
  return "other";
}

function getServerSnapshot(): AuthKind {
  return "guest";
}

export function useAuthKind() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useIsLoggedIn() {
  return useAuthKind() !== "guest";
}

export function isAuthQueryError(error: unknown) {
  if (typeof error !== "object" || error === null || !("status" in error)) {
    return false;
  }

  const status = (error as { status?: unknown }).status;
  return status === 401 || status === 403;
}
