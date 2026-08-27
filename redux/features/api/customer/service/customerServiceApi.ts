import baseApi from "../../baseApi";

import type {
  AcceptQuotationRequest,
  AddServiceMediaRequest,
  CancelServiceRequestRequest,
  CreateCounterofferRequest,
  CreateServiceRequestRequest,
  CustomerConversation,
  CustomerConversationMessage,
  CustomerNotification,
  CustomerServiceRequest,
  PaymentAuthorizationResponse,
  QuoteCounteroffer,
  RejectQuotationRequest,
  SendConversationMessageRequest,
  ServiceCategory,
  ServicePayment,
  ServiceQuotation,
  ServiceReport,
  ServiceRequestStatus,
} from "@/types/customer/service/customerTypes";

export const customerServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceCatalog: builder.query<ServiceCategory[], void>({
      query: () => ({
        url: "/service-requests/catalog",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),

    getServiceRequests: builder.query<
      CustomerServiceRequest[],
      ServiceRequestStatus | void
    >({
      query: (status) => ({
        url: "/service-requests",
        method: "GET",
        params: status ? { status } : undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "ServiceRequests" as const,
                id,
              })),
              {
                type: "ServiceRequests" as const,
                id: "LIST",
              },
            ]
          : [
              {
                type: "ServiceRequests" as const,
                id: "LIST",
              },
            ],
    }),

    getServiceRequestById: builder.query<CustomerServiceRequest, string>({
      query: (requestId) => ({
        url: `/service-requests/${requestId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, requestId) => [
        {
          type: "ServiceRequests",
          id: requestId,
        },
      ],
    }),

    createServiceRequest: builder.mutation<
      CustomerServiceRequest,
      CreateServiceRequestRequest
    >({
      query: (data) => {
        const formData = new FormData();

        formData.append("categoryId", data.categoryId);
        formData.append("addressId", data.addressId);
        formData.append("description", data.description);

        if (data.issueId) {
          formData.append("issueId", data.issueId);
        }

        if (data.preferredDate) {
          formData.append("preferredDate", data.preferredDate);
        }

        if (data.preferredTime) {
          formData.append("preferredTime", data.preferredTime);
        }

        data.images?.forEach((file : File) => {
          formData.append("images", file);
        });

        data.videos?.forEach((file : File) => {
          formData.append("videos", file);
        });

        return {
          url: "/service-requests",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [
        {
          type: "ServiceRequests",
          id: "LIST",
        },
        "Notifications",
      ],
    }),

    acceptQuotation: builder.mutation<
      ServiceQuotation,
      {
        requestId: string;
        data: AcceptQuotationRequest;
      }
    >({
      query: ({ requestId, data }) => ({
        url: `/service-requests/${requestId}/quotation/accept`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { requestId }) => [
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

    rejectQuotation: builder.mutation<
      ServiceQuotation,
      {
        requestId: string;
        data?: RejectQuotationRequest;
      }
    >({
      query: ({ requestId, data }) => ({
        url: `/service-requests/${requestId}/quotation/reject`,
        method: "POST",
        body: data ?? {},
      }),
      invalidatesTags: (_result, _error, { requestId }) => [
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

    createCounteroffer: builder.mutation<
      QuoteCounteroffer,
      {
        requestId: string;
        data: CreateCounterofferRequest;
      }
    >({
      query: ({ requestId, data }) => ({
        url: `/service-requests/${requestId}/quotation/counteroffers`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { requestId }) => [
        {
          type: "Counteroffers",
          id: requestId,
        },
        {
          type: "ServiceRequests",
          id: requestId,
        },
      ],
    }),

    getCounteroffers: builder.query<QuoteCounteroffer[], string>({
      query: (requestId) => ({
        url: `/service-requests/${requestId}/quotation/counteroffers`,
        method: "GET",
      }),
      providesTags: (_result, _error, requestId) => [
        {
          type: "Counteroffers",
          id: requestId,
        },
      ],
    }),

    authorizeServiceRequestPayment: builder.mutation<
      PaymentAuthorizationResponse,
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
      ],
    }),

    getServicePayment: builder.query<ServicePayment, string>({
      query: (paymentId) => ({
        url: `/payments/${paymentId}`,
        method: "GET",
      }),
      providesTags: ["Payments"],
    }),

    cancelServiceRequest: builder.mutation<
      CustomerServiceRequest,
      {
        requestId: string;
        data?: CancelServiceRequestRequest;
      }
    >({
      query: ({ requestId, data }) => ({
        url: `/service-requests/${requestId}/cancel`,
        method: "POST",
        body: data ?? {},
      }),
      invalidatesTags: (_result, _error, { requestId }) => [
        {
          type: "ServiceRequests",
          id: requestId,
        },
        {
          type: "ServiceRequests",
          id: "LIST",
        },
        "Payments",
      ],
    }),

    addServiceRequestMedia: builder.mutation<
      CustomerServiceRequest["media"][number],
      {
        requestId: string;
        data: AddServiceMediaRequest;
      }
    >({
      query: ({ requestId, data }) => {
        const formData = new FormData();

        formData.append("kind", "ISSUE");
        formData.append("file", data.file);

        return {
          url: `/service-requests/${requestId}/media`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { requestId }) => [
        {
          type: "ServiceRequests",
          id: requestId,
        },
      ],
    }),

    confirmServiceReport: builder.mutation<ServiceReport, string>({
      query: (requestId) => ({
        url: `/service-requests/${requestId}/report/customer-confirm`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, requestId) => [
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

    getNotifications: builder.query<CustomerNotification[], void>({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),

    markNotificationAsRead: builder.mutation<{ success: boolean }, string>({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications", "AdminNotifications"],
    }),

    markAllNotificationsAsRead: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications", "AdminNotifications"],
    }),

    getServiceRequestConversation: builder.query<
      CustomerConversation,
      string
    >({
      query: (requestId) => ({
        url: `/conversations/service-requests/${requestId}`,
        method: "POST",
      }),
      providesTags: ["Conversations"],
    }),

    openSupportConversation: builder.mutation<CustomerConversation, void>({
      query: () => ({
        url: "/conversations/support",
        method: "POST",
      }),
      invalidatesTags: ["Conversations"],
    }),

    getConversations: builder.query<CustomerConversation[], void>({
      query: () => ({
        url: "/conversations",
        method: "GET",
      }),
      providesTags: ["Conversations"],
    }),

    getConversationMessages: builder.query<
      CustomerConversationMessage[],
      string
    >({
      query: (conversationId) => ({
        url: `/conversations/${conversationId}/messages`,
        method: "GET",
      }),
      providesTags: (_result, _error, conversationId) => [
        { type: "Conversations", id: conversationId },
      ],
    }),

    markConversationRead: builder.mutation<{ success: boolean }, string>({
      query: (conversationId) => ({
        url: `/conversations/${conversationId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Conversations"],
    }),

    sendConversationMessage: builder.mutation<
      CustomerConversationMessage,
      {
        conversationId: string;
        data: SendConversationMessageRequest;
      }
    >({
      query: ({ conversationId, data }) => {
        const formData = new FormData();
        formData.append("body", data.body?.trim() || "Attachment");

        data.images?.forEach((file : File) => {
          formData.append("images", file);
        });

        data.videos?.forEach((file : File) => {
          formData.append("videos", file);
        });

        return {
          url: `/conversations/${conversationId}/messages`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { conversationId }) => [
        "Conversations",
        { type: "Conversations", id: conversationId },
      ],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetServiceCatalogQuery,
  useLazyGetServiceCatalogQuery,

  useGetServiceRequestsQuery,
  useLazyGetServiceRequestsQuery,

  useGetServiceRequestByIdQuery,
  useLazyGetServiceRequestByIdQuery,

  useCreateServiceRequestMutation,

  useAcceptQuotationMutation,
  useRejectQuotationMutation,

  useCreateCounterofferMutation,
  useGetCounteroffersQuery,
  useLazyGetCounteroffersQuery,

  useAuthorizeServiceRequestPaymentMutation,

  useGetServicePaymentQuery,
  useLazyGetServicePaymentQuery,

  useCancelServiceRequestMutation,

  useAddServiceRequestMediaMutation,

  useConfirmServiceReportMutation,

  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,

  useGetServiceRequestConversationQuery,
  useLazyGetServiceRequestConversationQuery,
  useOpenSupportConversationMutation,
  useGetConversationsQuery,
  useGetConversationMessagesQuery,
  useMarkConversationReadMutation,
  useSendConversationMessageMutation,
} = customerServiceApi;