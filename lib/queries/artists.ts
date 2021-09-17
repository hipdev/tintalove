import {
  collection,
  addDoc,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  getDocs,
  QueryDocumentSnapshot,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import { supabase } from 'lib/supabase-client'
import { ArtistTypes } from 'types/artist'

const db = getFirestore(firebaseApp)

export async function userNameAvailable(username) {
  let { data: artist } = await supabase
    .from('artists')
    .select('username')
    .eq('username', username)

  if (artist[0]) {
    // check if exists a record
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

export async function getArtistInfo(_key, uid): Promise<ArtistTypes> {
  let { data: artist } = await supabase
    .from('artists')
    .select('*')
    .eq('user_id', uid)

  return artist ? artist[0] : null
}

export async function getArtistFullInfo(_key, uid): Promise<ArtistTypes> {
  let { data: artist } = await supabase
    .from('artists')
    .select(`*, cities ( * ), artists_places ( * ), artists_main_photos(url) `)
    .eq('user_id', uid) // Debe existir una clave foránea o no funcionará esto

  return artist ? artist[0] : null
}

export async function getArtistWizard(_key, uid) {
  let { data: artistWizard } = await supabase
    .from('artists_wizard')
    .select('*')
    .eq('id', uid)

  return artistWizard ? artistWizard[0] : null
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

export async function getArtistsFilter(_key) {
  const { data, error } = await supabase
    .from('artists')
    .select('name, user_id, username')
    .limit(5)

  if (error) {
    throw new Error(`Error en filtro: ${error.message}`)
  }

  return data
}

export async function createArtist(uid, dataArtist, placeInfo, wizard) {
  let { data: artist } = await supabase
    .from('artists')
    .select('name')
    .eq('user_id', uid)

  if (artist[0]) {
    throw new Error('Este usuario ya esta registrado como artista')
  }

  let { data: username } = await supabase
    .from('artists')
    .select('username')
    .eq('username', dataArtist.username)

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

      city_id = newCity[0].city_place_id
    }

    // Si todo esta bien hasta acá, creamos el artista:
    const { data: newArtist } = await supabase.from('artists').insert({
      ...dataArtist,
      city_id,
      user_id: uid,
    })

    //Actualizamos el nombre del usuario
    await supabase
      .from('users')
      .update(
        {
          full_name: dataArtist.name,
        },
        { returning: 'minimal' } // Así nos ahorramos un select
      )
      .eq('id', uid)

    if (wizard) {
      await supabase.from('artists_wizard').insert({
        id: uid,
        step_one: true,
      })
    }

    return newArtist
  }
}

export async function updateArtistMainInfo(uid, dataArtist, placeInfo) {
  let { data: artist } = await supabase
    .from('artists')
    .select('name')
    .eq('user_id', uid)

  if (!artist[0]) {
    throw new Error('No estas registrado como artista')
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
    city_id = artist[0].city_id
  }

  //Actualizamos el artista
  await supabase
    .from('artists')
    .update(
      {
        ...dataArtist,
        city_id,
        updated_at: new Date(),
      },
      { returning: 'minimal' } // Así nos ahorramos un select
    )
    .eq('user_id', uid)

  //Actualizamos el usuario
  await supabase
    .from('users')
    .update(
      {
        full_name: dataArtist.name,
      },
      { returning: 'minimal' } // Así nos ahorramos un select
    )
    .eq('id', uid)

  return true
}

export async function updateArtistWorkingInfo(uid, dataArtist) {
  const styles = dataArtist.styles.map((style) => style.value)

  const dataForm = {
    times: dataArtist.times,
    work_as: dataArtist.work_as,
    styles,
    updated_at: new Date(), // new Date().getTime() es igual, tiempo en milis
  }

  const { data, error } = await supabase
    .from('artists')
    .update(
      dataForm,

      { returning: 'minimal' } // Así nos ahorramos un select
    )
    .eq('user_id', uid)

  console.log(data, error, 'que tal')

  await supabase
    .from('artists_wizard')
    .update({
      step_two: true,
    })
    .eq('id', uid)

  if (error) {
    throw new Error(`Error actualizando el artista: ${error.message}`)
  }
}

// Location and map marker

export async function updateArtistLocation(artistId, dataLocation) {
  //Validación de la ciudad
  let own_studio_place_id = null // Para luego añadirlo al artista

  // Sólo hacemos esto si el usuario cambia la ciudad
  let { data: address } = await supabase
    .from('artists_places')
    .select('place_id')
    .eq('place_id', dataLocation.place_id)

  if (address[0]) {
    own_studio_place_id = address[0].place_id
  } else {
    // La ciudad no existe, entonces la creamos

    const { data: newAddress } = await supabase
      .from('artists_places')
      .insert([dataLocation])

    own_studio_place_id = newAddress[0].place_id
  }

  //Actualizamos el artista
  await supabase
    .from('artists')
    .update(
      {
        own_studio_place_id,
        updated_at: new Date(),
      },
      { returning: 'minimal' } // Así nos ahorramos un select
    )
    .eq('user_id', artistId)

  return true
}

export async function updateArtistLocationMarker(artistId, own_studio_marker) {
  //Actualizamos el artista
  await supabase
    .from('artists')
    .update(
      {
        own_studio_marker,
        updated_at: new Date(),
      },
      { returning: 'minimal' } // Así nos ahorramos un select
    )
    .eq('user_id', artistId)

  return true
}

export async function updateArtistContactInfo(uid, dataForm, artist) {
  const { error } = await supabase
    .from('artists')
    .update(
      {
        ...dataForm,
        updated_at: new Date(),
      },
      { returning: 'minimal' } // Así nos ahorramos un select
    )
    .eq('user_id', uid)

  if (!artist?.contact_way) {
    await supabase
      .from('artists_wizard')
      .update({
        step_three: true,
      })
      .eq('id', uid)
  }

  if (error) {
    throw new Error(`Error actualizando el artista: ${error.message}`)
  }

  return true
}

export async function updateArtistMainProfilePicture(uid, dataPhoto, artist) {
  const { data, error } = await supabase.from('artists_main_photos').insert({
    ...dataPhoto,
    user_id: uid,
    updated_at: new Date(),
  })

  console.log(data, 'la foto')

  if (data) {
    await supabase
      .from('artists')
      .update(
        {
          main_photo_id: data[0].id,
          updated_at: new Date(),
        },
        { returning: 'minimal' } // Así nos ahorramos un select
      )
      .eq('user_id', uid)
  }

  if (!artist.main_photo_id && data) {
    await supabase
      .from('artists_wizard')
      .update({
        step_four: true,
      })
      .eq('id', uid)
  }

  if (error) {
    throw new Error(`Error actualizando el artista: ${error.message}`)
  }

  return true
}

export async function addArtistPicture(user_id, data) {
  const { error } = await supabase.from('artists_photos').insert({
    ...data,
    user_id,
  })

  if (error) {
    throw new Error(`Error creando la foto: ${error.message}`)
  }

  return true
}

export async function activateArtist(uid) {
  await supabase
    .from('artists')
    .update(
      {
        is_active: true,
        updated_at: new Date(),
      },
      { returning: 'minimal' } // Así nos ahorramos un select
    )
    .eq('user_id', uid)

  return true
}

export async function updateArtistUsername(uid, oldUsername, newUsername) {
  const { error } = await supabase
    .from('artists')
    .update({ username: newUsername })
    .eq('user_id', uid)

  if (error) {
    throw new Error('Ese usuario ya existe')
  }

  return true
}

export async function updateAvailability(uid, selected) {
  console.log(selected, 'selected')
  const { error } = await supabase
    .from('artists')
    .update({ availability_id: selected.id })
    .eq('user_id', uid)

  if (error) {
    throw new Error(`Error: ${error.message}`)
  }

  return true
}

export async function getArtistPictures(key, artistId) {
  let { data: pictures, error } = await supabase
    .from('artists_photos')
    .select('*')
    .eq('user_id', artistId)

  if (error) {
    throw new Error(`Error: ${error.message}`)
  }

  return { pictures }
}

export async function deletePictureFromArtist(file_id, photoId) {
  try {
    await supabase.from('artists_photos').delete().eq('id', photoId)

    const options = {
      method: 'DELETE',
      body: JSON.stringify({ imageId: file_id }),
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
  const { data: request, error } = await supabase
    .from('artists_requests')
    .select(`studio_id`)
    .eq('studio_id', studio.id)
    .eq('user_id', artist.user_id)

  if (error) {
    throw new Error(`Error obteniendo request: ${error.message}`)
  }

  if (request[0]) {
    throw {
      name: 'exists',
      message: `Ya enviaste una a ${studio.name}`,
    }
  } else {
    const { error } = await supabase.from('artists_requests').insert(
      {
        studio_id: studio.id,
        user_id: artist.user_id,
        status: 'PENDING',
      },
      { returning: 'minimal' } // Así nos ahorramos un select
    )

    if (error) {
      throw new Error(`Error: ${error.message}`)
    }

    return true
  }
}

export async function getArtistRequests(_key, artistId) {
  if (artistId) {
    const { data: requests, error } = await supabase
      .from('artists_requests')
      .select('*, studios(*)')
      .eq('user_id', artistId)

    if (error) {
      throw new Error(`Error con las solicitudes: ${error.message}`)
    }

    return requests
  }
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

export async function getUsernameArtist(_key, id) {
  const usernameRef = doc(db, `artists/${id}`)
  const queryRef = await getDoc(usernameRef)

  if (queryRef.exists()) {
    return queryRef.data().username
  } else {
    throw new Error('El artista no existe')
  }
}

export async function addArtistToFavorites(artist_id, user_id) {
  const q = query(
    collection(db, 'fav_artists'),
    where('artist_id', '==', artist_id),
    where('user_id', '==', user_id)
  )

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    await addDoc(collection(db, 'fav_artists'), {
      created_at: serverTimestamp(),
      artist_id,
      user_id,
    })

    return true
  } else {
    throw new Error('Ya tienes este artista como favorito')
  }
}

export async function deleteFavoriteArtist(favId) {
  const favArtistRef = doc(collection(db, 'fav_artists'), favId)

  await deleteDoc(favArtistRef)
}

export async function isArtistFavorite(_key, artist_id, user_id) {
  const q = query(
    collection(db, 'fav_artists'),
    where('artist_id', '==', artist_id),
    where('user_id', '==', user_id)
  )

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return false
  } else {
    let artistFavId
    querySnapshot.forEach((doc) => {
      artistFavId = doc.id
    })

    return artistFavId
  }
}
