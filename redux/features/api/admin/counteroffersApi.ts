import baseApi from "../baseApi";

import type { AdminPaginatedResult } from "@/types/admin/common";
import type {
  AdminDecideCounterofferBody,
  AdminNegotiationSummary,
} from "@/types/admin/quotations";

export const adminCounteroffersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPendingCounteroffers: builder.query<
      AdminPaginatedResult<AdminNegotiationSummary>,
      { page?: number; pageSize?: number } | void
    >({
      query: (params) => ({
        url: "/admin/quote-counteroffers/pending",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["AdminCounteroffers"],
    }),

    approveAdminCounteroffer: builder.mutation<
      AdminNegotiationSummary,
      { id: string; body?: AdminDecideCounterofferBody }
    >({
      query: ({ id, body }) => ({
        url: `/admin/quote-counteroffers/${id}/approve`,
        method: "POST",
        body: body ?? {},
      }),
      invalidatesTags: [
        "AdminCounteroffers",
        "AdminQuotations",
        "AdminServiceRequests",
      ],
    }),

    rejectAdminCounteroffer: builder.mutation<
      AdminNegotiationSummary,
      { id: string; body?: AdminDecideCounterofferBody }
    >({
      query: ({ id, body }) => ({
        url: `/admin/quote-counteroffers/${id}/reject`,
        method: "POST",
        body: body ?? {},
      }),
      invalidatesTags: [
        "AdminCounteroffers",
        "AdminQuotations",
        "AdminServiceRequests",
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminPendingCounteroffersQuery,
  useApproveAdminCounterofferMutation,
  useRejectAdminCounterofferMutation,
} = adminCounteroffersApi;
