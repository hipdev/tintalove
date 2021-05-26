import { DocumentData } from '@firebase/firestore'

export type UserState =
  | {
      artist_active: boolean
      studio_active: boolean
      displayName: string
      email: string
      username: string
      has_studio: boolean
      is_admin: boolean
      is_artist: boolean
      photoUrl: string
      uid: string
      studio_id: string
    }
  | null
  | DocumentData
