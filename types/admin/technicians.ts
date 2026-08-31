import type { AdminPaginatedResult, AdminPersonSummary } from "./common";

export type TechnicianVerificationStatus =
  | "PENDING_VERIFICATION"
  | "VERIFIED"
  | "REJECTED";

export interface AdminTechnicianListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  verificationStatus?: TechnicianVerificationStatus;
  isAvailable?: boolean;
  timezone?: string;
}

export interface AdminTechnicianItem extends AdminPersonSummary {
  profileId: string;
  employeeId: string | null;
  serviceArea: string;
  skills: string[];
  rating: number;
  isAvailable: boolean;
  verificationStatus: TechnicianVerificationStatus;
  isActive: boolean;
  jobsToday: number;
  jobsInProgress: number;
  reportsAwaitingReview: number;
}

export type AdminTechnicianPage = AdminPaginatedResult<AdminTechnicianItem>;

export interface AdminTechnicianDetail extends AdminTechnicianItem {
  licenseNumber: string | null;
  yearsExperience: number | null;
  bio: string | null;
  verificationNotes: string | null;
  verifiedAt: string | null;
  createdAt: string;
}

export interface AdminUpdateTechnicianBody {
  firstName?: string;
  lastName?: string;
  phone?: string;
  isActive?: boolean;
  serviceArea?: string;
  skills?: string[];
  licenseNumber?: string;
  yearsExperience?: number;
  bio?: string;
  isAvailable?: boolean;
}

export interface AdminVerifyTechnicianBody {
  status: TechnicianVerificationStatus;
  verificationNotes?: string;
}
