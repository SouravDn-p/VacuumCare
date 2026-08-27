import baseApi from "../baseApi";

import type {
  AdminCreateProductBody,
  AdminProduct,
  AdminProductListQuery,
  AdminProductPage,
  AdminUpdateProductBody,
} from "@/types/admin/products";

export const adminProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminProducts: builder.query<
      AdminProductPage,
      AdminProductListQuery | void
    >({
      query: (params) => ({
        url: "/admin/products",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["AdminProducts"],
    }),

    getAdminProductById: builder.query<AdminProduct, string>({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "AdminProducts", id }],
    }),

    createAdminProduct: builder.mutation<
      AdminProduct,
      AdminCreateProductBody | FormData
    >({
      query: (body) => ({
        url: "/admin/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminProducts", "Catalog"],
    }),

    updateAdminProduct: builder.mutation<
      AdminProduct,
      { id: string; body: AdminUpdateProductBody | FormData }
    >({
      query: ({ id, body }) => ({
        url: `/admin/products/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["AdminProducts", "Catalog"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminProductsQuery,
  useGetAdminProductByIdQuery,
  useCreateAdminProductMutation,
  useUpdateAdminProductMutation,
} = adminProductsApi;
