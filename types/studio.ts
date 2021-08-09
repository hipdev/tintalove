import { Timestamp } from 'firebase/firestore/lite'

export type StudioTypes = {
  artists?: [any]
  bio?: string
  geohash?: string
  city_name?: string
  country?: string
  province?: string
  phone?: string
  contact_way?: string
  created_at?: Timestamp
  updated_at?: Timestamp
  studio_name?: string
  formatted_address?: string
  place_id?: string
  username?: string
  profile_picture?: ProfilePicture
  uid?: string
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
  dataLocation?: DataLocation
} | null

type ProfilePicture = {
  fileId: string
  filePath: string
  name: string
  size: number
  thumbnailUrl: string
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
