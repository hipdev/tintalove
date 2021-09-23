import { Timestamp } from 'firebase/firestore/lite'

export type ArtistTypes = {
  artist_id?: string
  availability_id: number
  bio?: string
  cities: City
  artists_places: Place
  country?: string
  country_code?: string
  mobile?: MobileInfo
  contact_way?: string
  created_at?: Timestamp
  updated_at?: Timestamp
  name?: string
  formatted_address?: string
  place_id?: string
  username?: string
  artists_main_photos?: ProfilePicture // table
  id?: string
  studio_id?: string
  studios?: []
  styles?: []
  times?: string
  twitter?: string
  facebook?: string
  instagram?: string
  telegram_user?: string
  work_as?: string
  own_studio_marker: [number, number]
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

type City = {
  city_name: string
  province: string
  formatted_address: string
  city_place_id: string
  coords: any
  city_lat: number
  city_lng: number
}
type Place = {
  id: string
  formatted_address: string
  place_id: string
  coords: any
  lat: number
  lng: number
}
