import { Timestamp } from 'firebase/firestore/lite'
import { ArtistTypes } from './artist'
import { StudioTypes } from './studio'

export type PostTypes = {
  artists: ArtistTypes
  studios: StudioTypes
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
  photo_info: ProfilePicture
  picture_size: PictureSize | string // eliminar luego de migración
  photo_size: PictureSize | string
  styles: []
  username: string
  _geoloc: LatLng
  geohash: string
  is_partner: boolean
  studio_id: string
} | null

type ProfilePicture = {
  fileId: string
  filePath: string
  name: string
  size: number
  thumbnailUrl: string
  url: string
}

type ProfilePicture2 = {
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
