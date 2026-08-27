import type { Metadata } from "next";
import ProductsDashboard from "@/components/admin/products/ProductsDashboard";

export const metadata: Metadata = {
  title: "Products",
  description: "Manage and organize your products and categories",
};

export default function ProductsPage() {
  return <ProductsDashboard />;
}
