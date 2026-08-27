import type { ReactNode } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatModal from "@/components/chat/ChatModal";

import { CartProvider } from "@/context/CartContext";
import { ChatProvider } from "@/context/ChatContext";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <ChatProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <div className="flex-1">{children}</div>

          <Footer />
        </div>

        <ChatModal />
      </ChatProvider>
    </CartProvider>
  );
}
