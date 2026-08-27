"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

import { getAccessToken, getUser } from "@/lib/useCookies";
import { useGetMeQuery } from "@/redux/features/api/auth/authApi";

export default function AdminRouteGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const token = ready ? getAccessToken() : undefined;
  const cachedUser = ready ? getUser() : null;

  const { data, isLoading, isError } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const role = data?.role ?? cachedUser?.role;
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    if (isLoading) return;

    if (isError || !isAdmin) {
      router.replace("/admin/login");
    }
  }, [isAdmin, isError, isLoading, ready, router, token]);

  if (!ready || !token || !isAdmin) {
    return null;
  }

  return children;
}
