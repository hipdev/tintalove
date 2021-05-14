import { Timestamp } from '@firebase/firestore/dist/lite'

export type PostTypes = {
  id: string
  artist_id: string
  artist_picture: string
  city_name: string
  country: string
  counter_comments: number
  created_at: Timestamp
  description: string
  displayName: string
  image: ProfilePicture
  pictureSize: PictureSize
  styles: []
  username: string
} | null

type ProfilePicture = {
  fileId: string
  filePath: string
  name: string
  size: number
  thumbnailUrl: string
  url: string
}

enum PictureSize {
  'portrait',
  'landscape',
  'square',
}
