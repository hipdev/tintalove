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
  DocumentData,
  query,
  where,
  deleteDoc,
  arrayUnion,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import { StudioTypes } from 'types/studio'

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

export async function getStudioInfo(_key, studioId) {
  const docRef = doc(collection(db, 'studios'), studioId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data: StudioTypes | DocumentData = {
      ...docSnap.data(),
      id: docSnap.id,
    }

    return { studio: data }
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
    return usernames.push({ username: doc.id })
  })

  return usernames
}

export async function updateStudioMainProfilePicture(studioId, data, wizard) {
  const studioRef = doc(collection(db, 'studios'), studioId)
  const studioWizardRef = doc(collection(db, 'studios_wizard'), studioId)

  // Dont delete pictures from Imagekit anymore
  // const options = {
  //   method: 'DELETE',
  //   body: JSON.stringify({ data: { imageId } }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }

  // if (update) {
  //   await fetch('/api/profile/delete-image', options)
  // }

  const dataForm = {
    profile_picture: data,
    updated_at: serverTimestamp(),
  }

  const docSnap = await getDoc(studioRef)

  if (docSnap.exists()) {
    await updateDoc(studioRef, dataForm)

    if (wizard) {
      updateDoc(studioWizardRef, { step_four: true })
    }

    return true
  } else {
    throw new Error('No estas registrado como artista')
  }
}

export async function getStudioPictures(key, studioId) {
  const q = query(
    collection(db, 'studios_pics'),
    where('studio_id', '==', studioId)
  )

  const querySnapshot = await getDocs(q)
  const pictures: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    return pictures.push({ ...doc.data(), id: doc.id })
  })

  return { pictures }
}

export async function addStudioPicture(studio_id, data) {
  const studioRef = doc(collection(db, 'studios'), studio_id)

  const dataForm = {
    ...data,
    studio_id,
    created_at: serverTimestamp(),
  }

  const docSnap = await getDoc(studioRef)

  if (docSnap.exists()) {
    await addDoc(collection(db, 'studios_pics'), dataForm)

    return true
  } else {
    throw new Error('No estas registrado como artista')
  }
}

export async function deletePictureFromStudio(imageId, pictureId) {
  try {
    const artistPictureRef = doc(collection(db, 'studios_pics'), pictureId)
    const delPicture: any = await deleteDoc(artistPictureRef)
    console.log(delPicture, 'oiii')

    const options = {
      method: 'DELETE',
      body: JSON.stringify({ imageId }),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const resImagekit = await fetch('/api/profile/delete-image', options)
    console.log(resImagekit, 'imagekit')
  } catch (error) {
    throw new Error('Error eliminando la foto')
  }
}

export async function activateStudio(studioId) {
  const studioRef = doc(collection(db, 'studios'), studioId)

  const docSnap = await getDoc(studioRef)

  if (docSnap.exists()) {
    await updateDoc(studioRef, { is_active: true })

    return true
  } else {
    throw new Error('Estudio no registrado')
  }
}

// Peticiones

export async function getRequestsByStudio(_key, studioId) {
  const q = query(
    collection(db, 'artists_requests'),
    where('studio_id', '==', studioId)
  )

  const querySnapshot = await getDocs(q)
  const requests: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    return requests.push({ ...doc.data(), id: doc.id })
  })

  return { requests }
}

export async function cancelArtistRequest(requestId) {
  try {
    const artistRequest = doc(collection(db, 'artists_requests'), requestId)
    await updateDoc(artistRequest, { approval: 'CANCELED' })

    return true
  } catch (error) {
    throw new Error('Error eliminando la solicitud')
  }
}

export async function acceptArtistRequest(request) {
  const artistRequest = doc(collection(db, 'artists_requests'), request.id)
  const artistRef = doc(collection(db, 'artists'), request.artist_id)
  const studioRef = doc(collection(db, 'studios'), request.studio_id)

  const q = query(
    collection(db, 'studios_artists'),
    where('artist_id', '==', request.artist_id),
    where('studio_id', '==', request.studio_id)
  )

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    const batch = writeBatch(db)
    const newStudioArtist = doc(collection(db, 'studios_artists'))

    batch.set(newStudioArtist, {
      created_at: serverTimestamp(),
      request_id: request.id,
      studio_id: request.studio_id, // id from Algolia
      artist_id: request.artist_id,
      studio_name: request.studio_name,
      studio_address: request.studio_address,
      studio_picture: request.studio_picture,
      artist_picture: request.artist_picture,
      artist_name: request.artist_name,
      artist_email: request.artist_email || null,
      artist_phone: request.artist_phone || null,
      is_active: true,
    })

    batch.set(
      artistRef,
      {
        studios: arrayUnion(request.studio_id),
      },
      { merge: true }
    )

    batch.set(
      studioRef,
      {
        artists: arrayUnion(request.artist_id),
      },
      { merge: true }
    )
    batch.set(artistRequest, { approval: 'APPROVED' }, { merge: true })

    const res = await batch.commit()

    console.log(res, 'el batch terminado')

    // await addDoc(collection(db, 'studios_artists'), {
    //   created_at: serverTimestamp(),
    //   request_id: request.id,
    //   studio_id: request.studio_id, // id from Algolia
    //   artist_id: request.artist_id,
    //   studio_name: request.studio_name,
    //   studio_address: request.studio_address,
    //   studio_picture: request.studio_picture,
    //   artist_picture: request.artist_picture,
    //   artist_name: request.artist_name,
    //   artist_email: request.artist_email || null,
    //   artist_phone: request.artist_phone || null,
    //   is_active: true,
    // })

    // await updateDoc(artistRef, {
    //   studios: arrayUnion(request.studioId),
    // })

    // await updateDoc(studioRef, {
    //   artists: arrayUnion(request.artistId),
    // })

    // await updateDoc(artistRequest, { approval: 'APPROVED' })

    return true
  } else {
    throw new Error(`${request.artist_name} ya hace parte del estudio`)
  }
}

// Artistas por estudio

export async function getArtistsByStudio(_key, studioId) {
  const q = query(
    collection(db, 'studios_artists'),
    where('studio_id', '==', studioId)
  )

  const querySnapshot = await getDocs(q)
  const artists: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    return artists.push({ ...doc.data(), id: doc.id })
  })

  return { artists }
}
