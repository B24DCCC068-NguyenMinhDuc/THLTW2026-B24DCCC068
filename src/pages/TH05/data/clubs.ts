import { Club } from "../types/club";

export const mockClubs: Club[] = [
  {
    id: 1,
    name: "Music Club",
    avatar: "https://via.placeholder.com/40",
    foundedDate: "2020-01-10",
    description: "<p>Club for music lovers</p>",
    president: "Nguyen Van A",
    isActive: true
  },
  {
    id: 2,
    name: "Football Club",
    avatar: "https://via.placeholder.com/40",
    foundedDate: "2019-03-20",
    description: "<p>Football training and competitions</p>",
    president: "Tran Van B",
    isActive: false
  }
];

export default mockClubs;