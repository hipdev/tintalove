import { User } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import firebaseApp from 'lib/firebase'
import toast, { Toaster } from 'react-hot-toast'

const db = getFirestore(firebaseApp)

export async function createUser(user: User) {
  const docRef = doc(collection(db, 'users'), user.uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data())
  } else {
    const userRef = doc(collection(db, 'users'), user.uid)
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      created_at: serverTimestamp(),
    })
    console.log('No such document!')
  }
}

export async function userNameAvailable(username) {
  const usernameRef = doc(db, `usernames/${username}`)
  const queryRef = await getDoc(usernameRef)

  if (queryRef.exists()) {
    return false
  } else {
    return true
  }
}

export async function getUserInfo(uid) {
  const docRef = doc(collection(db, 'users'), uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data())
    return docSnap.data()
  } else {
    throw new Error('El usuario no existe')
  }
}

export async function createArtist(uid, data) {
  const usernameRef = doc(collection(db, 'usernames'), data.username)
  const artistRef = doc(collection(db, 'artists'), uid)

  const userRef = doc(collection(db, 'users'), uid)

  const usernameSnap = await getDoc(usernameRef)
  const docSnap = await getDoc(artistRef)

  if (usernameSnap.exists()) {
    throw new Error('El nombre de usuario ya existe')
  }

  if (docSnap.exists()) {
    throw new Error('Ya estas registrado como artista')
  } else {
    const batch = writeBatch(db)

    batch.set(usernameRef, {
      uid,
    })

    batch.set(artistRef, {
      created_at: serverTimestamp(),
      step_one: true,
      ...data,
    })

    batch.set(
      userRef,
      {
        displayName: data.displayName,
        is_artist: true,
        updated_at: serverTimestamp(),
      },
      { merge: true }
    )

    await batch.commit()
    return true
  }
}
