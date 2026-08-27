export type ProductTab = "All products" | "Active" | "Inactive" | "Categories";

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  taxable: "Yes" | "No";
  status: "Active" | "Deactive";
}

export const PRODUCT_TABS: ProductTab[] = [
  "All products",
  "Active",
  "Inactive",
  "Categories",
];

export const PRODUCTS_LIST: ProductItem[] = [
  {
    id: "prod-1",
    name: "Retractable Hose System",
    sku: "RHS-001",
    category: "Hoses & Accessories",
    price: "$349.00",
    taxable: "Yes",
    status: "Active",
  },
  {
    id: "prod-2",
    name: "Retractable Hose System",
    sku: "RHS-001",
    category: "Hoses & Accessories",
    price: "$349.00",
    taxable: "Yes",
    status: "Active",
  },
  {
    id: "prod-3",
    name: "Retractable Hose System",
    sku: "RHS-001",
    category: "Hoses & Accessories",
    price: "$349.00",
    taxable: "Yes",
    status: "Active",
  },
  {
    id: "prod-4",
    name: "Retractable Hose System",
    sku: "RHS-001",
    category: "Hoses & Accessories",
    price: "$349.00",
    taxable: "Yes",
    status: "Deactive",
  },
];

export const CATEGORIES_LIST: string[] = [
  "Hoses & Accessories",
  "Filters",
  "Inlet Valves",
  "Powerheads",
  "Parts",
  "Accessories",
  "Units",
];
