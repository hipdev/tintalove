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
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import { Counter } from './counter'
import { PostTypes } from 'types/post'

const db = getFirestore(firebaseApp)

const firebaseConfig = { projectId: 'tinta-love' }
// firebase old 8 version

const firebase: any = process.browser ? window.firebase : null

if (firebase) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app() // if already initialized, use that one
  }
}

const db8 = firebase ? firebase.firestore() : null
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
    _geoloc: artist._geoloc,
    geohash: artist.geohash || artist.city_hash,
  })
    .then((doc) => {
      return { doc: doc.id, status: true }
    })
    .catch((error) => console.log(error))
}

export async function getPostsInfo() {
  const q = query(collection(db, 'posts'), where('is_active', '==', true))

  const querySnapshot = await getDocs(q)
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

export async function getPostDataById(key, postId) {
  const docRef = doc(collection(db, 'posts'), postId)
  const docSnap: DocumentSnapshot<PostTypes | DocumentData> = await getDoc(
    docRef
  )

  if (docSnap.exists()) {
    const data: PostTypes | DocumentData = { ...docSnap.data(), id: docSnap.id }
    return { post: data }
  } else {
    return { post: null }
  }
}

// Comments queries

export async function addComment(comment, postId, userData) {
  const postsRef = collection(db, `posts/${postId}/comments`)
  const docRef = doc(collection(db, 'posts'), postId)

  // Initialize Firebase 8.

  try {
    const res = await addDoc(postsRef, {
      comment,
      created_at: serverTimestamp(),
      displayName: userData.displayName,
      user_picture: userData.photoUrl,
      user_id: userData.uid,
    })
      .then((docRef) => {
        const counter = new Counter(
          db8.doc(`posts/${postId}`),
          'counter_comments'
        )

        counter.incrementBy(1)

        return { commentId: docRef.id }
      })
      .catch((error) => {
        console.log(error, 'error creando el comentario')
        return false
      })

    console.log(res, 'la res')
    if (res) {
      return true
    } else {
      throw new Error('Creando el comentario')
    }
  } catch (error) {
    throw new Error(error)
  }
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

  return { comments }
}

export async function deletePostComment(commentId, postId) {
  await deleteDoc(doc(db, `posts/${postId}/comments`, commentId))

  const counter = new Counter(db8.doc(`posts/${postId}`), 'counter_comments')

  counter.incrementBy(-1)
}
