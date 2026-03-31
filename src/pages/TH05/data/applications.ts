import { Application } from "../types/application";

export const mockApplications: Application[] = [
  {
    id: 1,
    name: "Le Minh",
    email: "leminh@gmail.com",
    phone: "0123456789",
    gender: "Male",
    address: "Ha Noi",
    skills: "Guitar",
    clubId: 1,
    reason: "I love music",
    status: "Pending"
  },
  {
    id: 2,
    name: "Pham Lan",
    email: "phamlan@gmail.com",
    phone: "0987654321",
    gender: "Female",
    address: "Hai Phong",
    skills: "Football",
    clubId: 2,
    reason: "Want to improve skills",
    status: "Approved"
  }
];

export default mockApplications;