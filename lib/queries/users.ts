import { supabase } from 'lib/supabase-client'

// export async function updateUserSearchCity(uid, data) {
//   const userRef = doc(collection(db, 'users'), uid)

//   const dataForm = {
//     searching_city: {
//       city_name: data.city_name,
//       city_id: data.id,
//       geohash: data.geohash,
//       province: data.province,
//       _geoloc: data._geoloc || null,
//     },
//     updated_at: serverTimestamp(),
//   }

//   const docSnap = await getDoc(userRef)

//   if (docSnap.exists()) {
//     await updateDoc(userRef, dataForm)

//     return true
//   } else {
//     throw new Error('No estas registrado como usuario')
//   }
// }

export async function updateUserName(uid, name) {
  const { error } = await supabase
    .from('users')
    .update({ name, updated_at: new Date() })
    .eq('id', uid)

  if (error) {
    throw new Error(`Error : ${error.message}`)
  }
}
