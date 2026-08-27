/* =========================
   Role
========================= */

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

/* =========================
   Address
========================= */

export interface CustomerAddress {
  id: string;
  userId: string;

  line1: string;
  apartment: string | null;

  city: string;
  state: string;
  zipCode: string;
  country: string;

  latitude: number | null;
  longitude: number | null;

  isPrimary: boolean;
}

export interface CreateAddressRequest {
  line1: string;
  apartment?: string;

  city: string;
  state: string;
  zipCode: string;
  country: string;

  latitude?: number | null;
  longitude?: number | null;

  isPrimary?: boolean;
}

export type UpdateAddressRequest = Partial<CreateAddressRequest>;

/* =========================
   Customer Profile
========================= */

export interface CustomerProfile {
  id: string;

  role: UserRole;

  email: string;

  firstName: string;
  lastName: string;

  phone: string | null;
  avatarUrl: string | null;

  company: string | null;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;

  termsAcceptedAt: string | null;
  termsVersion: string | null;

  onboardingCompletedAt: string | null;

  notificationEmail: boolean;
  notificationPush: boolean;

  addresses: CustomerAddress[];

  technician: unknown | null;
}

/* =========================
   Update Profile
========================= */

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;

  avatar?: File | null;
}

/*
 PATCH /users/me does not return
 addresses in your example response.
*/

export interface UpdateProfileResponse {
  id: string;

  role: UserRole;

  email: string;

  firstName: string;
  lastName: string;

  phone: string | null;
  avatarUrl: string | null;

  company: string | null;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;

  termsAcceptedAt: string | null;
  termsVersion: string | null;

  onboardingCompletedAt: string | null;

  notificationEmail: boolean;
  notificationPush: boolean;
}

/* =========================
   Payment
========================= */

export type PaymentPurpose = "ORDER" | "SERVICE" | "QUOTATION" | string;

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED" | string;

export interface ServiceRequest {
  id: string;
  requestNumber: string;

  customerId: string;
  technicianId: string | null;

  categoryId: string;
  issueId: string | null;

  addressId: string;

  description: string;

  preferredDate: string | null;
  preferredTime: string | null;

  status: string;

  scheduledStart: string | null;
  scheduledEnd: string | null;

  startedAt: string | null;
  completedAt: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface PaymentQuotation {
  id: string;

  quoteNumber: string;
  requestId: string;

  laborAmount: number;
  partsAmount: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;

  notes: string | null;

  validUntil: string | null;

  status: string;

  acceptedAt: string | null;

  paymentReference: string | null;

  request: ServiceRequest;
}

export interface CustomerPayment {
  id: string;

  userId: string;

  quotationId: string | null;
  orderId: string | null;

  purpose: PaymentPurpose;

  provider: string;

  providerReference: string | null;

  currency: string;

  stripeCheckoutSessionId: string | null;
  stripePaymentIntentId: string | null;

  amount: number;

  status: PaymentStatus;

  createdAt: string;
  updatedAt: string;

  quotation: PaymentQuotation | null;
  order: { id: string; orderNumber: string } | null;
}

/* =========================
   Common
========================= */

export interface SuccessResponse {
  success: boolean;
}
