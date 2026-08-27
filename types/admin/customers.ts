import type { AdminPaginatedResult, AdminPersonSummary } from "./common";

export interface AdminCustomerListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface AdminCustomerItem extends AdminPersonSummary {
  company: string | null;
  isActive: boolean;
  requestCount: number;
  orderCount: number;
  createdAt: string;
}

export type AdminCustomerPage = AdminPaginatedResult<AdminCustomerItem>;

export interface AdminCustomerAddress {
  id: string;
  line1: string;
  apartment: string | null;
  city: string;
  state: string;
  zipCode: string;
  isPrimary: boolean;
}

export interface AdminCustomerDetail extends AdminCustomerItem {
  avatarUrl: string | null;
  notificationEmail: boolean;
  notificationPush: boolean;
  addresses: AdminCustomerAddress[];
}

export interface AdminUpdateCustomerBody {
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  isActive?: boolean;
  notificationEmail?: boolean;
  notificationPush?: boolean;
}
