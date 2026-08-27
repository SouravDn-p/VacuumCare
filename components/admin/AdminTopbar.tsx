"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  UserRound,
} from "lucide-react";
import {
  useGetMeQuery,
  useLogoutMutation,
} from "@/redux/features/api/auth/authApi";
import { useGetAdminNotificationsQuery } from "@/redux/features/api/admin/notificationsApi";

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

const menuLinks = [
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/messages", label: "Messages", icon: MessageCircle },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { data: me } = useGetMeQuery();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { data } = useGetAdminNotificationsQuery(
    { page: 1, pageSize: 1, unreadOnly: true },
    { pollingInterval: 30000 },
  );
  const unreadCount = data?.unreadCount ?? 0;
  const displayName = me ? `${me.firstName} ${me.lastName}`.trim() : "Admin";
  const initial = displayName.charAt(0).toUpperCase() || "A";
  const roleLabel = me?.role === "ADMIN" ? "Administrator" : me?.role ?? "Admin";

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleLogout() {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setOpen(false);
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <header className="admin-topbar">
      <button
        type="button"
        className="admin-topbar__mobile-menu-btn"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <div className="admin-topbar__right">
        <Link
          href="/admin/notifications"
          className="admin-topbar__bell-btn"
          aria-label="Notifications"
        >
          <Bell size={22} color="#364153" />
          {unreadCount > 0 && (
            <span className="admin-topbar__bell-badge" aria-label="New notifications" />
          )}
        </Link>

        <div className="admin-topbar__user-wrap" ref={menuRef}>
          <button
            type="button"
            className="admin-topbar__user"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            <div className="admin-topbar__user-info">
              <p className="admin-topbar__user-name">{displayName || "Admin"}</p>
              <p className="admin-topbar__user-role">{roleLabel}</p>
            </div>
            <div className="admin-topbar__avatar" aria-hidden="true">
              {me?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={me.avatarUrl} alt="" />
              ) : (
                initial
              )}
            </div>
            <ChevronDown
              size={16}
              className={`admin-topbar__caret${open ? " admin-topbar__caret--open" : ""}`}
            />
          </button>

          {open && (
            <div className="admin-profile-menu" role="menu">
              <div className="admin-profile-menu__header">
                <div className="admin-profile-menu__avatar" aria-hidden="true">
                  {me?.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={me.avatarUrl} alt="" />
                  ) : (
                    <UserRound size={22} strokeWidth={1.7} />
                  )}
                </div>
                <div className="admin-profile-menu__identity">
                  <p className="admin-profile-menu__name">{displayName || "Admin"}</p>
                  <p className="admin-profile-menu__email">{me?.email ?? ""}</p>
                </div>
              </div>

              <div className="admin-profile-menu__links">
                {menuLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className="admin-profile-menu__link"
                      onClick={() => setOpen(false)}
                    >
                      <Icon size={16} strokeWidth={1.7} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <button
                type="button"
                className="admin-profile-menu__logout"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <LogOut size={16} strokeWidth={1.7} />
                )}
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
