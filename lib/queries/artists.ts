var slugify = require('slugify')
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp,
  updateDoc,
  writeBatch,
  getDocs,
  QueryDocumentSnapshot,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import { ArtistTypes } from 'types/artist'

const db = getFirestore(firebaseApp)

export async function userNameAvailable(username) {
  const usernameRef = doc(db, `usernames/${username}`)
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

export async function getArtistInfo(
  _key,
  uid
): Promise<{ artist: ArtistTypes }> {
  const docRef = doc(collection(db, 'artists'), uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { artist: { ...docSnap.data(), artist_id: docSnap.id } }
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
  const cityId = slugify(data.city_name + '-' + data.province, '_')

  const cityRef = doc(collection(db, 'cities'), cityId) // El hash es un valor único por ciudad
  const usernameRef = doc(collection(db, 'usernames'), data.username)
  const artistRef = doc(collection(db, 'artists'), uid)
  const artistWizardRef = doc(collection(db, 'artists_wizard'), uid)

  const userRef = doc(collection(db, 'users'), uid)

  const citySnap = await getDoc(cityRef)
  const usernameSnap = await getDoc(usernameRef)
  const docSnap = await getDoc(artistRef)

  if (usernameSnap.exists()) {
    throw new Error('El nombre de usuario ya existe')
  }
  if (!citySnap.exists()) {
    await setDoc(cityRef, {
      geohash: data.geohash,
      country: 'Colombia',
      created_by: uid,
      formatted_address: data.formatted_address,
      province: data.province,
      city_name: data.city_name,
      _geoloc: data._geoloc,
    })
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
  const cityId = slugify(data.city_name + '-' + data.province, '_')

  const artistRef = doc(collection(db, 'artists'), uid)
  const cityRef = doc(collection(db, 'cities'), cityId)

  const userRef = doc(collection(db, 'users'), uid)

  const citySnap = await getDoc(cityRef)
  const docSnap = await getDoc(artistRef)

  if (!citySnap.exists()) {
    await setDoc(cityRef, {
      geohash: data.geohash,
      country: 'Colombia',
      created_by: uid,
      formatted_address: data.formatted_address,
      province: data.province,
      _geoloc: data._geoloc,
      city_name: data.city_name,
    })
  }

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

// Location and map marker

export async function updateArtistLocation(artistId, dataLocation) {
  const artistRef = doc(collection(db, 'artists'), artistId)

  const docSnap = await getDoc(artistRef)

  if (docSnap.exists()) {
    await updateDoc(artistRef, {
      dataLocation,
      updated_at: serverTimestamp(),
    })

    return true
  } else {
    throw new Error('No estas registrado como artista')
  }
}

export async function updateArtistLocationMarker(artistId, dataMarker) {
  const artistRef = doc(collection(db, 'artists'), artistId)

  const docSnap = await getDoc(artistRef)

  if (docSnap.exists()) {
    await updateDoc(artistRef, {
      dataMarker,
      _geoloc_marker: {
        lat: dataMarker.marker_location[0],
        lng: dataMarker.marker_location[1],
      },
      updated_at: serverTimestamp(),
    })

    return true
  } else {
    throw new Error('No estas registrado como artista')
  }
}

export async function updateArtistContactInfo(uid, data, wizard) {
  const artistRef = doc(collection(db, 'artists'), uid)
  const artistWizardRef = doc(collection(db, 'artists_wizard'), uid)

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

export async function updateArtistMainProfilePicture(uid, data, wizard) {
  const artistRef = doc(collection(db, 'artists'), uid)
  const userRef = doc(collection(db, 'users'), uid)
  const artistWizardRef = doc(collection(db, 'artists_wizard'), uid)

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

  const docSnap = await getDoc(artistRef)

  if (docSnap.exists()) {
    await updateDoc(artistRef, dataForm)
    await updateDoc(userRef, { photoUrl: data.url })

    if (wizard) {
      updateDoc(artistWizardRef, { step_four: true })
    }

    return true
  } else {
    throw new Error('No estas registrado como artista')
  }
}

export async function addArtistPicture(uid, data) {
  const artistRef = doc(collection(db, 'artists'), uid)

  const dataForm = {
    ...data,
    artist_id: uid,
    created_at: serverTimestamp(),
  }

  const docSnap = await getDoc(artistRef)

  if (docSnap.exists()) {
    await addDoc(collection(db, 'artists_pics'), dataForm)

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

export async function updateAvailability(uid, selected) {
  const artistRef = doc(collection(db, 'artists'), uid)

  const docSnap = await getDoc(artistRef)

  if (docSnap.exists()) {
    await updateDoc(artistRef, {
      available_id: selected.id,
      available_label: selected.label,
      available_updated: serverTimestamp(),
    })

    return true
  } else {
    throw new Error('No estas registrado como artista')
  }
}

export async function getArtistAvailability(key, uid) {
  const artistRef = doc(collection(db, 'artists'), uid)

  const docSnap = await getDoc(artistRef)

  if (docSnap.exists()) {
    return {
      available_id: docSnap.data().available_id,
      available_label: docSnap.data().available_label,
    }
  } else {
    throw new Error('No estas registrado como artista')
  }
}

export async function getArtistPictures(key, artistId) {
  const q = query(
    collection(db, 'artists_pics'),
    where('artist_id', '==', artistId)
  )

  const querySnapshot = await getDocs(q)
  const pictures: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    return pictures.push({ ...doc.data(), id: doc.id })
  })

  return { pictures }
}

export async function deletePictureFromArtist(imageId, pictureId) {
  try {
    const artistPictureRef = doc(collection(db, 'artists_pics'), pictureId)
    await deleteDoc(artistPictureRef)

    const options = {
      method: 'DELETE',
      body: JSON.stringify({ imageId }),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await fetch('/api/profile/delete-image', options)
  } catch (error) {
    throw new Error('Error eliminando la foto')
  }
}

// Solicitudes de trabajo de artistas hacia estudios

export async function sendArtistWorkRequest(studio, artist) {
  const q = query(
    collection(db, 'artists_requests'),
    where('artist_id', '==', artist.artist_id),
    where('studio_id', '==', studio.objectID)
  )

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    await addDoc(collection(db, 'artists_requests'), {
      created_at: serverTimestamp(),
      studio_id: studio.objectID, // id from Algolia
      artist_id: artist.artist_id,
      studio_name: studio.studio_name,
      studio_address:
        studio.dataLocation.formatted_address || studio.formatted_address,
      studio_picture: studio.profile_picture.url || null,
      artist_picture: artist.profile_picture.url || null,
      studio_email: studio.email || null,
      artist_name: artist.displayName,
      artist_email: artist.email || null,
      artist_phone: artist.phone || null,
      approval: 'PENDING',
    })

    return true
  } else {
    throw new Error(`Ya enviaste una a ${studio.studio_name}`)
  }
}

export async function getArtistRequests(_key, artistId) {
  const q = query(
    collection(db, 'artists_requests'),
    where('artist_id', '==', artistId)
  )

  const querySnapshot = await getDocs(q)
  const requests: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    return requests.push({ ...doc.data(), id: doc.id })
  })

  return { requests }
}

export async function deleteArtistRequest(requestId) {
  try {
    const artistRequest = doc(collection(db, 'artists_requests'), requestId)
    await deleteDoc(artistRequest)

    return true
  } catch (error) {
    throw new Error('Error eliminando la solicitud')
  }
}

export async function getStudiosByArtistId(_key, artistId) {
  const q = query(
    collection(db, 'studios_artists'),
    where('artist_id', '==', artistId)
  )

  const querySnapshot = await getDocs(q)
  const studios: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    return studios.push({ ...doc.data(), id: doc.id })
  })

  return { studios }
}
