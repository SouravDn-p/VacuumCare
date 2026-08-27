import baseApi from "../../baseApi";

import type {
  CreateAddressRequest,
  CustomerAddress,
  CustomerPayment,
  CustomerProfile,
  SuccessResponse,
  UpdateAddressRequest,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@/types/customer/profile/profileTypes";

/* =========================================================
   PROFILE API
========================================================= */

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* =====================================================
       GET PROFILE

       GET /users/me
    ===================================================== */

    getProfile: builder.query<CustomerProfile, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),

      providesTags: ["Profile"],
    }),

    /* =====================================================
       UPDATE PROFILE

       PATCH /users/me

       multipart/form-data
    ===================================================== */

    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: (data) => {
        const formData = new FormData();

        if (data.firstName !== undefined) {
          formData.append("firstName", data.firstName);
        }

        if (data.lastName !== undefined) {
          formData.append("lastName", data.lastName);
        }

        if (data.phone !== undefined) {
          formData.append("phone", data.phone);
        }

        if (data.company !== undefined) {
          formData.append("company", data.company);
        }

        if (data.avatar) {
          formData.append("avatar", data.avatar);
        }

        return {
          url: "/users/me",
          method: "PATCH",
          body: formData,
        };
      },

      invalidatesTags: ["Profile"],
    }),

    /* =====================================================
       ADD ADDRESS

       POST /users/me/addresses
    ===================================================== */

    addAddress: builder.mutation<CustomerAddress, CreateAddressRequest>({
      query: (body) => ({
        url: "/users/me/addresses",

        method: "POST",

        body,
      }),

      invalidatesTags: ["Profile", "Addresses"],
    }),

    /* =====================================================
       UPDATE ADDRESS

       PATCH /users/me/addresses/:id
    ===================================================== */

    updateAddress: builder.mutation<
      CustomerAddress,
      {
        id: string;
        data: UpdateAddressRequest;
      }
    >({
      query: ({ id, data }) => ({
        url: `/users/me/addresses/${id}`,

        method: "PATCH",

        body: data,
      }),

      invalidatesTags: ["Profile", "Addresses"],
    }),

    /* =====================================================
       DELETE ADDRESS

       DELETE /users/me/addresses/:id
    ===================================================== */

    deleteAddress: builder.mutation<SuccessResponse, string>({
      query: (id) => ({
        url: `/users/me/addresses/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["Profile", "Addresses"],
    }),

    /* =====================================================
       PAYMENT HISTORY

       GET /users/me/payments
    ===================================================== */

    getPayments: builder.query<CustomerPayment[], void>({
      query: () => ({
        url: "/users/me/payments",

        method: "GET",
      }),

      providesTags: ["Payments"],
    }),
  }),

  overrideExisting: false,
});

/* =========================================================
   HOOKS
========================================================= */

export const {
  useGetProfileQuery,
  useLazyGetProfileQuery,

  useUpdateProfileMutation,

  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,

  useGetPaymentsQuery,
  useLazyGetPaymentsQuery,
} = profileApi;
