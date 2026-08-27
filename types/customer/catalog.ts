export type CatalogProductSort =
  | "popularity"
  | "price_asc"
  | "price_desc"
  | "newest"
  | "name";

export interface CatalogProductListQuery {
  search?: string;
  category?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sort?: CatalogProductSort;
  page?: number;
  pageSize?: number;
}

export interface CatalogProduct {
  id: string;
  sku: string | null;
  name: string;
  description: string;
  category: string;
  price: number | string;
  stock: number;
  imageUrls: string[];
  slug: string | null;
  features: string[];
  specifications: Record<string, string | number | boolean> | null;
  warranty: string | null;
  shippingInfo: string | null;
  isActive: boolean;
  taxable: boolean;
  tagline: string | null;
  inStock: boolean;
}

export interface CatalogProductPage {
  items: CatalogProduct[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CatalogProductDetail extends CatalogProduct {
  relatedProducts: CatalogProduct[];
}

export interface CatalogCategoryCount {
  name: string;
  count: number;
}

export function catalogProductPrice(product: Pick<CatalogProduct, "price">) {
  return Number(product.price) || 0;
}

export function catalogProductSlug(product: Pick<CatalogProduct, "id" | "slug">) {
  return product.slug || product.id;
}

export function catalogProductImage(product: Pick<CatalogProduct, "imageUrls">) {
  return product.imageUrls.find(Boolean) ?? "";
}
