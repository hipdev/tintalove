import axios from 'axios'
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
  getDocs,
  QueryDocumentSnapshot,
  addDoc,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'

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

export async function userNameAvailable(username) {
  const usernameRef = doc(db, `usernames/${username}`)
  const queryRef = await getDoc(usernameRef)

  if (queryRef.exists()) {
    return false
  } else {
    return true
  }
}
export async function userNameAvailableStudio(username) {
  const usernameRef = doc(db, `usernames_studios/${username}`)
  const queryRef = await getDoc(usernameRef)

  if (queryRef.exists()) {
    return false
  } else {
    return true
  }
}

export async function getArtistIdByUsername(username) {
  const usernameRef = doc(db, `usernames/${username}`)
  const queryRef = await getDoc(usernameRef)

  if (queryRef.exists()) {
    return queryRef.data().uid
  } else {
    return false
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

export async function getUserNamesByArtists() {
  const querySnapshot = await getDocs(collection(db, 'usernames'))
  const usernames: any = []
  querySnapshot.forEach((doc: any) => usernames.push({ username: doc.id }))

  return usernames
}
export async function getArtistsInfo() {
  const querySnapshot = await getDocs(collection(db, 'artists'))
  const artists: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    // console.log('consultando artistas', doc.data())
    return artists.push({ ...doc.data() })
  })

  return { artists }
}

export async function createArtist(uid, data, wizard) {
  const usernameRef = doc(collection(db, 'usernames'), data.username)
  const artistRef = doc(collection(db, 'artists'), uid)
  const artistWizardRef = doc(collection(db, 'artists_wizard'), uid)

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

    if (wizard) {
      setDoc(artistWizardRef, { step_one: true }, { merge: true })
    }

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

export async function updateArtistWorkingInfo(uid, data, wizard) {
  const artistRef = doc(collection(db, 'artists'), uid)
  const artistWizardRef = doc(collection(db, 'artists_wizard'), uid)

  const styles = data.styles.map((style) => style.value)

  const dataForm = {
    times: data.times,
    work_as: data.work_as,
    styles,
    updated_at: serverTimestamp(),
  }

  const docSnap = await getDoc(artistRef)

  if (docSnap.exists()) {
    await updateDoc(artistRef, dataForm)

    if (wizard) {
      updateDoc(artistWizardRef, { step_two: true })
    }

    return true
  } else {
    throw new Error('No estas registrado como artista')
  }
}

export async function updateArtistContactInfo(uid, data, wizard) {
  const artistRef = doc(collection(db, 'artists'), uid)
  const artistWizardRef = doc(collection(db, 'artists_wizard'), uid)

  const dataForm = {
    ...data,
    updated_at: serverTimestamp(),
  }

  const docSnap = await getDoc(artistRef)

  if (docSnap.exists()) {
    await updateDoc(artistRef, dataForm)

    if (wizard) {
      updateDoc(artistWizardRef, { step_three: true })
    }

    return true
  } else {
    throw new Error('No estas registrado como artista')
  }
}

export async function updateArtistMainProfilePicture(
  uid,
  data,
  update,
  imageId,
  wizard
) {
  const artistRef = doc(collection(db, 'artists'), uid)
  const artistWizardRef = doc(collection(db, 'artists_wizard'), uid)

  if (update) {
    await axios.delete('/api/profile/delete-image', { data: { imageId } })
  }

  const dataForm = {
    profile_picture: data,
    updated_at: serverTimestamp(),
  }

  const docSnap = await getDoc(artistRef)

  if (docSnap.exists()) {
    await updateDoc(artistRef, dataForm)

    if (wizard) {
      updateDoc(artistWizardRef, { step_four: true })
    }

    return true
  } else {
    throw new Error('No estas registrado como artista')
  }
}
export async function activateArtist(uid) {
  const artistRef = doc(collection(db, 'artists'), uid)
  const usersRef = doc(collection(db, 'users'), uid)

  const docSnap = await getDoc(artistRef)

  if (docSnap.exists()) {
    await updateDoc(artistRef, { artist_active: true })
    await updateDoc(usersRef, { artist_active: true })

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

// Studio queries

export async function createStudio(uid, data, wizard) {
  const usernameRef = doc(collection(db, 'usernames_studios'), data.username)
  const userRef = doc(collection(db, 'users'), uid)

  const usernameSnap = await getDoc(usernameRef)

  if (usernameSnap.exists()) {
    throw new Error('El nombre de usuario para el estudio ya existe')
  } else {
    await addDoc(collection(db, 'studios'), {
      created_at: serverTimestamp(),
      ...data,
      admins: [uid],
    }).then(async (docRef) => {
      const studioWizardRef = doc(collection(db, 'studios_wizard'), docRef.id)

      const batch = writeBatch(db)

      batch.set(usernameRef, {
        studio_id: docRef.id,
      })

      batch.set(
        userRef,
        {
          studio_name: data.studio_name.trim(),
          has_studio: true,
          studio_id: docRef.id,
          updated_at: serverTimestamp(),
        },
        { merge: true }
      )

      if (wizard) {
        batch.set(studioWizardRef, { step_one: true }, { merge: true })
      }

      await batch.commit()

      return true
    })
  }
}

export async function updateStudioGeneralInfo(studioId, uid, data) {
  const studioRef = doc(collection(db, 'studios'), studioId)

  const userRef = doc(collection(db, 'users'), uid)

  const docSnap = await getDoc(studioRef)

  if (docSnap.exists()) {
    const batch = writeBatch(db)

    batch.set(
      studioRef,
      {
        updated_at: serverTimestamp(),
        ...data,
      },
      { merge: true }
    )

    batch.set(
      userRef,
      {
        studio_name: data.studio_name.trim(),
        updated_at: serverTimestamp(),
      },
      { merge: true }
    )

    await batch.commit()

    return true
  } else {
    throw new Error('No estas registrado como estudio')
  }
}

export async function updateStudioUsername(studioId, oldUsername, newUsername) {
  const usernameRefOld = doc(collection(db, 'usernames_studios'), oldUsername)
  const usernameRefNew = doc(collection(db, 'usernames_studios'), newUsername)
  const studioRef = doc(collection(db, 'studios'), studioId)

  const usernameSnap = await getDoc(usernameRefNew)
  const studioSnap = await getDoc(studioRef)

  if (usernameSnap.exists()) {
    throw new Error('El nombre de usuario ya existe')
  }

  if (!studioSnap.exists()) {
    throw new Error('Este estudio no existe')
  }

  const batch = writeBatch(db)

  batch.delete(usernameRefOld)

  batch.set(usernameRefNew, {
    studio_id: studioId,
  })

  batch.set(
    studioRef,
    {
      updated_at: serverTimestamp(),
      username: newUsername,
    },
    { merge: true }
  )

  await batch.commit()

  return true
}

export async function getStudioInfo(uid) {
  const docRef = doc(collection(db, 'studios'), uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { studio: docSnap.data() }
  } else {
    return { studio: null }
  }
}

export async function updateStudioArtists(studioId, data, wizard) {
  const studioRef = doc(collection(db, 'studios'), studioId)
  const studiosWizardRef = doc(collection(db, 'studios_wizard'), studioId)

  const styles = data.styles.map((style) => style.value)

  const dataForm = {
    times: data.times,
    styles,
    updated_at: serverTimestamp(),
  }

  const docSnap = await getDoc(studioRef)

  if (docSnap.exists()) {
    await updateDoc(studioRef, dataForm)

    if (wizard) {
      updateDoc(studiosWizardRef, { step_two: true })
    }

    return true
  } else {
    throw new Error('No estas registrado como artista')
  }
}
