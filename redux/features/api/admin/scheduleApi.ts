import baseApi from "../baseApi";

import type {
  AdminScheduleItem,
  AdminScheduleQuery,
} from "@/types/admin/schedule";

export const adminScheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSchedule: builder.query<AdminScheduleItem[], AdminScheduleQuery>({
      query: (params) => ({
        url: "/admin/schedule",
        method: "GET",
        params,
      }),
      providesTags: ["AdminSchedule"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdminScheduleQuery } = adminScheduleApi;
