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
  where,
  updateDoc,
  writeBatch,
  increment,
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

export async function createList(user, list_name, isFirst) {
  if (isFirst) {
    const usrRef = doc(collection(db, 'users'), user.uid)

    await updateDoc(usrRef, {
      has_list: true,
      updated_at: serverTimestamp(),
    })
  }

  const res = await addDoc(collection(db, 'lists'), {
    created_at: serverTimestamp(),
    user_id: user.uid,
    user_name: user.displayName,
    is_artist: user.is_artist || false,
    list_name,
  })
    .then((doc) => {
      return { doc: doc.id, status: true }
    })
    .catch((error) => console.log(error))

  return res
}

export async function addPostToList(uid, post, listId) {
  try {
    const batch = writeBatch(db)

    const listRef = doc(collection(db, 'lists'), listId)
    const listItemRef = doc(collection(db, 'lists_items'))

    batch.set(listItemRef, {
      created_at: serverTimestamp(),
      user_id: uid,
      list_id: listId,
      post_id: post.id,
      post_image: post.image.url,
      post_picture_size: post.picture_size,
      post_description: post.description,
      post_artist_id: post.artist_id,
      post_artist_name: post.displayName,
      post_styles: post.styles,
    })

    batch.update(listRef, {
      total_items: increment(1),
    })

    batch.commit()

    const counter = new Counter(db8.doc(`posts/${post.id}`), 'counter_listed')

    counter.incrementBy(1)

    return { doc: listItemRef.id, status: true }
  } catch (error) {
    throw new Error(error)
  }
}
export async function isPostListed(postId, userId) {
  const q = query(
    collection(db, 'lists_items'),
    where('user_id', '==', userId),
    where('post_id', '==', postId)
  )

  const querySnapshotEmpty = await (await getDocs(q)).empty // is Empty == true

  return { notListed: !querySnapshotEmpty }
}

export async function getUserLists(userId) {
  const q = query(collection(db, 'lists'), where('user_id', '==', userId))

  const querySnapshot = await getDocs(q)
  const userLists: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    // console.log('consultando artistas', doc.data())
    return userLists.push({ ...doc.data(), id: doc.id })
  })

  return { userLists }
}

export async function removePostFromList(postId, userId) {
  console.log(postId, userId, 'esto que')
  const q = query(
    collection(db, 'lists_items'),
    where('user_id', '==', userId),
    where('post_id', '==', postId)
  )

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(async (listItem: QueryDocumentSnapshot) => {
    await deleteDoc(doc(db, 'lists_items', listItem.id))
    await updateDoc(doc(db, 'lists', listItem.data().list_id), {
      total_items: increment(-1),
    })

    const counter = new Counter(
      db8.doc(`posts/${listItem.data().post_id}`),
      'counter_listed'
    )

    counter.incrementBy(-1)
  })

  console.log(querySnapshot.empty, 'esto que')
  return true
}

export async function getListsIds() {
  const querySnapshot = await getDocs(collection(db, 'lists'))
  const lists: any = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) =>
    lists.push({ id: doc.id })
  )

  return lists
}

export async function getUserListItems(listId) {
  const q = query(collection(db, 'lists_items'), where('list_id', '==', listId))
  const listRef = doc(collection(db, 'lists'), listId)

  const docData = await getDoc(listRef)

  const querySnapshot = await getDocs(q)
  const userListItems: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    // console.log('consultando artistas', doc.data())
    return userListItems.push({ ...doc.data(), id: doc.id })
  })

  return { userListItems, userList: docData.data() }
}
