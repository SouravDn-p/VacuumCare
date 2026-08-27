import baseApi from "../baseApi";

import type {
  AdminCustomerDetail,
  AdminCustomerListQuery,
  AdminCustomerPage,
  AdminUpdateCustomerBody,
} from "@/types/admin/customers";

export const adminCustomersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminCustomers: builder.query<
      AdminCustomerPage,
      AdminCustomerListQuery | void
    >({
      query: (params) => ({
        url: "/admin/customers",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["AdminCustomers"],
    }),

    getAdminCustomerById: builder.query<AdminCustomerDetail, string>({
      query: (id) => ({
        url: `/admin/customers/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "AdminCustomers", id }],
    }),

    updateAdminCustomer: builder.mutation<
      AdminCustomerDetail,
      { id: string; body: AdminUpdateCustomerBody }
    >({
      query: ({ id, body }) => ({
        url: `/admin/customers/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["AdminCustomers"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminCustomersQuery,
  useGetAdminCustomerByIdQuery,
  useUpdateAdminCustomerMutation,
} = adminCustomersApi;
