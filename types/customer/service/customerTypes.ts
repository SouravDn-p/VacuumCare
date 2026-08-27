export type ServiceRequestStatus =
  | "NEW"
  | "UNDER_REVIEW"
  | "QUOTE_SENT"
  | "ACCEPTED"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "REPORT_SUBMITTED"
  | "COMPLETED"
  | "CANCELLED";

export type QuotationStatus =
  | "SENT"
  | "VIEWED"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELLED";

export type CounterofferStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export type ServiceMediaKind =
  | "ISSUE"
  | "BEFORE"
  | "AFTER"
  | "OTHER";

export interface ServiceIssue {
  id: string;
  name: string;
}

export interface ServiceCategory {
  id: string;
  name: string; 
  description: string | null;
  issues: ServiceIssue[];
}

export interface ServiceRequestMedia {
  id: string;
  kind: ServiceMediaKind;
  url: string;
  mimeType: string;
}

export interface ServiceRequestStatusHistory {
  status: ServiceRequestStatus;
  note: string | null;
  createdAt: string;
}

export interface CounterofferStatusHistory {
  status: CounterofferStatus;
  actorId: string | null;
  note: string | null;
  createdAt: string;
}

export interface QuoteCounteroffer {
  id: string;
  quotationId: string;
  customerId: string;

  requestedTotal: number;
  note: string | null;

  status: CounterofferStatus;

  decidedById: string | null;
  decisionNote: string | null;
  decidedAt: string | null;

  supersededAt: string | null;

  createdAt: string;

  statusHistory?: CounterofferStatusHistory[];
}

export interface ServiceQuotation {
  id: string;
  quoteNumber: string;

  laborAmount: number;
  partsAmount: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;

  negotiatedTotal: number | null;

  notes: string | null;

  validUntil: string;

  status: QuotationStatus;

  acceptedAt: string | null;
  viewedAt?: string | null;

  counteroffers?: QuoteCounteroffer[];
  payments?: ServicePayment[];
}

export interface ServiceReport {
  id: string;

  repairStatus: string;
  workPerformed: string;
  technicianNotes: string | null;

  followUpRequired: boolean;

  submittedAt: string;
  customerConfirmedAt: string | null;
}

export interface ServiceRequestCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ServiceRequestAddress {
  id: string;

  line1: string;
  apartment: string | null;

  city: string;
  state: string;
  zipCode: string;
  country: string;

  isPrimary: boolean;
}

export interface ServiceRequestTechnicianProfile {
  skills?: string[];
  bio?: string | null;
  yearsExperience?: number | null;
  serviceArea?: string | null;
}

export interface ServiceRequestTechnician {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  avatarUrl?: string | null;
  technician?: ServiceRequestTechnicianProfile | null;
}

export interface CustomerServiceRequest {
  id: string;
  requestNumber: string;

  customerId: string;
  technicianId: string | null;

  categoryId: string;
  issueId: string | null;

  addressId: string;

  description: string;

  status: ServiceRequestStatus;

  preferredDate: string | null;
  preferredTime: string | null;

  scheduledStart: string | null;
  scheduledEnd: string | null;

  cancellationReason: string | null;

  media: ServiceRequestMedia[];

  quotation: ServiceQuotation | null;
  report: ServiceReport | null;

  equipment: unknown[];

  statusHistory: ServiceRequestStatusHistory[];

  customer?: ServiceRequestCustomer;
  technician?: ServiceRequestTechnician | null;
  category?: ServiceCategory;
  issue?: ServiceIssue | null;
  address?: ServiceRequestAddress;
}

export interface CreateServiceRequestRequest {
  categoryId: string;
  issueId?: string;

  addressId: string;

  description: string;

  preferredDate?: string;
  preferredTime?: string;

  images?: File[];
  videos?: File[];
}

export interface AcceptQuotationRequest {
  acceptTerms: true;
  termsVersion: string;
}

export interface RejectQuotationRequest {
  reason?: string;
}

export interface CreateCounterofferRequest {
  requestedTotal: number;
  note?: string;
}

export interface CancelServiceRequestRequest {
  reason?: string;
}

export interface AddServiceMediaRequest {
  file: File;
}

export type ServicePaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "AUTHORIZED"
  | "CAPTURED"
  | "VOIDED"
  | "FAILED"
  | "SUCCEEDED"
  | "CANCELED"
  | "EXPIRED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED";

export interface PaymentAuthorizationResponse {
  paymentId: string;
  requestId: string;
  checkoutUrl: string | null;
  checkoutSessionId: string | null;
  amount: number;
  currency: string;
}

export interface ServicePayment {
  id: string;

  purpose: string;
  status: ServicePaymentStatus;

  amount: number;
  currency: string;

  stripeCheckoutSessionId?: string | null;
  stripePaymentIntentId?: string | null;
}

export interface CustomerNotification {
  id: string;
  userId?: string;
  title: string;
  body?: string;
  message?: string;
  data?: Record<string, unknown> | null;
  isRead?: boolean;
  readAt?: string | null;
  createdAt?: string;
}

export type NotificationResponseDto = CustomerNotification;

export interface ConversationCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
}

export interface ConversationLastMessage {
  id: string;
  body: string;
  createdAt: string;
  senderId: string;
}

export interface CustomerConversation {
  id: string;
  requestId: string | null;
  customerId: string;
  technicianId: string | null;
  updatedAt: string;
  lastMessage: ConversationLastMessage | null;
  customer?: ConversationCustomer;
}

export interface ConversationAttachment {
  url: string;
  mimeType?: string;
}

export interface CustomerConversationMessage {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  attachments?: ConversationAttachment[] | null;
  createdAt: string;
  sender?: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
}

export interface SendConversationMessageRequest {
  body?: string;
  images?: File[];
  videos?: File[];
}