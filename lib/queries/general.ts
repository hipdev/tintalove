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

export async function getCitiesPaths() {
  const querySnapshot = await getDocs(collection(db, 'cities'))
  const cities: any = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) =>
    cities.push({
      id: `${doc.data().city_name}-${doc.data().province}~${
        doc.data()._geoloc.lat
      }~${doc.data()._geoloc.lng}`,
    })
  )

  return cities
}
