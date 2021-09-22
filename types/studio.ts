import { Timestamp } from 'firebase/firestore/lite'

export type StudioTypes = {
  artists?: [any]
  bio?: string
  geohash?: string //remove after migration
  city_name?: string //remove after migration
  studios_main_photos: ProfilePicture
  country?: string //remove after migration
  province?: string //remove after migration
  phone?: string
  contact_way?: string
  created_at?: Timestamp
  updated_at?: Timestamp
  studio_name?: string //remove after migration
  name: string
  formatted_address?: string
  place_id?: string
  username?: string
  profile_picture?: ProfilePicture //remove after migration
  uid?: string //remove after migration
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
  dataLocation?: DataLocation //remove after migration
  _geoloc?: AlgoliaGeolocation //remove after migration
  _geoloc_marker?: AlgoliaGeolocation //remove after migration
} | null

type ProfilePicture = {
  file_id: string
  file_path: string
  name: string
  size: number
  thumbnail_url: string
  url: string
}

type DataLocation = {
  city_name: string
  formatted_address: string
  geohash: string
  place_id: string
  _geoloc: AlgoliaGeolocation
}

type AlgoliaGeolocation = {
  lat: number
  lng: number
}

type Place = {
  id: string
  formatted_address: string
  place_id: string
  coords: any
  lat: number
  lng: number
}
