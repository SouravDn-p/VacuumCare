import baseApi from "../baseApi";
import type { NotificationResponseDto } from "@/types/customer/service/customerTypes";

export interface AdminNotificationListQuery {
  page?: number;
  pageSize?: number;
  unreadOnly?: boolean;
  search?: string;
}

export interface AdminNotificationPage {
  items: NotificationResponseDto[];
  total: number;
  unreadCount: number;
  page: number;
  pageSize: number;
}

export const adminNotificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminNotifications: builder.query<
      AdminNotificationPage,
      AdminNotificationListQuery | void
    >({
      query: (params) => ({
        url: "/admin/notifications",
        method: "GET",
        params: params ?? { page: 1, pageSize: 50 },
      }),
      providesTags: ["AdminNotifications"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdminNotificationsQuery } = adminNotificationsApi;
