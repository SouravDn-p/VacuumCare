"use client";

import Link from "next/link";

import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import ProductTabs from "@/components/products/ProductTabs";
import RelatedProducts from "@/components/products/RelatedProducts";
import { toStoreProduct } from "@/lib/mapCatalogProduct";
import { useGetCatalogProductQuery } from "@/redux/features/api/customer/catalog/catalogApi";

export default function ProductDetailsClient({ slug }: { slug: string }) {
  const { data, isLoading, isError } = useGetCatalogProductQuery(slug);

  if (isLoading) {
    return (
      <main className="bg-white">
        <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-32 pb-28">
          <p className="text-center text-[14px] text-[#68737a]">
            Loading product...
          </p>
        </section>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="bg-white">
        <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-32 pb-28 text-center">
          <h1 className="text-[30px] font-bold text-[#1a73e8]">
            Product not found
          </h1>
          <Link
            href="/products"
            className="mt-5 inline-block text-[14px] font-semibold text-[#1a73e8] hover:underline"
          >
            Back to store
          </Link>
        </section>
      </main>
    );
  }

  const product = toStoreProduct(data);
  const related = (data.relatedProducts ?? []).map(toStoreProduct);

  return (
    <main className="bg-white">
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-28 lg:pt-32">
        <div className="flex items-center gap-1 text-[13px] text-[#1a73e8]">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/products">Store</Link>
          <span>›</span>
          <span className="font-semibold">{product.name}</span>
        </div>
      </section>

      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-14 pb-20">
        <div className="rounded-[20px] bg-[#f3f7fd] p-5 sm:p-7 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <ProductGallery name={product.name} images={product.gallery} />
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <ProductTabs
          description={product.description}
          specifications={product.specifications}
          shippingInfo={product.shippingInfo}
          warranty={product.warranty}
        />
      </section>

      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-28">
        <RelatedProducts products={related} />
      </section>
    </main>
  );
}
