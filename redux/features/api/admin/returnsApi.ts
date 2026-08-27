import baseApi from "../baseApi";
import type { AdminPaginatedResult, AdminPersonSummary } from "@/types/admin/common";

export type AdminReturnStatus =
  | "REQUESTED"
  | "APPROVED"
  | "REJECTED"
  | "RECEIVED"
  | "REFUNDED";

export interface AdminReturnRequest {
  id: string;
  status: AdminReturnStatus;
  reason: string;
  comments: string | null;
  adminNotes: string | null;
  resolution: string | null;
  orderId: string;
  orderItemId: string | null;
  orderNumber: string;
  customer: AdminPersonSummary;
  item: { product?: { name: string } } | null;
  actionEligibility: {
    allowedStatusTransitions: AdminReturnStatus[];
    canRefund: boolean;
  };
  createdAt: string;
}

export const adminReturnsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminReturns: builder.query<
      AdminPaginatedResult<AdminReturnRequest>,
      { status?: AdminReturnStatus } | void
    >({
      query: (params) => ({
        url: "/admin/return-requests",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["AdminReturns"],
    }),
    updateAdminReturnStatus: builder.mutation<
      unknown,
      { id: string; status: AdminReturnStatus; adminNotes?: string }
    >({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        formData.append("status", body.status);
        if (body.adminNotes) formData.append("adminNotes", body.adminNotes);
        return {
          url: `/orders/returns/${id}/status`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["AdminReturns"],
    }),
    refundAdminReturn: builder.mutation<
      unknown,
      { orderId: string; returnRequestId: string }
    >({
      query: ({ orderId, returnRequestId }) => ({
        url: `/orders/${orderId}/refund`,
        method: "POST",
        body: { returnRequestId },
      }),
      invalidatesTags: ["AdminReturns", "AdminPayments", "AdminOrders"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminReturnsQuery,
  useUpdateAdminReturnStatusMutation,
  useRefundAdminReturnMutation,
} = adminReturnsApi;
