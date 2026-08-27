import type { Order } from "@/types/commerce";

export const demoOrders: Order[] = [
  {
    id: "AP-90422",

    items: [
      {
        id: "101",
        slug: "elite-500-performance",
        name: "Aura Flow X1 Series",
        subtitle: "High-Efficiency Central System • Multi-Surface Kit",
        image: "/images/products/elite-500.png",
        price: 299,
        quantity: 1,
      },
    ],

    shippingAddress: {
      name: "Alex Sterling",
      email: "alex.s@wellness.com",
      phone: "+1 (555) 234-8910",
      address: "128 Pristine Way",
      city: "Clean Valley",
      state: "CA",
      zipCode: "90210",
      country: "United States",
    },

    subtotal: 299,
    shipping: 15,
    tax: 10.5,
    total: 324.5,

    status: "processing",

    payment: {
      status: "paid",
      method: "card",
      last4: "4242",
    },

    trackingNumber: "1Z999AA1012345678",

    createdAt: "2026-04-24T09:12:00.000Z",
    estimatedDelivery: "2026-04-30T00:00:00.000Z",

    statusHistory: {
      placed: "2026-04-24T09:12:00.000Z",
      paid: "2026-04-24T09:45:00.000Z",
      processing: "2026-04-24T10:45:00.000Z",
    },
  },

  {
    id: "AP-90311",

    items: [
      {
        id: "102",
        slug: "elite-500-performance",
        name: "Aura Flow X1 Series",
        subtitle: "High-Efficiency Central System • Multi-Surface Kit",
        image: "/images/products/elite-500.png",
        price: 299,
        quantity: 1,
      },
    ],

    shippingAddress: {
      name: "Alex Sterling",
      email: "alex.s@wellness.com",
      phone: "+1 (555) 234-8910",
      address: "4820 Laurel Canyon Blvd",
      apartment: "Suite 102",
      city: "Valley Village",
      state: "CA",
      zipCode: "91607",
      country: "United States",
    },

    subtotal: 299,
    shipping: 0,
    tax: 23.92,
    total: 322.92,

    status: "pending",

    payment: {
      status: "paid",
      method: "card",
      last4: "8910",
    },

    createdAt: "2026-04-24T08:30:00.000Z",
    estimatedDelivery: "2026-05-01T00:00:00.000Z",

    statusHistory: {
      placed: "2026-04-24T08:30:00.000Z",
      paid: "2026-04-24T08:35:00.000Z",
    },
  },

  {
    id: "AP-88410",

    items: [
      {
        id: "103",
        slug: "elite-500-performance",
        name: "Aura Flow X1 Series",
        subtitle: "High-Efficiency Central System • Multi-Surface Kit",
        image: "/images/products/elite-500.png",
        price: 299,
        quantity: 1,
      },
    ],

    shippingAddress: {
      name: "Alex Sterling",
      email: "alex.s@wellness.com",
      phone: "+1 (555) 234-8910",
      address: "128 Pristine Way",
      city: "Clean Valley",
      state: "CA",
      zipCode: "90210",
      country: "United States",
    },

    subtotal: 299,
    shipping: 15,
    tax: 10.5,
    total: 324.5,

    status: "delivered",

    payment: {
      status: "paid",
      method: "card",
      last4: "4242",
    },

    trackingNumber: "1Z999AA1012345678",

    createdAt: "2026-04-26T09:12:00.000Z",
    estimatedDelivery: "2026-04-29T00:00:00.000Z",

    statusHistory: {
      placed: "2026-04-26T09:12:00.000Z",
      paid: "2026-04-26T09:45:00.000Z",
      processing: "2026-04-26T10:45:00.000Z",
      shipped: "2026-04-27T09:45:00.000Z",
      delivered: "2026-04-29T09:45:00.000Z",
    },
  },
];
