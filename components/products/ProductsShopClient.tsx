"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import ProductFilters from "@/components/products/ProductFilters";
import ProductsGrid from "@/components/products/ProductsGrid";
import ProductsPagination from "@/components/products/ProductsPagination";
import { toStoreProduct } from "@/lib/mapCatalogProduct";
import { useGetCatalogProductsQuery } from "@/redux/features/api/customer/catalog/catalogApi";
import type { CatalogProductSort } from "@/types/customer/catalog";

const PAGE_SIZE = 12;

export default function ProductsShopClient() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<CatalogProductSort>("popularity");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSearch(initialSearch);
    setPage(1);
  }, [initialSearch]);

  const { data, isFetching } = useGetCatalogProductsQuery({
    search: search.trim() || undefined,
    categories: selectedCategories.length ? selectedCategories : undefined,
    maxPrice: maxPrice < 1500 ? maxPrice : undefined,
    inStockOnly: inStockOnly || undefined,
    sort,
    page,
    pageSize: PAGE_SIZE,
  });

  const products = (data?.items ?? []).map(toStoreProduct);
  const grouped = useMemo(() => {
    const groups = new Map<string, typeof products>();
    for (const product of products) {
      const key = product.category || "Products";
      const list = groups.get(key) ?? [];
      list.push(product);
      groups.set(key, list);
    }
    return Array.from(groups.entries());
  }, [products]);

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / PAGE_SIZE));

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr] gap-10">
      <ProductFilters
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        selectedCategories={selectedCategories}
        onToggleCategory={(category) => {
          setSelectedCategories((current) =>
            current.includes(category)
              ? current.filter((item) => item !== category)
              : [...current, category],
          );
          setPage(1);
        }}
        maxPrice={maxPrice}
        onMaxPriceChange={(value) => {
          setMaxPrice(value);
          setPage(1);
        }}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={(value) => {
          setInStockOnly(value);
          setPage(1);
        }}
      />

      <div className="space-y-12">
        {isFetching && products.length === 0 ? (
          <p className="py-16 text-center text-[14px] text-[#68737a]">
            Loading products...
          </p>
        ) : grouped.length === 0 ? (
          <p className="py-16 text-center text-[14px] text-[#68737a]">
            No products match these filters.
          </p>
        ) : (
          grouped.map(([category, items]) => (
            <ProductsGrid
              key={category}
              category={category}
              products={items}
              sort={sort}
              onSortChange={(value) => {
                setSort(value);
                setPage(1);
              }}
            />
          ))
        )}
      </div>
    </div>

    <ProductsPagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
    </>
  );
}
