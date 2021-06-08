import {
  collection,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'

const db = getFirestore(firebaseApp)

export async function getCities(key, country) {
  const q = query(collection(db, 'cities'), where('country', '==', country))

  const querySnapshot = await getDocs(q)
  const cities = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    cities.push(doc.data())
  })

  return { cities }
}
