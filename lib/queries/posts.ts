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
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import { Counter } from './counter'

import firebase from 'firebase-8/app'
import 'firebase-8/firestore'

const db = getFirestore(firebaseApp)
const db8 = firebase.firestore()

const firebaseConfig = { projectId: 'tinta-love' }
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // if already initialized, use that one
}

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
  const docRef = doc(collection(db, 'posts'), postId)

  // Initialize Firebase 8.

  const res = await addDoc(postsRef, {
    comment,
    created_at: serverTimestamp(),
    displayName: userData.displayName,
    user_picture: userData.photo,
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

  return { comments }
}

export async function deletePostComment(commentId, postId) {
  await deleteDoc(doc(db, `posts/${postId}/comments`, commentId))

  const counter = new Counter(db8.doc(`posts/${postId}`), 'counter_comments')

  counter.incrementBy(-1)
}
