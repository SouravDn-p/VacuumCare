import baseApi from "../baseApi";
import type {
  AdminPayment,
  AdminPaymentListQuery,
  AdminPaymentPage,
} from "@/types/admin/payments";

export const adminPaymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPayments: builder.query<
      AdminPaymentPage,
      AdminPaymentListQuery | void
    >({
      query: (params) => ({
        url: "/admin/payments",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["AdminPayments"],
    }),

    getAdminPaymentById: builder.query<AdminPayment, string>({
      query: (id) => ({
        url: `/admin/payments/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "AdminPayments", id }],
    }),

    captureAdminPayment: builder.mutation<{ id: string; status: string }, string>(
      {
        query: (id) => ({
          url: `/payments/${id}/capture`,
          method: "POST",
        }),
        invalidatesTags: ["AdminPayments", "Payments"],
      },
    ),

    refundAdminOrder: builder.mutation<
      { id: string; status: string },
      { orderId: string }
    >({
      query: ({ orderId }) => ({
        url: `/orders/${orderId}/refund`,
        method: "POST",
      }),
      invalidatesTags: ["AdminPayments", "Payments", "Orders"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminPaymentsQuery,
  useGetAdminPaymentByIdQuery,
  useCaptureAdminPaymentMutation,
  useRefundAdminOrderMutation,
} = adminPaymentsApi;
