import { formatPrice, type Product } from "@/data/products";
import type { CatalogProduct } from "@/types/customer/catalog";
import {
  catalogProductImage,
  catalogProductPrice,
  catalogProductSlug,
} from "@/types/customer/catalog";

export { formatPrice };

export function toStoreProduct(product: CatalogProduct): Product {
  const image = catalogProductImage(product);
  const specifications = Object.fromEntries(
    Object.entries(product.specifications ?? {}).map(([key, value]) => [
      key,
      String(value),
    ]),
  );

  return {
    id: product.id,
    slug: catalogProductSlug(product),
    name: product.name,
    category: product.category,
    subtitle: product.tagline || product.features[0] || product.category,
    price: catalogProductPrice(product),
    image,
    gallery: product.imageUrls.length ? product.imageUrls : image ? [image] : [],
    description: product.description,
    features: product.features,
    specifications,
    shippingInfo: product.shippingInfo || "",
    warranty: product.warranty,
    inStock: product.inStock,
  };
}
