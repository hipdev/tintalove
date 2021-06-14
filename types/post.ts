import { Timestamp } from 'firebase/firestore/lite'

export type PostTypes = {
  id: string
  artist_id: string
  is_active: boolean
  artist_picture: string
  city_name: string
  country: string
  counter_comments: number
  counter_listed: number
  created_at: Timestamp
  description: string
  displayName: string
  image: ProfilePicture
  picture_size: PictureSize | string
  styles: []
  username: string
  _geoloc: LatLng
  geohash: string
} | null

type ProfilePicture = {
  fileId: string
  filePath: string
  name: string
  size: number
  thumbnailUrl: string
  url: string
}

type LatLng = {
  lat: string
  lng: string
}

enum PictureSize {
  'portrait',
  'landscape',
  'square',
}
