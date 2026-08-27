import baseApi from "../baseApi";

export interface AdminBusinessSettings {
  id: number;
  businessName: string | null;
  officePhone: string | null;
  supportEmail: string | null;
  businessAddress: string | null;
  serviceArea: string | null;
  logoUrl: string | null;
  landingHeroImageUrl: string | null;
}

export interface PublicSiteSettings {
  businessName: string | null;
  officePhone: string | null;
  supportEmail: string | null;
  businessAddress: string | null;
  serviceArea: string | null;
  logoUrl: string | null;
  landingHeroImageUrl: string | null;
}

export const adminSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicSettings: builder.query<PublicSiteSettings, void>({
      query: () => ({ url: "/public/settings", method: "GET" }),
      providesTags: ["AdminSettings"],
    }),
    getAdminSettings: builder.query<AdminBusinessSettings, void>({
      query: () => ({ url: "/admin/settings", method: "GET" }),
      providesTags: ["AdminSettings"],
    }),
    updateAdminSettings: builder.mutation<
      AdminBusinessSettings,
      {
        businessName?: string;
        officePhone?: string;
        supportEmail?: string;
        businessAddress?: string;
        serviceArea?: string;
        logo?: File | null;
      }
    >({
      query: (data) => {
        const formData = new FormData();
        if (data.businessName) formData.append("businessName", data.businessName);
        if (data.officePhone) formData.append("officePhone", data.officePhone);
        if (data.supportEmail) formData.append("supportEmail", data.supportEmail);
        if (data.businessAddress)
          formData.append("businessAddress", data.businessAddress);
        if (data.serviceArea) formData.append("serviceArea", data.serviceArea);
        if (data.logo) formData.append("logo", data.logo);
        return {
          url: "/admin/settings",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["AdminSettings"],
    }),
    uploadLandingHero: builder.mutation<AdminBusinessSettings, File>({
      query: (hero) => {
        const formData = new FormData();
        formData.append("hero", hero);
        return {
          url: "/admin/settings/hero",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["AdminSettings"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPublicSettingsQuery,
  useGetAdminSettingsQuery,
  useUpdateAdminSettingsMutation,
  useUploadLandingHeroMutation,
} = adminSettingsApi;
