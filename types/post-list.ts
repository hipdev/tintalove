import { Timestamp } from 'firebase/firestore/lite'

export type PostList = {
  id: string
  user_id: string
  list_id: string
  post_id: string
  post_artist_id: string
  post_image: string
  created_at: Timestamp
  updated_at: Timestamp
  post_description: string
  post_artist_name: string
  post_picture_size: PictureSize
  post_styles: []
  username: string
} | null

enum PictureSize {
  'portrait',
  'landscape',
  'square',
}
