import type { AdminPaginatedResult } from "./common";

export interface AdminProductListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  isActive?: boolean;
  lowStock?: boolean;
  lowStockThreshold?: number;
}

export interface AdminProduct {
  id: string;
  sku: string | null;
  name: string;
  description: string;
  category: string;
  price: number | string;
  stock: number;
  imageUrls: string[];
  slug?: string | null;
  features?: string[];
  specifications?: Record<string, unknown> | null;
  warranty?: string | null;
  shippingInfo?: string | null;
  isActive: boolean;
  taxable: boolean;
}

export type AdminProductPage = AdminPaginatedResult<AdminProduct>;

export interface AdminCreateProductBody {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sku?: string;
  slug?: string;
  features?: string[];
  specifications?: Record<string, string>;
  warranty?: string;
  shippingInfo?: string;
  imageUrls?: string[];
  taxable?: boolean;
  isActive?: boolean;
}

export interface AdminUpdateProductBody {
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  stock?: number;
  sku?: string;
  slug?: string;
  features?: string[];
  specifications?: Record<string, string>;
  warranty?: string;
  shippingInfo?: string;
  imageUrls?: string[];
  taxable?: boolean;
  isActive?: boolean;
}

export function adminProductPrice(product: Pick<AdminProduct, "price">) {
  return Number(product.price) || 0;
}
