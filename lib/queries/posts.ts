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
  where,
  orderBy,
  limit,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'

const db = getFirestore(firebaseApp)

export async function createArtistPost(
  uid,
  infoPicture,
  dataForm,
  artist,
  picture_size
) {
  if (!dataForm?.description || dataForm?.styles.length < 0) {
    throw new Error('Te faltan los campos del formulario')
  }
  if (!infoPicture) {
    throw new Error('Te falta agregar la foto')
  }
  const styles = dataForm.styles.map((style) => style.value)

  await addDoc(collection(db, 'posts'), {
    created_at: serverTimestamp(),
    artist_id: uid,
    image: infoPicture,
    username: artist.username,
    city_name: artist.city_name,
    country: artist.country,
    displayName: artist.displayName,
    artist_picture: artist.profile_picture.url,
    styles,
    description: dataForm.description,
    picture_size,
  })
    .then((doc) => {
      return { doc: doc.id, status: true }
    })
    .catch((error) => console.log(error))
}

export async function getPostsInfo() {
  const querySnapshot = await getDocs(collection(db, 'posts'))
  const posts: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    // console.log('consultando artistas', doc.data())
    return posts.push({ ...doc.data(), id: doc.id })
  })

  return { posts }
}

export async function getPostsIds() {
  const querySnapshot = await getDocs(collection(db, 'posts'))
  const posts: any = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) =>
    posts.push({ id: doc.id })
  )

  return posts
}

export async function getPostDataById(id) {
  const docRef = doc(collection(db, 'posts'), id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { post: { ...docSnap.data(), id: docSnap.id } }
  } else {
    return { post: null }
  }
}

// Comments queries

export async function addComment(comment, postId, userData) {
  const postsRef = collection(db, `posts/${postId}/comments`)

  const res = await addDoc(postsRef, {
    comment,
    created_at: serverTimestamp(),
    displayName: userData.displayName,
    user_picture: userData.photo,
  })
    .then((docRef) => {
      return { commentId: docRef.id }
    })
    .catch((error) => {
      console.log(error, 'error creando el comentario')
      return false
    })

  return res
}

export async function getPostComments(postId) {
  const q = query(
    collection(db, `posts/${postId}/comments`),
    orderBy('created_at', 'desc'),
    limit(10)
  )

  const querySnapshot = await getDocs(q)

  const comments: any = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) =>
    comments.push({ ...doc.data(), id: doc.id })
  )

  console.log(comments, 'los comentarios en el cliente ')

  return { comments }
}
