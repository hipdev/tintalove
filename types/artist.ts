import { Timestamp } from 'firebase/firestore/lite'

export type ArtistTypes = {
  bio: string
  geohash: string
  city_name: string
  country: string
  country_code: string
  province: string
  phone: string
  contact_way: string
  created_at: Timestamp
  updated_at: Timestamp
  displayName: string
  formatted_address: string
  place_id: string
  username: string
  profile_picture: ProfilePicture
  uid: string
  studio_id: string
  styles: []
  times: string
  twitter: string
  facebook: string
  instagram: string
  telegram_user: string
  work_as: string
  _geoloc: AlgoliaGeolocation
  available_label: string
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
