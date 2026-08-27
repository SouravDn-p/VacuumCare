"use client";

import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountManagement() {
  const router = useRouter();

  const handleLogoutAllDevices = async () => {
    try {
      /*
        Replace with your API:

        await fetch("/api/logout-all", {
          method: "POST",
        });
      */

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDeactivate = () => {
    console.log("Deactivate account");
  };

  const handleDelete = () => {
    console.log("Delete account");
  };

  return (
    <section className="rounded-[16px] border border-[#edf1f5] bg-white p-6 sm:p-8 shadow-[0px_4px_24px_rgba(0,0,0,0.025)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <ShieldCheck size={21} strokeWidth={1.8} className="text-[#1a73e8]" />

        <h2
          className="text-[20px] sm:text-[22px] font-semibold text-[#1a73e8]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Account Management
        </h2>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="button"
          onClick={handleLogoutAllDevices}
          className="h-[46px] px-5 rounded-[10px] bg-[#f2f6ff] text-[14px] font-semibold text-[#252a2f] transition hover:bg-[#e6efff]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Logout from all devices
        </button>

        <button
          type="button"
          onClick={handleDeactivate}
          className="h-[46px] px-3 text-[14px] font-medium text-[#1a73e8] transition hover:underline"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Deactivate Account
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="sm:ml-auto h-[46px] px-6 rounded-[10px] bg-[#bd1717] text-[14px] font-semibold text-white transition hover:bg-[#a31313]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Delete Account
        </button>
      </div>
    </section>
  );
}
