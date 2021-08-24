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
import { supabase } from 'lib/supabase-client'
import toast from 'react-hot-toast'
// import { Counter } from './counter'

const db = getFirestore(firebaseApp)

const firebaseConfig = { projectId: 'tinta-love' }

// firebase old 8 version

declare global {
  interface Window {
    firebase: any
  }
}

export async function createList(user, name) {
  const { data, error } = await supabase
    .from('lists')
    .insert([{ user_id: user.id, name }])
    .select('*')

  if (error) {
    console.log(error)
    toast.error(error.message)
  }

  console.log(data, 'data inserted')

  return data
}

export async function addPostToList(uid, post, listId) {
  try {
    const batch = writeBatch(db)

    const listRef = doc(collection(db, 'lists'), listId)
    const listItemRef = doc(collection(db, 'lists_items'))
    const postRef = doc(collection(db, 'posts'), post.id)

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

    batch.update(postRef, {
      counter_listed: increment(1), // Increment the normal way
    })

    batch.commit()

    // if (window.firebase) {
    //   if (!window.firebase.apps.length) {
    //     window.firebase.initializeApp(firebaseConfig)
    //   } else {
    //     window.firebase.app() // if already initialized, use that one
    //   }
    // }

    // const counter = new Counter(
    //   window.firebase.firestore().doc(`posts/${post.id}`),
    //   'counter_listed'
    // )

    // counter.incrementBy(1)

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

  return { listed: !querySnapshotEmpty }
}

export async function getUserLists(key, user_id) {
  let { data: lists, error } = await supabase
    .from('lists')
    .select('*')
    .eq('user_id', user_id)

  if (error) {
    console.log(error)
    toast.error(error.message)
  }

  return { lists }
}

export async function removePostFromList(postId, userId) {
  const q = query(
    collection(db, 'lists_items'),
    where('user_id', '==', userId),
    where('post_id', '==', postId)
  )

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(async (listItem: QueryDocumentSnapshot) => {
    const listRef = doc(collection(db, 'lists'), listItem.data().list_id)
    const listItemRef = doc(collection(db, 'lists_items'), listItem.id)
    const postRef = doc(collection(db, 'posts'), listItem.data().post_id)

    const batch = writeBatch(db)
    batch.update(listRef, { total_items: increment(-1) })
    batch.delete(listItemRef)
    batch.update(postRef, { counter_listed: increment(-1) }) // Increment the normal way

    const res = await batch.commit()

    console.log(res, ' res del batch')

    // await deleteDoc(doc(db, 'lists_items', listItem.id))
    // await updateDoc(doc(db, 'lists', listItem.data().list_id), {
    //   total_items: increment(-1),
    // })

    // if (window.firebase) {
    //   if (!window.firebase.apps.length) {
    //     window.firebase.initializeApp(firebaseConfig)
    //   } else {
    //     window.firebase.app() // if already initialized, use that one
    //   }
    // }

    // const counter = new Counter(
    //   window.firebase.firestore().doc(`posts/${listItem.data().post_id}`),
    //   'counter_listed'
    // )

    // counter.incrementBy(-1)
  })

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

export async function getUserListItems(key, list_id) {
  let { data: listItems, error } = await supabase
    .from('lists_items')
    .select('*')
    .eq('list_id', list_id)

  let { data: userList } = await supabase
    .from('lists')
    .select('*')
    .eq('id', list_id)
    .single() // con single no se devuelve un array con un único valor sino que devuelve un objeto

  if (error) {
    console.log(error)
    toast.error(error.message)
  }

  return { listItems, userList }
}

export async function getListImage(key, listId) {
  const q = query(
    collection(db, 'lists_items'),
    where('list_id', '==', listId),
    limit(1)
  )

  const querySnapshot = await getDocs(q)
  const userListImage: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    return userListImage.push({ ...doc.data(), id: doc.id })
  })

  return { userListImage: userListImage[0] }
}
