export type UserState = {
  artist_active: boolean
  studio_active: boolean
  displayName: string // remove after migration
  full_name: string
  phoneNumber: string
  email: string
  username: string
  has_studio: boolean
  is_admin: boolean
  is_artist: boolean
  photoUrl: string // remove after migration
  photo_url: string
  photo_info: ProfilePicture
  uid: string // remove after migration
  id: string
  studio_id: string
  searching_city: City
} | null

type City = {
  city_hash: string
  city_name: string
  province: string
}

type ProfilePicture = {
  fileId: string
  filePath: string
  name: string
  size: number
  thumbnailUrl: string
  url: string
}
