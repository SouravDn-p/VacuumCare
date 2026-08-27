"use client";

import Link from "next/link";

import {
  CalendarClock,
  CreditCard,
  Headphones,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  MessageCircle,
  Package,
  Settings,
  UserRound,
  Wrench,
} from "lucide-react";

import { useGetProfileQuery } from "@/redux/features/api/customer/profile/profileApi";

interface ProfileDropdownProps {
  onClose: () => void;
  onLogout: () => Promise<void>;
  isLoggingOut: boolean;
  isAdmin?: boolean;
}

const accountLinks = [
  {
    label: "Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    label: "My Orders",
    href: "/orders",
    icon: Package,
  },
  {
    label: "Service Requests",
    href: "/service-requests",
    icon: Wrench,
  },
  {
    label: "Payment History",
    href: "/payment-history",
    icon: CreditCard,
  },
  {
    label: "Schedule",
    href: "/schedule",
    icon: CalendarClock,
  },
];

const adminAccountLinks = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: MessageCircle,
  },
];

const adminSecondaryLinks = [
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

const secondaryLinks = [
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Support",
    href: "/support",
    icon: Headphones,
  },
];

export default function ProfileDropdown({
  onClose,
  onLogout,
  isLoggingOut,
  isAdmin = false,
}: ProfileDropdownProps) {
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery();

  const fullName = profile
    ? `${profile.firstName} ${profile.lastName}`.trim()
    : isAdmin
      ? "Admin"
      : "Customer";

  return (
    <div
      className="
        absolute
        right-0
        top-[48px]
        z-[100]
        w-[310px]
        overflow-hidden
        rounded-[14px]
        border
        border-[#e6e9ec]
        bg-white
        shadow-[0_18px_45px_rgba(0,0,0,0.18)]
      "
    >
      {/* =========================
          User Information
      ========================= */}

      <div className="flex items-center gap-4 bg-[#f7f7f7] px-5 py-5">
        {/* Avatar */}
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#eef6ff]">
          {profile?.avatarUrl ? (
            // Using img avoids Next Image remote-domain config issues.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatarUrl}
              alt={fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound size={23} strokeWidth={1.7} className="text-[#1a73e8]" />
          )}
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          {isProfileLoading ? (
            <div className="space-y-2">
              <div className="h-4 w-[120px] animate-pulse rounded bg-[#e6eaed]" />

              <div className="h-3 w-[150px] animate-pulse rounded bg-[#e6eaed]" />
            </div>
          ) : (
            <>
              <p
                className="truncate text-[16px] font-bold text-[#202428]"
                style={{
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {fullName}
              </p>

              <p
                className="mt-0.5 truncate text-[13px] text-[#4f565c]"
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {profile?.email ?? ""}
              </p>
            </>
          )}
        </div>
      </div>

      {/* =========================
          Main Links
      ========================= */}

      <div className="px-5 py-3">
        {(isAdmin ? adminAccountLinks : accountLinks).map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-[8px] px-1 py-3 text-[14px] text-[#42484e] transition hover:bg-[#f4f8ff] hover:text-[#1a73e8]"
            >
              <Icon size={18} strokeWidth={1.6} />

              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="my-3 h-px bg-[#e4e7e9]" />

        {/* =========================
            Secondary Links
        ========================= */}

        {(isAdmin ? adminSecondaryLinks : secondaryLinks).map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-[8px] px-1 py-3 text-[14px] text-[#42484e] transition hover:bg-[#f4f8ff] hover:text-[#1a73e8]"
            >
              <Icon size={18} strokeWidth={1.6} />

              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* =========================
            Logout
        ========================= */}

        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="mt-4 flex h-[44px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#1a73e8] text-[14px] font-semibold text-white transition hover:bg-[#0865d7] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoggingOut ? (
            <LoaderCircle size={17} strokeWidth={2} className="animate-spin" />
          ) : (
            <LogOut size={17} strokeWidth={2} />
          )}

          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
