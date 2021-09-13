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
  arrayRemove,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import { supabase } from 'lib/supabase-client'
import { StudioTypes } from 'types/studio'

const db = getFirestore(firebaseApp)

export async function userNameAvailableStudio(username) {
  let { data: artist } = await supabase
    .from('studios')
    .select('username')
    .eq('username', username)

  if (artist[0]) {
    // check if exists a record
    return false
  } else {
    return true
  }
}

// Studio queries
export async function getStudioWizard(_key, studio_id) {
  let { data } = await supabase
    .from('studios_wizard')
    .select('*')
    .eq('id', studio_id)

  return data ? data[0] : null
}

export async function createStudio(uid, dataStudio, placeInfo, wizard) {
  let { data: username } = await supabase
    .from('studios')
    .select('username')
    .eq('username', dataStudio.username)

  if (username[0]) {
    throw new Error('El nombre de usuario ya existe')
  } else {
    let city_id = null // Para luego añadirlo al artista

    let { data: city } = await supabase
      .from('cities')
      .select('city_name, city_place_id')
      .eq('city_place_id', placeInfo.city_place_id)

    if (city[0]) {
      city_id = city[0].city_place_id
    } else {
      // La ciudad no existe, entonces la creamos
      const { data: newCity } = await supabase.from('cities').insert({
        ...placeInfo,
        coords: `${placeInfo.city_lat}, ${placeInfo.city_lng}`, // es tipo point, se guardará asi --> (lat,lng)
      })

      // asignamos el nuevo Id de ciudad
      city_id = newCity[0].city_place_id
    }

    // Si todo esta bien hasta acá, creamos el estudio:
    const { data: newStudio, error } = await supabase.from('studios').insert({
      ...dataStudio,
      city_id,
      admins: [uid],
      formatted_address: placeInfo.formatted_address,
    })

    if (!error) {
      const { data: studioAdmin } = await supabase
        .from('studios_admin')
        .insert({
          studio_id: newStudio[0].id,
          user_id: uid,
        })

      console.log(studioAdmin, 'studio admin')
    } else {
      throw new Error(`Error creando el estudio: ${error.message}`)
    }

    if (wizard) {
      await supabase.from('studios_wizard').insert({
        id: newStudio[0].id,
        step_one: true,
      })
    }

    return true
  }
}

export async function updateStudioGeneralInfo(
  studioId,
  uid,
  dataStudio,
  placeInfo
) {
  let { data } = await supabase
    .from('studios_admin')
    .select('user_id')
    .eq('user_id', uid)
    .eq('studio_id', studioId)

  console.log(data, 'verificando')

  if (!data[0]) {
    throw new Error('No tienes permiso para eso')
  }

  let { data: studio }: any = await supabase
    .from('studios')
    .select('name, city_id, formatted_address')
    .eq('id', studioId)

  if (!studio[0]) {
    throw new Error('El estudio no esta registrado')
  }

  //Validación de la ciudad
  let city_id = null // Para luego añadirlo al artista

  if (placeInfo) {
    // Sólo hacemos esto si el usuario cambia la ciudad
    let { data: city } = await supabase
      .from('cities')
      .select('city_name, city_place_id')
      .eq('city_place_id', placeInfo.city_place_id)

    if (city[0]) {
      city_id = city[0].city_place_id
    } else {
      // La ciudad no existe, entonces la creamos
      const { data: newCity } = await supabase.from('cities').insert({
        ...placeInfo,
        coords: `${placeInfo.city_lat}, ${placeInfo.city_lng}`,
      })

      city_id = newCity[0].city_place_id
    }
  } else {
    city_id = studio[0].city_id
  }

  //Actualizamos el estudio
  await supabase
    .from('studios')
    .update(
      {
        ...dataStudio,
        city_id,
        formatted_address:
          placeInfo?.formatted_address || studio.formatted_address,
      },
      { returning: 'minimal' } // Así nos ahorramos un select
    )
    .eq('id', studioId)

  return true
}

export async function updateStudioUsername(studioId, newUsername) {
  const { error } = await supabase
    .from('studios')
    .update({ username: newUsername })
    .eq('id', studioId)

  if (error) {
    throw new Error('Ese usuario ya existe')
  }

  return true
}

export async function getStudioData(_key, user_id) {
  const { data, error } = await supabase
    .from('studios_admin')
    .select(
      `studio_id, studios (id, bio,city_id, email, name, username, formatted_address, times, styles)`
    )
    .eq('user_id', user_id)

  if (error) {
    throw new Error(`Error obteniendo id: ${error.message}`)
  }

  return data[0]
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

export async function updateStudioArtists(studioId, data, studioData) {
  const styles = data.styles.map((style) => style.value)

  const dataForm = {
    times: data.times,
    styles,
    updated_at: serverTimestamp(),
  }

  const { error } = await supabase
    .from('studios')
    .update({
      ...dataForm,
      updated_at: new Date(),
    })
    .eq('id', studioId)

  if (!studioData?.times && !error) {
    await supabase
      .from('studios_wizard')
      .update({
        step_two: true,
      })
      .eq('id', studioId)
  } else {
    throw new Error('Error actualizando el estudio')
  }

  return true
}

export async function updateStudioContactInfo(studioId, dataForm, studioData) {
  const { error } = await supabase
    .from('studios')
    .update(
      {
        ...dataForm,
        updated_at: new Date(),
      },
      { returning: 'minimal' } // Así nos ahorramos un select
    )
    .eq('id', studioId)

  if (!studioData?.contact_way) {
    await supabase
      .from('studios_wizard')
      .update({
        step_three: true,
      })
      .eq('id', studioId)
  }

  if (error) {
    throw new Error(`Error actualizando el estudio: ${error.message}`)
  }

  return true
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
  if (studioId) {
    const { data: requests, error } = await supabase
      .from('artists_requests')
      .select('*')
      .eq('studio_id', studioId)

    if (error) {
      throw new Error('Error obteniendo las requests')
    }

    return { requests }
  }

  return null
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

    await batch.commit()

    return true
  } else {
    throw new Error(`${request.artist_name} ya hace parte del estudio`)
  }
}

// Artistas por estudio

export async function getArtistsByStudio(_key, studioId) {
  if (studioId) {
    const { data: artists, error } = await supabase
      .from('studios_artists')
      .select('*')
      .eq('studio_id', studioId)

    if (error) {
      throw new Error('Error obteniendo las requests')
    }
    return { artists }
  }

  return null
}

export async function deleteArtistFromStudio(studioArtist) {
  const studioArtistReq = doc(
    collection(db, 'studios_artists'),
    studioArtist.id
  )
  const artistRequest = doc(
    collection(db, 'artists_requests'),
    studioArtist.request_id
  )
  const artistRef = doc(collection(db, 'artists'), studioArtist.artist_id)
  const studioRef = doc(collection(db, 'studios'), studioArtist.studio_id)

  const batch = writeBatch(db)

  batch.delete(studioArtistReq)
  batch.set(
    artistRef,
    {
      studios: arrayRemove(studioArtist.studio_id),
    },
    { merge: true }
  )

  batch.set(
    studioRef,
    {
      artists: arrayRemove(studioArtist.artist_id),
    },
    { merge: true }
  )
  batch.set(
    artistRequest,
    { approval: 'CANCELED', fired_at: serverTimestamp() },
    { merge: true }
  )

  await batch.commit()

  return true
}

export async function getMultipleStudiosInfo(_key, studiosIds) {
  const studios = await Promise.all(
    studiosIds.map(async (studioId) => {
      const studioRef = doc(collection(db, 'studios'), studioId)
      const docSnap = await getDoc(studioRef)
      return { ...docSnap.data(), id: docSnap.id }
    })
  )

  return { studios }
}

export async function getUsernameStudio(_key, id) {
  const usernameRef = doc(db, `studios/${id}`)
  const queryRef = await getDoc(usernameRef)

  if (queryRef.exists()) {
    console.log('existe el estudio')
    return queryRef.data().username
  } else {
    throw new Error('El estudio no existe')
  }
}
