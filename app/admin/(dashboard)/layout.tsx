"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import AdminRouteGuard from "@/components/admin/AdminRouteGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminRouteGuard>
      <div className="admin-shell">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="admin-main">
          <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="admin-page-content">{children}</main>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
