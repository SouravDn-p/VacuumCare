import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import AppToaster from "@/providers/AppToaster";
import NotificationStreamProvider from "@/providers/NotificationStreamProvider";
import ReduxProvider from "@/providers/ReduxProviders";

export const metadata: Metadata = {
  title: {
    default: "Enhancement",
    template: "%s | Enhancement",
  },
  description:
    "Premium central vacuum systems, installation, maintenance and repair services.",
  icons: {
    icon: [
      { url: "/images/web-logo.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/images/web-logo.png",
    apple: "/images/web-logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-white text-foreground antialiased">
        <ReduxProvider>
          <NotificationStreamProvider />
          {children}
          <AppToaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
