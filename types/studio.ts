import { Timestamp } from 'firebase/firestore/lite'

export type StudioTypes = {
  artists?: [any]
  bio?: string
  studios_main_photos: ProfilePicture
  phone?: string
  contact_way?: string
  created_at?: Timestamp
  updated_at?: Timestamp
  name: string
  formatted_address?: string
  place_id?: string
  username?: string
  id?: string
  studio_id?: string
  is_active?: boolean
  styles?: []
  times?: string
  twitter?: string
  facebook?: string
  instagram?: string
  telegram_user?: string
  work_as?: string
  studios_places: Place
  main_address_marker: [number, number]
} | null

type ProfilePicture = {
  file_id: string
  file_path: string
  name: string
  size: number
  thumbnail_url: string
  url: string
}

type Place = {
  id: string
  formatted_address: string
  place_id: string
  coords: any
  lat: number
  lng: number
}
