import baseApi from "../../baseApi";
import type { ServerCart } from "@/types/customer/cart";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<ServerCart, void>({
      query: () => ({ url: "/cart", method: "GET" }),
      providesTags: ["Cart"],
    }),

    addCartItem: builder.mutation<
      ServerCart,
      { productId: string; quantity: number }
    >({
      query: (body) => ({
        url: "/cart/items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation<
      ServerCart,
      { productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `/cart/items/${productId}`,
        method: "PATCH",
        body: { quantity },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(cartApi.util.upsertQueryData("getCart", undefined, data));
        } catch {
          dispatch(cartApi.util.invalidateTags(["Cart"]));
        }
      },
    }),

    removeCartItem: builder.mutation<ServerCart, string>({
      query: (productId) => ({
        url: `/cart/items/${productId}`,
        method: "DELETE",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(cartApi.util.upsertQueryData("getCart", undefined, data));
        } catch {
          dispatch(cartApi.util.invalidateTags(["Cart"]));
        }
      },
    }),

    clearCart: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi;
