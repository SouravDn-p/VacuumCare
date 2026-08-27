import baseApi from "../../baseApi";

export interface ContactFormPayload {
  fullName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation<{ success: boolean }, ContactFormPayload>({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSubmitContactMutation } = contactApi;
