import baseApi from "../baseApi";

export interface AdminDashboardSummary {
  newServiceRequests: number;
  quotationsAwaitingResponse: number;
  servicesScheduledToday: number;
  monthlyServiceRevenue: number;
  ordersAwaitingShipment: number;
  paymentIssues: number;
}

export interface AdminRecentServiceRequest {
  id: string;
  requestNumber: string;
  customerName: string;
  serviceName: string;
  issueName: string | null;
  status: string;
  createdAt: string;
}

export interface AdminDashboardScheduleItem {
  id: string;
  requestNumber: string;
  customerName: string;
  serviceName: string;
  technicianName: string | null;
  status: string;
  scheduledStart: string;
}

export interface AdminRevenueSeries {
  total: number;
  items: { period: string; revenue: number }[];
}

export interface AdminServiceDistribution {
  total: number;
  items: { issueId: string | null; name: string; count: number; percentage: number }[];
}

export interface AdminRecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  currency: string;
  status: string;
  paymentStatus: string | null;
  createdAt: string;
}

export const adminDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardSummary: builder.query<AdminDashboardSummary, void>({
      query: () => ({ url: "/admin/dashboard/summary", method: "GET" }),
      providesTags: ["AdminDashboard"],
    }),
    getAdminRecentServiceRequests: builder.query<
      AdminRecentServiceRequest[],
      void
    >({
      query: () => ({
        url: "/admin/dashboard/recent-service-requests",
        method: "GET",
        params: { limit: 5 },
      }),
      providesTags: ["AdminDashboard"],
    }),
    getAdminDashboardSchedule: builder.query<
      AdminDashboardScheduleItem[],
      void
    >({
      query: () => ({
        url: "/admin/dashboard/schedule",
        method: "GET",
        params: { limit: 5 },
      }),
      providesTags: ["AdminDashboard"],
    }),
    getAdminDashboardRevenue: builder.query<AdminRevenueSeries, void>({
      query: () => ({ url: "/admin/dashboard/revenue", method: "GET" }),
      providesTags: ["AdminDashboard"],
    }),
    getAdminServiceDistribution: builder.query<
      AdminServiceDistribution,
      void
    >({
      query: () => ({
        url: "/admin/dashboard/service-distribution",
        method: "GET",
      }),
      providesTags: ["AdminDashboard"],
    }),
    getAdminRecentOrders: builder.query<AdminRecentOrder[], void>({
      query: () => ({
        url: "/admin/dashboard/recent-orders",
        method: "GET",
        params: { limit: 5 },
      }),
      providesTags: ["AdminDashboard"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminDashboardSummaryQuery,
  useGetAdminRecentServiceRequestsQuery,
  useGetAdminDashboardScheduleQuery,
  useGetAdminDashboardRevenueQuery,
  useGetAdminServiceDistributionQuery,
  useGetAdminRecentOrdersQuery,
} = adminDashboardApi;
