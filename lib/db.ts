import { User } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'

export const db = getFirestore(firebaseApp)

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
    // console.log('Document data:', docSnap.data())
    return docSnap.data()
  } else {
    return null
  }
}

export async function getArtistInfo(uid) {
  const docRef = doc(collection(db, 'artists'), uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { artist: docSnap.data() }
  } else {
    return { artist: null }
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
        displayName: data.displayName.trim(),
        is_artist: true,
        username: data.username,
        updated_at: serverTimestamp(),
      },
      { merge: true }
    )

    await batch.commit()

    return true
  }
}

export async function updateArtistMainInfo(uid, data) {
  const artistRef = doc(collection(db, 'artists'), uid)

  const userRef = doc(collection(db, 'users'), uid)

  const docSnap = await getDoc(artistRef)

  if (docSnap.exists()) {
    const batch = writeBatch(db)

    batch.set(
      artistRef,
      {
        updated_at: serverTimestamp(),
        ...data,
      },
      { merge: true }
    )

    batch.set(
      userRef,
      {
        displayName: data.displayName.trim(),
        updated_at: serverTimestamp(),
      },
      { merge: true }
    )

    await batch.commit()

    return true
  } else {
    throw new Error('No estas registrado como artista')
  }
}

export async function updateArtistWorkingInfo(uid, data) {
  const artistRef = doc(collection(db, 'artists'), uid)

  const styles = data.styles.map((style) => style.value)

  const dataForm = {
    times: data.times,
    work_as: data.work_as,
    styles,
    step_two: true,
    updated_at: serverTimestamp(),
  }

  const docSnap = await getDoc(artistRef)

  if (docSnap.exists()) {
    await updateDoc(artistRef, dataForm)

    return true
  } else {
    throw new Error('No estas registrado como artista')
  }
}

export async function updateArtistContactInfo(uid, data) {
  const artistRef = doc(collection(db, 'artists'), uid)

  const dataForm = {
    ...data,
    updated_at: serverTimestamp(),
    step_three: true,
  }

  const docSnap = await getDoc(artistRef)

  if (docSnap.exists()) {
    await updateDoc(artistRef, dataForm)

    return true
  } else {
    throw new Error('No estas registrado como artista')
  }
}

export async function updateArtistUsername(uid, oldUsername, newUsername) {
  const usernameRefOld = doc(collection(db, 'usernames'), oldUsername)
  const usernameRefNew = doc(collection(db, 'usernames'), newUsername)
  const artistRef = doc(collection(db, 'artists'), uid)

  const userRef = doc(collection(db, 'users'), uid)

  const usernameSnap = await getDoc(usernameRefNew)
  const userSnap = await getDoc(userRef)
  const docSnap = await getDoc(artistRef)

  if (usernameSnap.exists()) {
    throw new Error('El nombre de usuario ya existe')
  }

  if (!userSnap.exists()) {
    throw new Error('Este usuario no existe')
  }

  const batch = writeBatch(db)

  batch.delete(usernameRefOld)

  batch.set(usernameRefNew, {
    uid,
  })

  batch.set(
    artistRef,
    {
      updated_at: serverTimestamp(),
      username: newUsername,
    },
    { merge: true }
  )

  batch.set(
    userRef,
    {
      username: newUsername,
      updated_at: serverTimestamp(),
    },
    { merge: true }
  )

  await batch.commit()

  return true
}
<<<<<<< HEAD

/*export async function createDocument(document) {
  const docRef = doc(collection(db, 'editortext'), document)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data())
    return true
  } else {
    console.log('No such document!')
    return true
  }
}*/
=======
>>>>>>> 2b1c0975815a14f0da25e7ebb5d2e53705e33fb3
