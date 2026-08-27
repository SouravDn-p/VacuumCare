import baseApi from "../../baseApi";
import type {
  CheckoutLineItem,
  CheckoutPreview,
  CheckoutSession,
} from "@/types/customer/cart";

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    previewCheckout: builder.mutation<
      CheckoutPreview,
      { items?: CheckoutLineItem[]; shippingAddressId?: string }
    >({
      query: (body) => ({
        url: "/checkout/preview",
        method: "POST",
        body,
      }),
    }),

    checkoutCart: builder.mutation<
      CheckoutSession,
      { shippingAddressId: string; idempotencyKey?: string }
    >({
      query: (body) => ({
        url: "/checkout/cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart", "Orders", "Payments"],
    }),

    checkoutOrder: builder.mutation<
      CheckoutSession,
      {
        items: CheckoutLineItem[];
        shippingAddressId: string;
        idempotencyKey?: string;
      }
    >({
      query: (body) => ({
        url: "/checkout/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders", "Payments"],
    }),
  }),
  overrideExisting: false,
});

export const {
  usePreviewCheckoutMutation,
  useCheckoutCartMutation,
  useCheckoutOrderMutation,
} = checkoutApi;
