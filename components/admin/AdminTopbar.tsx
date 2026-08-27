"use client";

import Link from "next/link";
import { Bell, Menu } from "lucide-react";
import { useGetMeQuery } from "@/redux/features/api/auth/authApi";
import { useGetAdminNotificationsQuery } from "@/redux/features/api/admin/notificationsApi";

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

export default function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const { data: me } = useGetMeQuery();
  const { data } = useGetAdminNotificationsQuery(
    { page: 1, pageSize: 1, unreadOnly: true },
    { pollingInterval: 30000 },
  );
  const unreadCount = data?.unreadCount ?? 0;
  const displayName = me ? `${me.firstName} ${me.lastName}`.trim() : "Admin";
  const initial = displayName.charAt(0).toUpperCase() || "A";

  return (
    <header className="admin-topbar">
      <button
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

        <div className="admin-topbar__user">
          <div className="admin-topbar__user-info">
            <p className="admin-topbar__user-name">{displayName || "Admin"}</p>
            <p className="admin-topbar__user-role">Administrator</p>
          </div>
          <div className="admin-topbar__avatar" aria-label="User avatar">
            {initial}
          </div>
        </div>
      </div>
    </header>
  );
}
