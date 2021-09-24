import { supabase } from 'lib/supabase-client'

export async function createArtistPost(
  uid,
  infoPicture,
  dataForm,
  artist,
  photo_size
) {
  if (!dataForm?.description || dataForm?.styles.length < 0) {
    throw new Error('Te faltan los campos del formulario')
  }
  if (!infoPicture) {
    throw new Error('Te falta agregar la foto')
  }
  const styles = dataForm.styles.map((style) => style.value)

  const { error } = await supabase.from('posts').insert({
    created_by: uid,
    photo_info: infoPicture,
    ...dataForm,
    styles,
    artist_id: artist.id,
    photo_size,
    is_active: true,
  })

  if (error) {
    throw new Error(`Error creando el post: ${error.message}`)
  }
}

export async function getPostsInfo(_key) {
  let { data: posts } = await supabase
    .from('posts')
    .select('*, artists:artist_id(name, username, cities:city_id(city_name))')
    .order('created_at', { ascending: false })

  return posts
}

export async function getPostsInfoByCity(_key, cityName) {
  if (cityName) {
    // Cambiar aquí luego por el city place id
    let { data: posts, error } = await supabase
      .from('posts')
      .select('*, artists:artist_id(name, username, cities:city_id(city_name))')
      .eq('city_place_id', 'ChIJBa0PuN8oRI4RVju1x_x8E0I')

    if (error) {
      throw new Error(`Error get posts: ${error.message}`)
    }

    return posts
  }
  return null
}

export async function getLastFourPostsByArtist(_key, artistId) {
  let { data: artistFourPosts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_active', true)
    .eq('artist_id', artistId)
    .limit(4)

  if (error) {
    throw new Error(`Error: ${error.message}`)
  }

  return artistFourPosts
}

export async function getMorePostFromArtist(artistId, postId) {
  let { data: posts, error } = await supabase
    .from('posts')
    .select('*, artists:artist_id(name, username)')
    .eq('artist_id', artistId)
    .neq('id', postId)
    .limit(4)

  if (error) {
    throw new Error(`Error: ${error.message}`)
  }

  return posts
}

export async function getArtistPosts(_key, artistId) {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('artist_id', artistId)

  if (error) {
    throw new Error(`Error: ${error.message}`)
  }

  return posts
}

export async function getRelatedPosts(styles, postId) {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .contains('styles', styles) // Asi se filtra un array con Supabase
    .neq('id', postId)

  if (error) {
    throw new Error(`Error: ${error.message}`)
  }

  return posts
}

export async function getPostsIds() {
  const { data: posts } = await supabase.from('posts').select('id')

  return posts
}

export async function getPostDataById(_key, postId) {
  const { data: post, error } = await supabase
    .from('posts')
    .select(
      '*, artists:artist_id(*, artists_main_photos:main_photo_id(url), cities:city_id(city_name, province)), studios:studio_id(username, name)'
    )
    .eq('id', postId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return post
}

// Comments queries

export async function addComment(comment, post_id, user) {
  const { data: newComment, error } = await supabase
    .from('posts_comments')
    .insert({
      comment,
      user_id: user.id,
      post_id,
    })
    .single()

  if (error) {
    throw new Error(`Error: ${error.message}`)
  } else {
    // Incrementar con supabase usando una función custom, mera chimba!!
    let { data, error } = await supabase.rpc('inc_total_comments', {
      row_id: post_id,
    })

    if (error) throw new Error(`Error: ${error.message}`)

    return newComment
  }
}

export async function getPostComments(postId) {
  const { data: comments, error } = await supabase
    .from('posts_comments')
    .select('*, users:user_id(photo_url,photo_info, full_name)')
    .eq('post_id', postId)
    .order('created_at', { ascending: false }) // Así se ordena una consulta

  if (error) {
    throw new Error(`Error: ${error.message}`)
  }

  return comments
}

export async function deletePostComment(commentId, post_id) {
  const { error } = await supabase
    .from('posts_comments')
    .delete()
    .eq('id', commentId)

  if (error) {
    throw new Error(`Error: ${error.message}`)
  } else {
    // Incrementar con supabase usando una función custom, mera chimba!!
    let { error } = await supabase.rpc('dec_total_comments', {
      post_id,
    })

    if (error) throw new Error(`Error: ${error.message}`)

    return true
  }
}
