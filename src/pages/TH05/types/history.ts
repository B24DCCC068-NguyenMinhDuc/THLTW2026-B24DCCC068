export interface History {
  id: number;
  applicationId: number;
  action: "Approved" | "Rejected";
  admin: string;
  reason?: string;
  time: string;
}