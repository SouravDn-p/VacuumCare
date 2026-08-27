export interface InvoiceParty {
  name: string;
  addressLines: string[];
  email: string | null;
  logoUrl: string | null;
}

export interface InvoiceServiceOverview {
  serviceType: string;
  technician: string;
  serviceDate: string;
  duration: string;
}

export interface InvoiceLineItem {
  name: string;
  description: string | null;
  quantity: string;
  price: number;
}

export interface PaymentInvoice {
  paymentId: string;
  invoiceNumber: string;
  date: string;
  statusLabel: string;
  paymentStatus: string;
  purpose: "ORDER" | "QUOTATION" | string;
  currency: string;
  vendor: InvoiceParty;
  billTo: InvoiceParty;
  service: InvoiceServiceOverview | null;
  lineItems: InvoiceLineItem[];
  notes: string | null;
  subtotal: number;
  serviceCharges: number;
  tax: number;
  taxPercent: number;
  total: number;
}
