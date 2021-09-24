import {
  collection,
  getFirestore,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import { supabase } from 'lib/supabase-client'

const db = getFirestore(firebaseApp)

export async function createList(user, name) {
  const { data, error } = await supabase
    .from('lists')
    .insert([{ user_id: user.id, name }])
    .select('*')

  if (error) {
    throw new Error(`Error : ${error.message}`)
  }

  console.log(data, 'data inserted')

  return data
}

export async function addPostToList(user_id, post_id, list_id) {
  const { error } = await supabase
    .from('lists_items')
    .insert({ list_id, post_id, user_id }, { returning: 'minimal' })

  if (error) {
    throw new Error(`Error : ${error.message}`)
  }

  return true
}

export async function isPostListed(_key, postId, userId) {
  const { data: isListed, error } = await supabase
    .from('lists_items')
    .select('id')
    .eq('user_id', userId)
    .eq('post_id', postId)

  if (error) {
    throw new Error(`Error : ${error.message}`)
  }

  return isListed.length > 0 ? true : false
}

export async function getUserLists(key, user_id) {
  const { data: lists, error } = await supabase
    .from('lists')
    .select('*')
    .eq('user_id', user_id)

  if (error) {
    throw new Error(`Error : ${error.message}`)
  }

  return lists
}

export async function removePostFromList(postId, userId) {
  console.log(postId, userId, 'params')

  const { error } = await supabase
    .from('lists_items')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId)

  if (error) {
    throw new Error(`Error : ${error.message}`)
  }

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
  if (list_id) {
    const { data: listItems, error } = await supabase
      .from('lists_items')
      .select('id, posts:post_id(id, photo_info, artists:artist_id(name))')
      .eq('list_id', list_id)

    const { data: userList } = await supabase
      .from('lists')
      .select('*')
      .eq('id', list_id)
      .single() // con single no se devuelve un array con un único valor sino que devuelve un objeto

    if (error) {
      throw new Error()
    }

    return { listItems, userList }
  }
  return { listItems: null, userList: null }
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
  return []
}
