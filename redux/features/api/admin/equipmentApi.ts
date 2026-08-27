import baseApi from "../baseApi";
import type { AdminPaginatedResult } from "@/types/admin/common";

export interface AdminEquipmentInlet {
  id: string;
  floor: string;
  type: string;
  quantity: number;
}

export interface AdminEquipmentItem {
  id: string;
  customerId: string;
  unitNumber: string;
  manufacturer: string | null;
  model: string | null;
  serialNumber: string | null;
  location: string | null;
  additionalFeatures: string[];
  inlets: AdminEquipmentInlet[];
}

export const adminEquipmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminCustomerEquipment: builder.query<
      AdminPaginatedResult<AdminEquipmentItem>,
      string
    >({
      query: (customerId) => ({
        url: `/admin/customers/${customerId}/equipment`,
        method: "GET",
      }),
      providesTags: ["AdminEquipment"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdminCustomerEquipmentQuery } = adminEquipmentApi;
