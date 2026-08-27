import baseApi from "../../baseApi";
import type {
  CatalogCategoryCount,
  CatalogProductDetail,
  CatalogProductListQuery,
  CatalogProductPage,
} from "@/types/customer/catalog";

export const catalogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCatalogProducts: builder.query<
      CatalogProductPage,
      CatalogProductListQuery | void
    >({
      query: (params) => ({
        url: "/catalog/products",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Catalog"],
    }),

    getCatalogProduct: builder.query<CatalogProductDetail, string>({
      query: (idOrSlug) => ({
        url: `/catalog/products/${idOrSlug}`,
        method: "GET",
      }),
      providesTags: (_result, _error, idOrSlug) => [
        { type: "Catalog", id: idOrSlug },
      ],
    }),

    getCatalogCategories: builder.query<CatalogCategoryCount[], void>({
      query: () => ({
        url: "/catalog/product-categories",
        method: "GET",
      }),
      providesTags: ["Catalog"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCatalogProductsQuery,
  useGetCatalogProductQuery,
  useGetCatalogCategoriesQuery,
} = catalogApi;
