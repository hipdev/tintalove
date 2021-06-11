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
  startAt,
  endAt,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import { Counter } from './counter'

import firebase from 'firebase-8/app'
import 'firebase-8/firestore'
import { PostTypes } from 'types/post'
import { distanceBetween, geohashQueryBounds } from 'geofire-common'

const db = getFirestore(firebaseApp)

const firebaseConfig = { projectId: 'tinta-love' }
// firebase old 8 version

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // if already initialized, use that one
}
const db8 = firebase.firestore()
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
export async function getPostsByCity(commentId, postId) {
  // Find cities within 50km of London
  const center = [51.5074, 0.1278]
  const radiusInM = 50 * 1000

  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.
  const bounds = geohashQueryBounds(center, radiusInM)
  const promises = []
  for (const b of bounds) {
    console.log(b, 'que es b')
    const q = query(
      collection(db, 'posts'),
      orderBy('geohash'),
      startAt(b[0]),
      endAt(b[1])
    )

    promises.push(getDocs(q))
  }

  // Collect all the query results together into a single list
  const snapshots = await Promise.all(promises)

  const matchingDocs = []
  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      console.log(doc.get(), 'que es doc.get()')

      const lat = doc.get('lat')
      const lng = doc.get('lng')

      // We have to filter out a few false positives due to GeoHash
      // accuracy, but most will match
      const distanceInKm = distanceBetween([lat, lng], center)
      const distanceInM = distanceInKm * 1000
      if (distanceInM <= radiusInM) {
        matchingDocs.push(doc)
      }
    }
  }
}
