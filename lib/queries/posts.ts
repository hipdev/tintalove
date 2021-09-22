import {
  collection,
  getFirestore,
  getDocs,
  QueryDocumentSnapshot,
  doc,
  query,
  orderBy,
  limit,
  deleteDoc,
  where,
  startAfter,
  updateDoc,
  increment,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import { supabase } from 'lib/supabase-client'

import { PostTypes } from 'types/post'

const db = getFirestore(firebaseApp)

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

  console.log(
    uid,
    infoPicture,
    dataForm,
    artist,
    photo_size,
    'todos los campos'
  )

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
    .select('*, artists:artist_id(name, username)')

  return posts
}

export async function getPostsInfoMobile(_key) {
  const q = query(
    collection(db, 'posts'),
    where('is_active', '==', true),
    orderBy('created_at', 'desc'),
    limit(4)
  )

  const querySnapshot = await getDocs(q)
  const posts: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    return posts.push({ ...doc.data(), id: doc.id })
  })

  return { posts }
}

export async function getAllPostsPaginatedMobile(_key, pageNumber, cursor) {
  // console.log([_key, pageNumber, cursor], 'la key en pag OJOOOO')

  if (pageNumber == 0) {
    const posts: Array<any> = []

    const q = query(
      collection(db, 'posts'),
      where('is_active', '==', true),
      orderBy('created_at', 'desc'),
      limit(2)
    )

    const querySnapshot = await getDocs(q)

    const nextCursor = querySnapshot.docs[querySnapshot.docs.length - 1] // Cursor para página siguiente

    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      return posts.push({ ...doc.data(), id: doc.id })
    })

    return { posts, nextCursor }
  } else {
    const posts: Array<any> = []

    const next = query(
      collection(db, 'posts'),
      where('is_active', '==', true),
      orderBy('created_at', 'desc'),
      startAfter(cursor), // Aquí va el cursor, es decir, último post de página anterior.
      limit(2)
    )

    const querySnapshot = await getDocs(next)

    const nextCursor = querySnapshot.docs[querySnapshot.docs.length - 1]

    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      return posts.push({ ...doc.data(), id: doc.id })
    })

    return { posts, nextCursor }
  }
}

export async function getLastFourPostsByArtist(_key, artistId) {
  const q = query(
    collection(db, 'posts'),
    where('is_active', '==', true),
    where('artist_id', '==', artistId),
    limit(4)
  )

  const querySnapshot = await getDocs(q)
  const posts: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    return posts.push({ ...doc.data(), id: doc.id })
  })

  return { posts }
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
  console.log('hola')
  const { data: post, error } = await supabase
    .from('posts')
    .select(
      '*, artists:artist_id(*, artists_main_photos:main_photo_id(url), cities:city_id(city_name, province))'
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

    console.log(data, 'contador')

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

export async function deletePostComment(commentId, postId) {
  await deleteDoc(doc(db, `posts/${postId}/comments`, commentId))

  await updateDoc(doc(db, `posts/${postId}`), {
    counter_comments: increment(-1),
  })
}
