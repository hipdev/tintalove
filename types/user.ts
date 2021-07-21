import { DocumentData } from 'firebase/firestore/lite'

export type UserState =
  | {
      artist_active: boolean
      studio_active: boolean
      displayName: string
      phoneNumber: string
      email: string
      username: string
      has_studio: boolean
      is_admin: boolean
      is_artist: boolean
      photoUrl: string
      uid: string
      studio_id: string
      searching_city: City
    }
  | null
  | DocumentData

type City = {
  city_hash: string
  city_name: string
  province: string
}
