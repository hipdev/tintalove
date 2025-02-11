import { supabase } from 'lib/supabase-client'

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
  const { data: studioId, error } = await supabase
    .from('studios_admin')
    .select(`studio_id`)
    .eq('user_id', user_id)

  if (studioId) {
    const { data, error: studioError } = await supabase
      .from('studios')
      .select(
        `id, bio, city_id, main_photo_id, email, name, username,
          formatted_address, times, styles, telegram_user, facebook, twitter, 
          contact_way, mobile, instagram, main_address_marker, studios_places( * ), studios_main_photos: main_photo_id( * )` // Así tabla:campo se hacen multiples queries
      )
      .eq('id', studioId[0].studio_id)

    if (error) {
      throw new Error(`Error obteniendo id: ${error.message}`)
    }
    if (studioError) {
      throw new Error(`Error obteniendo estudio: ${error.message}`)
    }

    return data[0]
  }
  return null
}

export async function getStudioIsActive(_key, user_id) {
  const { data: studioId, error } = await supabase
    .from('studios_admin')
    .select(`studio_id`)
    .eq('user_id', user_id)

  if (studioId) {
    const { data, error: studioError } = await supabase
      .from('studios')
      .select(
        `is_active, id, username` // Así tabla:campo se hacen multiples queries
      )
      .eq('id', studioId[0].studio_id)

    if (error) {
      throw new Error(`Error obteniendo id: ${error.message}`)
    }
    if (studioError) {
      throw new Error(`Error obteniendo estudio: ${error.message}`)
    }

    return data[0]
  }
  return null
}

export async function getStudioDataByUsername(username) {
  const { data: studio, error } = await supabase
    .from('studios')
    .select(
      '*,studios_main_photos:main_photo_id(url), studios_places:main_address_id(*)'
    )
    .eq('username', username)

  if (error) {
    throw new Error(`Error obteniendo estudio: ${error.message}`)
  }

  return studio[0]
}

export async function updateStudioArtists(studioId, data, studioData) {
  const styles = data.styles.map((style) => style.value)

  const dataForm = {
    times: data.times,
    styles,
    updated_at: new Date(),
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
  //Validación de la ciudad
  let main_address_id = null // Para luego añadirlo al estudio

  // Sólo hacemos esto si el usuario cambia la ciudad
  let { data: address } = await supabase
    .from('studios_places')
    .select('place_id')
    .eq('place_id', dataLocation.place_id)

  if (address[0]) {
    main_address_id = address[0].place_id
  } else {
    // La ciudad no existe, entonces la creamos
    const { data: newAddress } = await supabase
      .from('studios_places')
      .insert([dataLocation])

    main_address_id = newAddress[0].place_id
  }

  //Actualizamos el estudio
  await supabase
    .from('studios')
    .update(
      {
        main_address_id,
        updated_at: new Date(),
      },
      { returning: 'minimal' } // Así nos ahorramos un select
    )
    .eq('id', studioId)

  return true
}

export async function updateStudioLocationMarker(
  studioId,
  main_address_marker
) {
  //Actualizamos el marcador de la dirección principal
  await supabase
    .from('studios')
    .update(
      {
        main_address_marker,
        updated_at: new Date(),
      },
      { returning: 'minimal' } // Así nos ahorramos un select
    )
    .eq('id', studioId)

  return true
}

export async function getUsernamesByStudios() {
  const { data: usernames, error } = await supabase
    .from('studios')
    .select('username')

  if (error) {
    throw new Error(`Error obteniendo usernames: ${error.message}`)
  }

  return usernames
}

export async function updateStudioMainProfilePicture(
  studio_id,
  dataPhoto,
  studio
) {
  const { data, error } = await supabase.from('studios_main_photos').insert({
    ...dataPhoto,
    studio_id,
    updated_at: new Date(),
  })

  if (data) {
    await supabase
      .from('studios')
      .update(
        {
          main_photo_id: data[0].id,
          updated_at: new Date(),
        },
        { returning: 'minimal' } // Así nos ahorramos un select
      )
      .eq('id', studio_id)
  }

  if (!studio.main_photo_id && data) {
    await supabase
      .from('studios_wizard')
      .update({
        step_four: true,
      })
      .eq('id', studio_id)
  }

  if (error) {
    throw new Error(`Error actualizando el artista: ${error.message}`)
  }

  return true
}

export async function getStudioPictures(key, studioId) {
  let { data: pictures, error } = await supabase
    .from('studios_photos')
    .select('*')
    .eq('studio_id', studioId)

  if (error) {
    throw new Error(`Error: ${error.message}`)
  }

  return pictures
}

export async function addStudioPicture(studio_id, data) {
  const { error } = await supabase.from('studios_photos').insert({
    ...data,
    studio_id,
  })

  if (error) {
    throw new Error(`Error creando la foto: ${error.message}`)
  }

  return true
}

export async function deletePictureFromStudio(file_id, photoId) {
  try {
    await supabase.from('studios_photos').delete().eq('id', photoId)

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

export async function activateStudio(studioId) {
  await supabase
    .from('studios')
    .update(
      {
        is_active: true,
        updated_at: new Date(),
      },
      { returning: 'minimal' } // Así nos ahorramos un select
    )
    .eq('id', studioId)

  return true
}

// Peticiones

export async function getRequestsByStudio(_key, studioId) {
  if (studioId) {
    const { data: requests, error } = await supabase
      .from('artists_requests')
      .select('*, artists:artist_id(*,artists_main_photos(url))') // hay multiples relaciones, para reducir ambiguedad se debe especificar el id
      .eq('studio_id', studioId)
      .eq('status', 'PENDING')

    if (error) {
      throw new Error('Error obteniendo las requests')
    }

    return requests
  }

  return null
}

export async function cancelArtistRequest(requestId) {
  const { error } = await supabase
    .from('artists_requests')
    .update({ status: 'CANCELED', updated_at: new Date() })
    .eq('id', requestId)

  if (error) {
    throw new Error('Error cancelando la solicitud')
  }

  return true
}

export async function acceptArtistRequest(request, userId) {
  const { data: isArtist, error } = await supabase
    .from('studios_artists')
    .select('id')
    .eq('artist_id', request.artist_id)
    .eq('studio_id', request.studio_id)

  if (isArtist[0]) {
    throw new Error('Ya hace parte del estudio')
  } else {
    const { error } = await supabase.from('studios_artists').insert({
      studio_id: request.studio_id,
      artist_id: request.artist_id,
      user_id: request.user_id,
      request_id: request.id,
      accepted_by: userId,
    })

    if (error) {
      throw new Error('Error añadiendo el artista')
    } else {
      await supabase
        .from('artists_requests')
        .update(
          {
            status: 'APPROVED',
            updated_at: new Date(),
          },
          { returning: 'minimal' }
        )
        .eq('id', request.id)

      return true
    }
  }
}

// Artistas por estudio

export async function getArtistsByStudio(_key, studioId) {
  if (studioId) {
    const { data: artists, error } = await supabase
      .from('studios_artists')
      .select('*, artists:artist_id(*, artists_main_photos(url))')
      .eq('studio_id', studioId)

    if (error) {
      throw new Error('Error obteniendo las requests')
    }
    return artists
  }

  return null
}

export async function deleteArtistFromStudio(studioArtistId, requestId) {
  await supabase.from('studios_artists').delete().eq('id', studioArtistId)
  await supabase
    .from('artists_requests')
    .update({ status: 'CANCELED', updated_at: new Date() })
    .eq('id', requestId)

  return true
}

export async function getMultipleStudiosInfo(_key, artist_id) {
  if (artist_id) {
    const { data: studios, error } = await supabase
      .from('studios_artists')
      .select('*, studios:studio_id(*)')
      .eq('artist_id', artist_id)

    if (error) {
      throw new Error('Error obteniendo las requests')
    }
    return studios
  }

  return null
}

/* Studios filters */

export async function getStudiosFilter(_key) {
  const { data, error } = await supabase
    .from('studios')
    .select('name, username, id, formatted_address')
    .limit(5)

  if (error) {
    throw new Error(`Error en filtro: ${error.message}`)
  }

  return data
}
