import { BASE_URL, baseApi } from "../baseApi";
import { getAccessToken } from "@/lib/useCookies";

export interface AdminReportQuery {
  from: string;
  to: string;
  timezone?: string;
  technicianId?: string;
  categoryId?: string;
  paymentStatus?: string;
}

export interface AdminReportTrend {
  current: number;
  previous: number;
  delta: number;
  deltaPercent: number;
}

export interface AdminReportOverview {
  currency: string;
  revenueSeries: { period: string; value: number }[];
  serviceDistribution: { name: string; count: number; percentage: number }[];
  monthlyOrders: { period: string; value: number }[];
  averageQuoteAcceptance: number;
  averageServiceValue: number;
  technicianUtilization: number;
  store: {
    orders: number;
    grossRevenue: number;
    refunds: number;
    netRevenue: number;
    averageOrderValue: number;
  };
  services: {
    requests: number;
    completed: number;
    acceptedQuotes: number;
    serviceRevenue: number;
    averageServiceValue: number;
  };
  trends: {
    averageQuoteAcceptance: AdminReportTrend;
    averageServiceValue: AdminReportTrend;
    technicianUtilization: AdminReportTrend;
    storeNetRevenue: AdminReportTrend;
    serviceRevenue: AdminReportTrend;
  };
}

export const adminReportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminReportsOverview: builder.query<
      AdminReportOverview,
      AdminReportQuery
    >({
      query: (params) => ({
        url: "/admin/reports/overview",
        method: "GET",
        params,
      }),
      providesTags: ["AdminReports"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdminReportsOverviewQuery } = adminReportsApi;

export async function downloadAdminReport(
  kind: "csv" | "pdf",
  query: AdminReportQuery,
) {
  const token = getAccessToken();
  const params = new URLSearchParams(
    Object.entries(query).filter(([, value]) => Boolean(value)) as [
      string,
      string,
    ][],
  );
  const response = await fetch(
    `${BASE_URL}/admin/reports/export.${kind}?${params.toString()}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );
  if (!response.ok) {
    throw new Error("Report export failed");
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `admin-report-${query.from}-${query.to}.${kind}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
