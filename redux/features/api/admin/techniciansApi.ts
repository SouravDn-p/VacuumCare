import baseApi from "../baseApi";

import type {
  AdminTechnicianDetail,
  AdminTechnicianListQuery,
  AdminTechnicianPage,
  AdminUpdateTechnicianBody,
  AdminVerifyTechnicianBody,
} from "@/types/admin/technicians";

export const adminTechniciansApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminTechnicians: builder.query<
      AdminTechnicianPage,
      AdminTechnicianListQuery | void
    >({
      query: (params) => ({
        url: "/admin/technicians",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["AdminTechnicians"],
    }),

    getAdminTechnicianById: builder.query<
      AdminTechnicianDetail,
      { id: string; timezone?: string }
    >({
      query: ({ id, timezone }) => ({
        url: `/admin/technicians/${id}`,
        method: "GET",
        params: timezone ? { timezone } : undefined,
      }),
      providesTags: (_result, _error, { id }) => [
        { type: "AdminTechnicians", id },
      ],
    }),

    updateAdminTechnician: builder.mutation<
      AdminTechnicianDetail,
      { id: string; body: AdminUpdateTechnicianBody }
    >({
      query: ({ id, body }) => ({
        url: `/admin/technicians/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["AdminTechnicians"],
    }),

    verifyAdminTechnician: builder.mutation<
      AdminTechnicianDetail,
      { id: string; body: AdminVerifyTechnicianBody }
    >({
      query: ({ id, body }) => ({
        url: `/admin/technicians/${id}/verification`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["AdminTechnicians"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminTechniciansQuery,
  useGetAdminTechnicianByIdQuery,
  useUpdateAdminTechnicianMutation,
  useVerifyAdminTechnicianMutation,
} = adminTechniciansApi;
