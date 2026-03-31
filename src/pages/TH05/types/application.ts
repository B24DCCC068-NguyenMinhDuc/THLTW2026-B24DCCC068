export type ApplicationStatus = "Pending" | "Approved" | "Rejected";

export interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "Other";
  address: string;
  skills: string;
  clubId: number;
  reason: string;
  status: ApplicationStatus;
  note?: string;
}