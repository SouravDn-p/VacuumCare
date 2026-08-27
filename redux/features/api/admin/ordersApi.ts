import baseApi from "../baseApi";
import type { AdminPaginatedResult, AdminPersonSummary } from "@/types/admin/common";

export type AdminOrderStatus =
  | "PAYMENT_PENDING"
  | "PLACED"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "PAYMENT_FAILED"
  | "REFUNDED";

export interface AdminOrderListItem {
  id: string;
  orderNumber: string;
  status: AdminOrderStatus;
  total: number;
  itemCount: number;
  customer: AdminPersonSummary;
  actionEligibility: {
    allowedStatusTransitions: AdminOrderStatus[];
    canCancel: boolean;
  };
  createdAt: string;
}

export const adminOrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOrders: builder.query<
      AdminPaginatedResult<AdminOrderListItem>,
      { status?: AdminOrderStatus; page?: number; pageSize?: number } | void
    >({
      query: (params) => ({
        url: "/admin/orders",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["AdminOrders"],
    }),
    updateAdminOrderStatus: builder.mutation<
      unknown,
      { id: string; status: AdminOrderStatus }
    >({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["AdminOrders", "AdminDashboard"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminOrdersQuery,
  useUpdateAdminOrderStatusMutation,
} = adminOrdersApi;
