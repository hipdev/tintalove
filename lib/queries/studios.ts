import {
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  updateDoc,
  writeBatch,
  addDoc,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'

const db = getFirestore(firebaseApp)

export async function userNameAvailableStudio(username) {
  const usernameRef = doc(db, `usernames_studios/${username}`)
  const queryRef = await getDoc(usernameRef)

  if (queryRef.exists()) {
    return false
  } else {
    return true
  }
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

export async function getStudioInfo(studioId) {
  const docRef = doc(collection(db, 'studios'), studioId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { studio: docSnap.data() }
  } else {
    return { studio: null }
  }
}

export async function getStudiosInfo() {
  const querySnapshot = await getDocs(collection(db, 'usernames_studios'))
  const usernames_studios: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) =>
    usernames_studios.push({ ...doc.data() })
  )

  return { usernames_studios }
}

export async function getStudioIdByUsername(username) {
  const usernameRef = doc(db, `usernames_studios/${username}`)
  const queryRef = await getDoc(usernameRef)

  if (queryRef.exists()) {
    return queryRef.data().studio_id
  } else {
    return false
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

export async function updateStudioContactInfo(studioId, data, wizard) {
  const studioRef = doc(collection(db, 'studios'), studioId)
  const studioWizardRef = doc(collection(db, 'studios_wizard'), studioId)

  const dataForm = {
    contact_way: data.contact_way,
    facebook: data.facebook || null,
    instagram: data.instagram || null,
    telegram_user: data.telegram_user || null,
    phone: data.phone.value,
    country_code: data.phone.country_code || 'CO',
    twitter: data.twitter || null,
    updated_at: serverTimestamp(),
  }

  const docSnap = await getDoc(studioRef)

  if (docSnap.exists()) {
    await updateDoc(studioRef, dataForm)

    if (wizard) {
      updateDoc(studioWizardRef, { step_three: true })
    }

    return true
  } else {
    throw new Error('No estas registrado como estudio')
  }
}

export async function updateStudioLocation(studioId, dataLocation) {
  const studioRef = doc(collection(db, 'studios'), studioId)

  const docSnap = await getDoc(studioRef)

  if (docSnap.exists()) {
    await updateDoc(studioRef, {
      dataLocation,
      updated_at: serverTimestamp(),
      _geoloc: {
        lat: dataLocation.coordinates.lat,
        lng: dataLocation.coordinates.lng,
      },
    })

    return true
  } else {
    throw new Error('No estas registrado como estudio')
  }
}

export async function updateStudioLocationMarker(studioId, dataMarker) {
  const studioRef = doc(collection(db, 'studios'), studioId)

  const docSnap = await getDoc(studioRef)

  if (docSnap.exists()) {
    await updateDoc(studioRef, {
      dataMarker,
      _geoloc_marker: {
        lat: dataMarker.marker_location[0],
        lng: dataMarker.marker_location[1],
      },
      updated_at: serverTimestamp(),
    })

    return true
  } else {
    throw new Error('No estas registrado como estudio')
  }
}

export async function getUsernamesByStudios() {
  const querySnapshot = await getDocs(collection(db, 'usernames_studios'))
  const usernames: any = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    console.log(usernames, 'array en cada loop')
    return usernames.push({ username: doc.id })
  })

  return usernames
}
