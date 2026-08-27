import type { Metadata } from "next";
import Image from "next/image";
import AdminLoginForm from "@/components/admin/auth/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Secure admin portal login for the Enhancement system.",
};

export default function AdminLoginPage() {
  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        {/* Left branded panel */}
        <div className="admin-login-card__sidebar">
          <Image
            src="/images/white-text-logo.png"
            alt="Enhancement"
            width={110}
            height={64}
            className="admin-login-card__sidebar-logo"
            priority
          />
          <p className="admin-login-card__sidebar-title">Admin Portal</p>
          <p className="admin-login-card__sidebar-tagline">
            Manage service requests, technicians, orders and more — all in one place.
          </p>
        </div>

        {/* Right form section */}
        <div className="admin-login-card__form-section">
          <h1 className="admin-login-card__form-title">Welcome back</h1>
          <p className="admin-login-card__form-subtitle">
            Sign in to your admin account to continue
          </p>

          <AdminLoginForm />
        </div>

      </div>
    </div>
  );
}
