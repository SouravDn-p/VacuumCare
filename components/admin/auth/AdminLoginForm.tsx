"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { clearAuthCookies, getUser } from "@/lib/useCookies";
import { useLoginMutation } from "@/redux/features/api/auth/authApi";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (getUser()?.role === "ADMIN") {
      router.replace("/admin");
    }
  }, [router]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const result = await login({ email, password }).unwrap();

      if (result.user.role !== "ADMIN") {
        clearAuthCookies();
        setError("Only administrators can access this portal.");
        return;
      }

      router.replace("/admin");
    } catch (err) {
      setError(getApiErrorMessage(err, "Invalid email or password"));
    }
  };

  return (
    <form className="admin-login-form" noValidate onSubmit={onSubmit}>
      <div className="admin-form-group">
        <label htmlFor="admin-email" className="admin-form-label">
          Email address
        </label>
        <input
          id="admin-email"
          type="email"
          className="admin-form-input"
          placeholder="admin@elitevacuum.com"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="admin-form-group">
        <div className="admin-form-row">
          <label htmlFor="admin-password" className="admin-form-label">
            Password
          </label>
          <Link href="/admin/forgot-password" className="admin-form-forgot">
            Forgot password?
          </Link>
        </div>
        <input
          id="admin-password"
          type="password"
          className="admin-form-input"
          placeholder="••••••••"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error ? (
        <p className="admin-form-label">{error}</p>
      ) : null}

      <button
        type="submit"
        id="admin-login-submit"
        className="admin-login-btn"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
