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
  return true
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

export async function getListImage(key, post_id) {
  let { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', post_id)

  return { post }
}
