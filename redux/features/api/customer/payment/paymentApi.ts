import type { PaymentInvoice } from "@/types/customer/invoice";
import baseApi from "../../baseApi";

interface ServicePaymentResponse {
  paymentId: string;
  requestId: string;
  checkoutUrl: string | null;
  checkoutSessionId: string | null;
  amount: number;
  currency: string;
}

interface PaymentResponse {
  id: string;
  purpose: string;
  status:
    | "PENDING"
    | "PROCESSING"
    | "AUTHORIZED"
    | "CAPTURED"
    | "SUCCEEDED"
    | "FAILED"
    | "VOIDED"
    | "CANCELED"
    | "EXPIRED";

  amount: number;
  currency: string;

  stripeCheckoutSessionId: string | null;
  stripePaymentIntentId: string | null;
}


export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    authorizeServicePayment: builder.mutation<
      ServicePaymentResponse,
      string
    >({

      query: (requestId) => ({
        url: `/payments/service-requests/${requestId}/authorization`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, requestId) => [
        "Payments",
        {
          type: "ServiceRequests",
          id: requestId,
        },
        {
          type: "ServiceRequests",
          id: "LIST",
        },
      ],

    }),


    getPaymentStatus: builder.query<
      PaymentResponse,
      string
    >({

      query: (paymentId) => ({
        url: `/payments/${paymentId}`,
        method: "GET",
        cache: "no-store",
      }),

    }),

    getOrderStatus: builder.query<
      { status: string; payment?: { status: string } },
      string
    >({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
        cache: "no-store",
      }),
    }),

    getPaymentInvoice: builder.query<PaymentInvoice, string>({
      query: (paymentId) => ({
        url: `/payments/${paymentId}/invoice`,
        method: "GET",
        cache: "no-store",
      }),
      providesTags: (_result, _error, paymentId) => [
        { type: "Payments", id: paymentId },
      ],
    }),

  }),

  overrideExisting:false,
});


export const {
  useAuthorizeServicePaymentMutation,
  useGetPaymentStatusQuery,
  useGetOrderStatusQuery,
  useGetPaymentInvoiceQuery,
} = paymentApi;