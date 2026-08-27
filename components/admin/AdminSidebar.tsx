"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  CalendarDays,
  Users,
  Wrench,
  Package,
  ShoppingBag,
  CreditCard,
  RotateCcw,
  BarChart2,
  Bell,
  Settings,
  LogOut,
  X,
  MessageCircle,
  LoaderCircle,
} from "lucide-react";
import { useLogoutMutation } from "@/redux/features/api/auth/authApi";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/service-requests", label: "Service Requests", icon: ClipboardList },
  { href: "/admin/quotations", label: "Quotations", icon: FileText },
  { href: "/admin/calendar", label: "Calendar & Scheduling", icon: CalendarDays },
  { href: "/admin/technicians", label: "Technicians", icon: Wrench },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/equipment", label: "Equipment & Inlets", icon: Settings },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/returns", label: "Returns", icon: RotateCcw },
  { href: "/admin/reports", label: "Reports", icon: BarChart2 },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/messages", label: "Messages", icon: MessageCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  async function handleLogout() {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      onClose?.();
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <>
      {isOpen && (
        <div className="admin-sidebar-overlay" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`admin-sidebar${isOpen ? " admin-sidebar--open" : ""}`}>
        <div className="admin-sidebar__logo-wrap">
          <Link href="/admin" onClick={onClose} aria-label="Admin dashboard">
            <Image
              src="/images/white-text-logo.png"
              alt="Enhancement Admin"
              width={320}
              height={100}
              className="h-auto w-[180px]"
              priority
            />
          </Link>
          {isOpen && (
            <button
              type="button"
              className="admin-sidebar__close-btn"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <X size={20} color="rgba(255,255,255,0.8)" />
            </button>
          )}
        </div>

        <nav className="admin-sidebar__nav" aria-label="Admin navigation">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`admin-sidebar__nav-item${isActive ? " admin-sidebar__nav-item--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  size={20}
                  className="admin-sidebar__nav-icon"
                  color={isActive ? "#ffffff" : "rgba(255,255,255,0.7)"}
                  strokeWidth={1.5}
                />
                <span className="admin-sidebar__nav-label">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar__bottom">
          <button
            type="button"
            className="admin-sidebar__logout"
            aria-label="Logout"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <LoaderCircle size={20} color="rgba(255,255,255,0.7)" className="animate-spin" />
            ) : (
              <LogOut size={20} color="rgba(255,255,255,0.7)" strokeWidth={1.5} />
            )}
            <span className="admin-sidebar__nav-label">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
