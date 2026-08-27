export interface Technician {
  id: string;
  initials: string;
  name: string;
  role: string;
  certifications: string;
  rating: string;
  phone: string;
  email: string;
  jobsToday: number;
  jobsInProgress: number;
  status: "On service call" | "Available" | "Off duty";
  statusType: "warning" | "success" | "neutral";
}

export interface ReportAwaitingReview {
  id: string;
  initials: string;
  name: string;
  role: string;
  reportStatus: string;
}

export const TECHNICIANS_LIST: Technician[] = [
  {
    id: "tech-1",
    initials: "MA",
    name: "Marc Anderson",
    role: "Field Technician",
    certifications: "CVAC Level 2, HRAI",
    rating: "4.9",
    phone: "(514) 555-0119",
    email: "marc@centralcare.com",
    jobsToday: 3,
    jobsInProgress: 1,
    status: "On service call",
    statusType: "warning",
  },
  {
    id: "tech-2",
    initials: "MA",
    name: "Marc Anderson",
    role: "Field Technician",
    certifications: "CVAC Level 2, HRAI",
    rating: "4.9",
    phone: "(514) 555-0119",
    email: "marc@centralcare.com",
    jobsToday: 3,
    jobsInProgress: 1,
    status: "On service call",
    statusType: "warning",
  },
  {
    id: "tech-3",
    initials: "MA",
    name: "Marc Anderson",
    role: "Field Technician",
    certifications: "CVAC Level 2, HRAI",
    rating: "4.9",
    phone: "(514) 555-0119",
    email: "marc@centralcare.com",
    jobsToday: 3,
    jobsInProgress: 1,
    status: "On service call",
    statusType: "warning",
  },
];

export const AWAITING_REPORTS: ReportAwaitingReview[] = [
  {
    id: "rep-1",
    initials: "MA",
    name: "Marc Anderson",
    role: "Field Technician",
    reportStatus: "Report submitted",
  },
];
