import { Timestamp } from 'firebase/firestore/lite'

export type ArtistTypes = {
  artist_active?: boolean
  artist_id?: string
  bio?: string
  geohash?: string
  city_name?: string
  country?: string
  country_code?: string
  province?: string
  phone?: string // remove after migration
  mobile?: MobileInfo
  contact_way?: string
  created_at?: Timestamp
  updated_at?: Timestamp
  displayName?: string
  formatted_address?: string
  place_id?: string
  username?: string
  profile_picture?: ProfilePicture
  uid?: string
  studio_id?: string
  studios?: []
  styles?: []
  times?: string
  twitter?: string
  facebook?: string
  instagram?: string
  telegram_user?: string
  work_as?: string
  _geoloc?: AlgoliaGeolocation
  _geoloc_marker?: AlgoliaGeolocation
  available_label?: string
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

type AlgoliaGeolocation = {
  lat: number
  lng: number
}
type MobileInfo = {
  value: string
  country_code: string
}

type DataLocation = {
  city_name: string
  formatted_address: string
  geohash: string
  place_id: string
  _geoloc: AlgoliaGeolocation
}
