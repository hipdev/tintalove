import {
  collection,
  getFirestore,
  serverTimestamp,
  addDoc,
  getDocs,
  QueryDocumentSnapshot,
  doc,
  getDoc,
  query,
  orderBy,
  limit,
  deleteDoc,
  DocumentSnapshot,
  DocumentData,
  where,
  documentId,
  startAfter,
  updateDoc,
  increment,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import { supabase } from 'lib/supabase-client'
// import { Counter } from './counter'
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
  const q = query(
    collection(db, 'posts'),
    where('artist_id', '==', artistId),
    where(documentId(), '!=', postId), // Asi podemos filtrar por el ID del documento, que chimbaaa!!!
    limit(4)
  )

  const querySnapshot = await getDocs(q)
  const posts: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    return posts.push({ ...doc.data(), id: doc.id })
  })

  return { posts }
}

export async function getArtistPosts(_key, artistId) {
  const q = query(
    collection(db, 'posts'),
    where('artist_id', '==', artistId),
    orderBy('created_at', 'desc'),
    limit(15)
  )

  const querySnapshot = await getDocs(q)
  const posts: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    return posts.push({ ...doc.data(), id: doc.id })
  })

  return { posts }
}

export async function getRelatedPosts(styles) {
  const q = query(
    collection(db, 'posts'),
    where('styles', 'array-contains-any', styles),
    limit(8)
  )

  const querySnapshot = await getDocs(q)
  const posts: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    return posts.push({ ...doc.data(), id: doc.id })
  })

  return { posts }
}

export async function getPostsIds() {
  const { data: posts } = await supabase.from('posts').select('id')

  return posts
}

export async function getPostDataById(_key, postId) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)

  return post
}

// Comments queries

export async function addComment(comment, postId, userData) {
  const postsRef = collection(db, `posts/${postId}/comments`)
  const postRef = doc(db, `posts/${postId}`)

  // Initialize Firebase 8.

  try {
    const res = await addDoc(postsRef, {
      comment,
      created_at: serverTimestamp(),
      displayName: userData.displayName,
      user_picture: userData.photoUrl,
      user_id: userData.uid,
    })
      .then(async (docRef) => {
        await updateDoc(postRef, {
          counter_comments: increment(1),
        })

        return { commentId: docRef.id }
      })
      .catch((error) => {
        console.log(error, 'error creando el comentario')
        return false
      })

    if (res) {
      return res
    } else {
      throw new Error('Creando el comentario')
    }
  } catch (error) {
    throw new Error(error)
  }
}

export async function getPostComments(postId) {
  const { data: comments, error } = await supabase
    .from('posts_comments')
    .select('*')
    .eq('post_id', postId)

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
