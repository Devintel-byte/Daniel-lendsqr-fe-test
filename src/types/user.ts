export type UserStatus = "Active" | "Inactive" | "Pending" | "Blacklisted";

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;

  // Personal Information
  fullName: string;
  bvn: string;
  gender: "Male" | "Female";
  maritalStatus: string;
  children: string;
  typeOfResidence: string;

  // Education and Employment
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;

  // Socials
  twitter: string;
  facebook: string;
  instagram: string;

  // Guarantor
  guarantors: Array<{
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    relationship: string;
  }>;

  // Financial
  accountBalance: string;
  accountNumber: string;
  bankName: string;

  // Tier
  tier: number;
}

export interface UserFilters {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: UserStatus;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  recordsPerPage: number;
}
