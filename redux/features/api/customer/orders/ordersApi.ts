import baseApi from "../../baseApi";
import type {
  CustomerOrder,
  CustomerOrderListQuery,
  CustomerOrderPage,
} from "@/types/customer/orders";

export const customerOrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query<CustomerOrderPage, CustomerOrderListQuery | void>(
      {
        query: (params) => ({
          url: "/orders",
          method: "GET",
          params: params ?? undefined,
        }),
        providesTags: ["Orders"],
      },
    ),

    getMyOrder: builder.query<CustomerOrder, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Orders", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMyOrdersQuery, useGetMyOrderQuery } = customerOrdersApi;
