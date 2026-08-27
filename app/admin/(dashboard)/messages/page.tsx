import type { Metadata } from "next";
import AdminMessagesClient from "@/components/admin/messages/AdminMessagesClient";

export const metadata: Metadata = {
  title: "Messages",
  description: "Live chat with customers",
};

export default function AdminMessagesPage() {
  return <AdminMessagesClient />;
}
