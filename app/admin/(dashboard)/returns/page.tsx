import type { Metadata } from "next";
import ReturnsContainer from "@/components/admin/returns/ReturnsContainer";

export const metadata: Metadata = {
  title: "Return Requests",
  description: "Review and process customer return requests",
};

export default function ReturnsPage() {
  return (
    <div className="ret-page">
      <ReturnsContainer />
    </div>
  );
}
