export type DestinationType = "beach" | "mountain" | "city"

export interface Destination {
  id: number
  name: string
  location: string
  type: DestinationType
  price: number
  rating: number
  image: string

  visitDuration: number

  costFood: number
  costHotel: number
  costTransport: number
}