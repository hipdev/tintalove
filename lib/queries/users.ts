import { User } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp,
  DocumentSnapshot,
  updateDoc,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import { UserState } from 'types/user'

const db = getFirestore(firebaseApp)

export async function createUser(user: User) {
  const docRef = doc(collection(db, 'users'), user.uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log('Document data:', docSnap.data())
    return true
  } else {
    const userRef = doc(collection(db, 'users'), user.uid)
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      created_at: serverTimestamp(),
    })
    console.log('No such document!')
    return true
  }
}

export async function createPhoneUser(user: User) {
  const docRef = doc(collection(db, 'users'), user.uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log('Document data:', docSnap.data())
    return true
  } else {
    const userRef = doc(collection(db, 'users'), user.uid)
    await setDoc(userRef, {
      phoneNumber: user.phoneNumber,
      created_at: serverTimestamp(),
    })
    console.log('No such document!')
    return true
  }
}

export async function getUserInfo(uid) {
  const docRef = doc(collection(db, 'users'), uid)
  const docSnap: DocumentSnapshot<UserState> = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log('Document data:', docSnap.data())
    const data: UserState = { ...docSnap.data(), uid: docSnap.id }
    return { user: data }
  } else {
    return null
  }
}

export async function updateUserSearchCity(uid, data) {
  console.log(data, 'selected')
  const userRef = doc(collection(db, 'users'), uid)

  const dataForm = {
    searching_city: {
      city_name: data.city_name,
      city_id: data.id,
      geohash: data.geohash,
      province: data.province,
      _geoloc: data._geoloc || null,
    },
    updated_at: serverTimestamp(),
  }

  const docSnap = await getDoc(userRef)

  if (docSnap.exists()) {
    await updateDoc(userRef, dataForm)

    return true
  } else {
    throw new Error('No estas registrado como usuario')
  }
}
