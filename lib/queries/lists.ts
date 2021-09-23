import {
  collection,
  getFirestore,
  getDocs,
  QueryDocumentSnapshot,
  query,
  where,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import { supabase } from 'lib/supabase-client'
import toast from 'react-hot-toast'

const db = getFirestore(firebaseApp)

export async function createList(user, name) {
  const { data, error } = await supabase
    .from('lists')
    .insert([{ user_id: user.id, name }])
    .select('*')

  if (error) {
    toast.error(error.message)
  }

  console.log(data, 'data inserted')

  return data
}

export async function addPostToList(uid, post, listId) {
  return true
}

export async function isPostListed(_key, postId, userId) {
  let { data: isListed, error } = await supabase
    .from('lists_items')
    .select('id')
    .eq('user_id', userId)
    .eq('post_id', postId)

  if (error) {
    toast.error(error.message)
  }

  return isListed.length > 0 ? true : false
}

export async function getUserLists(key, user_id) {
  let { data: lists, error } = await supabase
    .from('lists')
    .select('*')
    .eq('user_id', user_id)

  if (error) {
    toast.error(error.message)
  }

  return lists
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

export async function getListImage(key, listId) {
  if (listId) {
    const { data: listImage } = await supabase
      .from('lists_items')
      .select('*, posts(photo_info)')
      .eq('list_id', listId)
      .limit(1)

    return listImage
  }
}
