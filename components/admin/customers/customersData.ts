export interface CustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  requests: string;
  orders: string;
  since: string;
}

export const CUSTOMERS_DATA: CustomerItem[] = [
  {
    id: "cust-1",
    name: "Sarah Thompson",
    email: "sarah.thompson@email.com",
    phone: "(514) 555-0188",
    requests: "04",
    orders: "03",
    since: "May 24",
  },
  {
    id: "cust-2",
    name: "Sarah Thompson",
    email: "sarah.thompson@email.com",
    phone: "(514) 555-0188",
    requests: "04",
    orders: "03",
    since: "May 24",
  },
  {
    id: "cust-3",
    name: "Sarah Thompson",
    email: "sarah.thompson@email.com",
    phone: "(514) 555-0188",
    requests: "04",
    orders: "03",
    since: "May 24",
  },
  {
    id: "cust-4",
    name: "Sarah Thompson",
    email: "sarah.thompson@email.com",
    phone: "(514) 555-0188",
    requests: "04",
    orders: "03",
    since: "May 24",
  },
];
