import baseApi from "../baseApi";

import type {
  AdminAssignTechnicianBody,
  AdminCreateQuoteBody,
  AdminReviewRequestBody,
  AdminServiceRequestDetail,
  AdminServiceRequestListQuery,
  AdminServiceRequestPage,
} from "@/types/admin/serviceRequests";
import type { AdminQuotationItem } from "@/types/admin/quotations";

export const adminServiceRequestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminServiceRequests: builder.query<
      AdminServiceRequestPage,
      AdminServiceRequestListQuery | void
    >({
      query: (params) => ({
        url: "/admin/service-requests",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["AdminServiceRequests"],
    }),

    getAdminServiceRequestById: builder.query<
      AdminServiceRequestDetail,
      string
    >({
      query: (id) => ({
        url: `/admin/service-requests/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "AdminServiceRequests", id },
      ],
    }),

    reviewAdminServiceRequest: builder.mutation<
      AdminServiceRequestDetail,
      { id: string; body?: AdminReviewRequestBody }
    >({
      query: ({ id, body }) => ({
        url: `/admin/service-requests/${id}/status`,
        method: "PATCH",
        body: body ?? { status: "UNDER_REVIEW" },
      }),
      invalidatesTags: ["AdminServiceRequests"],
    }),

    createAdminQuotation: builder.mutation<
      AdminQuotationItem,
      { requestId: string; body: AdminCreateQuoteBody }
    >({
      query: ({ requestId, body }) => ({
        url: `/admin/service-requests/${requestId}/quotation`,
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "AdminServiceRequests",
        "AdminQuotations",
        "AdminCounteroffers",
      ],
    }),

    assignAdminServiceRequest: builder.mutation<
      AdminServiceRequestDetail,
      { id: string; body: AdminAssignTechnicianBody }
    >({
      query: ({ id, body }) => ({
        url: `/admin/service-requests/${id}/assign`,
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "AdminServiceRequests",
        "AdminSchedule",
        "AdminTechnicians",
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminServiceRequestsQuery,
  useGetAdminServiceRequestByIdQuery,
  useReviewAdminServiceRequestMutation,
  useCreateAdminQuotationMutation,
  useAssignAdminServiceRequestMutation,
} = adminServiceRequestsApi;
