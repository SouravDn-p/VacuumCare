"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

import {
  Bell,
  LogIn,
  LogOut,
  Menu,
  MessageCircleMore,
  Search,
  ShoppingCart,
  UserPlus,
  UserRound,
  X,
} from "lucide-react";

import NotificationsDropdown from "./NotificationsDropdown";
import ProfileDropdown from "./ProfileDropdown";

import { getAccessToken, getUser } from "@/lib/useCookies";

import { useLogoutMutation } from "@/redux/features/api/auth/authApi";
import { useGetNotificationsQuery } from "@/redux/features/api/customer/service/customerServiceApi";
import { isNotificationUnread } from "@/lib/mapCustomerNotification";

import { useChat } from "@/context/ChatContext";

import type { User } from "@/types/auth/authTypes";
import Image from "next/image";


const customerNavLinks = [
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const adminNavLinks = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Messages",
    href: "/admin/messages",
  },
];

type OpenDropdown = "notifications" | "profile" | null;


export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null);

  const [search, setSearch] = useState("");

  const [user, setUser] = useState<User | null>(null);

  const [authReady, setAuthReady] = useState(false);

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const { openChat } = useChat();

  const actionsRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const accessToken = getAccessToken();

    const savedUser = getUser();

    if (accessToken && savedUser) {
      setUser(savedUser);
    } else {
      setUser(null);
    }

    setAuthReady(true);
  }, [pathname]);

  const isLoggedIn = authReady && !!user;
  const isAdmin = user?.role === "ADMIN";
  const navLinks = !authReady
    ? []
    : isAdmin
      ? adminNavLinks
      : customerNavLinks;
  const { data: notifications = [] } = useGetNotificationsQuery(undefined, {
    skip: !isLoggedIn,
    pollingInterval: 30000,
  });
  const hasUnread = notifications.some(isNotificationUnread);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    if (href === "/products" || href.startsWith("/admin/")) {
      return pathname.startsWith(href);
    }

    return pathname === href;
  };



  const toggleDropdown = (dropdown: Exclude<OpenDropdown, null>) => {
    setOpenDropdown((current) => (current === dropdown ? null : dropdown));
  };



  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      router.push("/products");
      return;
    }

    router.push(`/products?search=${encodeURIComponent(query)}`);

    setOpenDropdown(null);
    setMenuOpen(false);
  };


  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setUser(null);

      setOpenDropdown(null);

      setMenuOpen(false);

      router.replace("/login");

      router.refresh();
    }
  };


  useEffect(() => {
    setOpenDropdown(null);
    setMenuOpen(false);
  }, [pathname]);



  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        actionsRef.current &&
        !actionsRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#eef2f5] bg-white shadow-[0px_2px_5px_rgba(0,56,57,0.06)]">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="flex h-[72px] items-center justify-between">

          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="Elite Central Vacuum home"
          >
            <div className="flex items-center gap-2">
             <Image src="/images/logo.png" alt="Elite Central Vacuum" width={100} height={100} className="w-10 h-10 object-contain" />
            </div>
          </Link>

          {/* ==================================================
              DESKTOP NAV
          =================================================== */}

          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-2 text-[15px] font-semibold transition-colors ${
                    active
                      ? "text-[#1a73e8]"
                      : "text-[#1a73e8] hover:opacity-70"
                  }`}
                  style={{
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  {link.label}

                  {active && (
                    <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-[#1a73e8]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div
            ref={actionsRef}
            className="relative hidden items-center gap-3 lg:flex"
          >
            {!isAdmin && (
              <>
                <form onSubmit={handleSearch} className="relative hidden xl:block">
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search..."
                    aria-label="Search products"
                    className="h-9 w-[190px] rounded-full border border-[#e7edf3] bg-white pl-4 pr-10 text-[13px] text-[#404848] outline-none transition focus:border-[#1a73e8]"
                  />

                  <button
                    type="submit"
                    aria-label="Search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a73e8]"
                  >
                    <Search size={17} strokeWidth={2} />
                  </button>
                </form>

                <Link
                  href="/cart"
                  aria-label="Shopping cart"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f7ff] text-[#1a73e8] transition hover:bg-[#dcecff]"
                >
                  <ShoppingCart size={18} strokeWidth={1.9} />
                </Link>

                <button
                  type="button"
                  onClick={openChat}
                  aria-label="Open live chat"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f7ff] text-[#1a73e8] transition hover:bg-[#dcecff]"
                >
                  <MessageCircleMore size={18} strokeWidth={1.9} />
                </button>
              </>
            )}

            {/* ==================================================
                AUTH LOADING
            =================================================== */}

            {!authReady ? (
              <div className="h-9 w-[120px] animate-pulse rounded-[8px] bg-[#eef3f8]" />
            ) : isLoggedIn ? (
              <>
                {/* ==================================================
                    NOTIFICATIONS
                =================================================== */}

                <div className="relative">
                  <button
                    type="button"
                    aria-label="Notifications"
                    aria-expanded={openDropdown === "notifications"}
                    onClick={() => toggleDropdown("notifications")}
                    className={`relative flex h-9 w-9 items-center justify-center rounded-full transition ${
                      openDropdown === "notifications"
                        ? "bg-[#dcecff]"
                        : "bg-[#f2f7ff] hover:bg-[#dcecff]"
                    }`}
                  >
                    <Bell
                      size={18}
                      strokeWidth={1.9}
                      className="text-[#1a73e8]"
                    />

                    {/* unread indicator */}

                    {hasUnread && (
                      <span className="absolute right-[7px] top-[6px] h-[5px] w-[5px] rounded-full bg-[#d83932] ring-2 ring-white" />
                    )}
                  </button>

                  {openDropdown === "notifications" && (
                    <NotificationsDropdown
                      isAdmin={isAdmin}
                      onClose={() => setOpenDropdown(null)}
                    />
                  )}
                </div>

                {/* ==================================================
                    PROFILE
                =================================================== */}

                <div className="relative">
                  <button
                    type="button"
                    aria-label="Account menu"
                    aria-expanded={openDropdown === "profile"}
                    onClick={() => toggleDropdown("profile")}
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                      openDropdown === "profile"
                        ? "bg-[#dcecff]"
                        : "bg-[#f2f7ff] hover:bg-[#dcecff]"
                    }`}
                  >
                    <UserRound
                      size={18}
                      strokeWidth={1.9}
                      className="text-[#1a73e8]"
                    />
                  </button>

                  {openDropdown === "profile" && (
                    <ProfileDropdown
                      isAdmin={isAdmin}
                      onClose={() => setOpenDropdown(null)}
                      onLogout={handleLogout}
                      isLoggingOut={isLoggingOut}
                    />
                  )}
                </div>
              </>
            ) : (
              /* ==================================================
                  GUEST
              =================================================== */

              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-[8px] border border-[#1a73e8] px-4 text-[13px] font-semibold text-[#1a73e8] transition hover:bg-[#eef6ff]"
                >
                  <LogIn size={15} />
                  Log in
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-[8px] bg-[#1a73e8] px-4 text-[13px] font-semibold text-white transition hover:bg-[#0865d7]"
                >
                  <UserPlus size={15} />
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* ==================================================
              MOBILE HEADER
          =================================================== */}

          <div className="flex items-center gap-2 lg:hidden">
            {!isAdmin && (
              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f7ff] text-[#1a73e8]"
              >
                <ShoppingCart size={18} />
              </Link>
            )}

            {/* Hamburger */}

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((previous) => !previous)}
              className="flex h-10 w-10 items-center justify-center text-[#1a73e8]"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ==================================================
            MOBILE MENU
        =================================================== */}

        {menuOpen && (
          <div className="border-t border-[#eef2f5] py-5 lg:hidden">
            {!isAdmin && (
              <form onSubmit={handleSearch} className="relative mb-5">
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products..."
                  className="h-11 w-full rounded-[10px] border border-[#e5ebf1] px-4 pr-11 text-[14px] outline-none focus:border-[#1a73e8]"
                />

                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1a73e8]"
                >
                  <Search size={18} />
                </button>
              </form>
            )}

            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`border-b border-[#f2f4f6] py-3.5 text-[15px] font-semibold ${
                    isActive(link.href) ? "text-[#1a73e8]" : "text-[#404848]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {!isAdmin && (
                <Link
                  href="/support"
                  className="border-b border-[#f2f4f6] py-3.5 text-[15px] font-semibold text-[#404848]"
                >
                  Support
                </Link>
              )}

              {isLoggedIn ? (
                <>
                  {!isAdmin && (
                    <>
                      <Link
                        href="/notifications"
                        className="border-b border-[#f2f4f6] py-3.5 text-[15px] font-semibold text-[#404848]"
                      >
                        Notifications
                      </Link>

                      <Link
                        href="/profile"
                        className="border-b border-[#f2f4f6] py-3.5 text-[15px] font-semibold text-[#404848]"
                      >
                        My Account
                      </Link>

                      <Link
                        href="/service-requests"
                        className="border-b border-[#f2f4f6] py-3.5 text-[15px] font-semibold text-[#404848]"
                      >
                        Service Requests
                      </Link>

                      <Link
                        href="/orders"
                        className="border-b border-[#f2f4f6] py-3.5 text-[15px] font-semibold text-[#404848]"
                      >
                        My Orders
                      </Link>

                      <Link
                        href="/schedule"
                        className="border-b border-[#f2f4f6] py-3.5 text-[15px] font-semibold text-[#404848]"
                      >
                        Schedule
                      </Link>

                      <Link
                        href="/payment-history"
                        className="border-b border-[#f2f4f6] py-3.5 text-[15px] font-semibold text-[#404848]"
                      >
                        Payment History
                      </Link>

                      <Link
                        href="/settings"
                        className="border-b border-[#f2f4f6] py-3.5 text-[15px] font-semibold text-[#404848]"
                      >
                        Settings
                      </Link>
                    </>
                  )}

                  {isAdmin && (
                    <>
                      <Link
                        href="/admin/notifications"
                        className="border-b border-[#f2f4f6] py-3.5 text-[15px] font-semibold text-[#404848]"
                      >
                        Notifications
                      </Link>

                      <Link
                        href="/admin/settings"
                        className="border-b border-[#f2f4f6] py-3.5 text-[15px] font-semibold text-[#404848]"
                      >
                        Settings
                      </Link>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-[#1a73e8] text-[14px] font-semibold text-white transition hover:bg-[#0865d7] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <LogOut size={17} strokeWidth={2} />

                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </>
              ) : authReady ? (
                /* ==================================================
                    GUEST MOBILE
                =================================================== */

                <div className="grid grid-cols-2 gap-3 pt-5">
                  <Link
                    href="/login"
                    className="flex h-11 items-center justify-center gap-2 rounded-[8px] border border-[#1a73e8] text-[14px] font-semibold text-[#1a73e8] transition hover:bg-[#eef6ff]"
                  >
                    <LogIn size={16} />
                    Log in
                  </Link>

                  <Link
                    href="/signup"
                    className="flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#1a73e8] text-[14px] font-semibold text-white transition hover:bg-[#0865d7]"
                  >
                    <UserPlus size={16} />
                    Sign up
                  </Link>
                </div>
              ) : null}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
