import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import { supabase } from 'lib/supabase-client'

const db = getFirestore(firebaseApp)

export async function getCities(key, country) {
  let { data: cities } = await supabase
    .from('cities')
    .select('*')
    .eq('country', country)

  return { cities }
}

export async function getCitiesPaths() {
  const querySnapshot = await getDocs(collection(db, 'cities'))
  const cities: any = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) =>
    cities.push({
      id: doc.id,
    })
  )

  return cities
}

export async function getLatLngFromCityId(cityId) {
  const docRef = doc(collection(db, 'cities'), cityId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { latLng: [docSnap.data()._geoloc.lat, docSnap.data()._geoloc.lng] }
  } else {
    return { latLng: null }
  }
}
