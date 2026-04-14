import { Destination } from "../types/destination"

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Ha Long Bay",
    location: "Quang Ninh",
    type: "beach",
    price: 150,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592",

    visitDuration: 6,

    costFood: 30,
    costHotel: 60,
    costTransport: 40
  },
  {
    id: 2,
    name: "Sapa",
    location: "Lao Cai",
    type: "mountain",
    price: 120,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",

    visitDuration: 8,

    costFood: 25,
    costHotel: 50,
    costTransport: 45
  },
  {
    id: 3,
    name: "Da Nang",
    location: "Da Nang",
    type: "city",
    price: 140,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b",

    visitDuration: 5,

    costFood: 28,
    costHotel: 55,
    costTransport: 35
  },
  {
    id: 4,
    name: "Phu Quoc",
    location: "Kien Giang",
    type: "beach",
    price: 180,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",

    visitDuration: 6,

    costFood: 35,
    costHotel: 70,
    costTransport: 50
  }
]