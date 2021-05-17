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

const firebaseConfig = { projectId: 'tinta-love' }
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // if already initialized, use that one
}
const db8 = firebase.firestore()

export async function createList(uid, list_name) {
  const res = await addDoc(collection(db, 'lists'), {
    created_at: serverTimestamp(),
    artist_id: uid,
    list_name,
  })
    .then((doc) => {
      return { doc: doc.id, status: true }
    })
    .catch((error) => console.log(error))

  return res
}

export async function addPostToList(uid, postId, listId) {
  await addDoc(collection(db, 'lists_items'), {
    created_at: serverTimestamp(),
    artist_id: uid,
    list_id: listId,
    post_id: postId,
  })
    .then((doc) => {
      return { doc: doc.id, status: true }
    })
    .catch((error) => console.log(error))
}
