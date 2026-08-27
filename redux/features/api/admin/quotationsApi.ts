import baseApi from "../baseApi";

import type {
  AdminQuotationListQuery,
  AdminQuotationPage,
} from "@/types/admin/quotations";

export const adminQuotationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminQuotations: builder.query<
      AdminQuotationPage,
      AdminQuotationListQuery | void
    >({
      query: (params) => ({
        url: "/admin/quotations",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["AdminQuotations"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdminQuotationsQuery } = adminQuotationsApi;
