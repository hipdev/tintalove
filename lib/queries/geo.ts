import {
  getFirestore,
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  getDocs,
} from 'firebase/firestore'
import { distanceBetween, geohashQueryBounds } from 'geofire-common'
import firebaseApp from 'lib/firebase'

const db: any = getFirestore(firebaseApp)

export async function getPostsByCity(latLng) {
  // Find cities within 50km of London
  const center = [51.5074, 0.1278]
  const radiusInM = 50 * 1000

  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.
  const bounds = geohashQueryBounds(latLng, radiusInM)
  const promises = []
  for (const b of bounds) {
    const q = query(
      collection(db, 'posts'),
      orderBy('geohash'),
      startAt(b[0]),
      endAt(b[1])
    )

    promises.push(getDocs(q))
  }

  // Collect all the query results together into a single list
  const posts = await Promise.all(promises).then((snapshots) => {
    const matchingDocs = []

    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const lat = doc.data()._geoloc.lat
        const lng = doc.data()._geoloc.lng

        // We have to filter out a few false positives due to GeoHash
        // accuracy, but most will match
        const distanceInKm = distanceBetween([lat, lng], latLng)
        const distanceInM = distanceInKm * 1000
        if (distanceInM <= radiusInM) {
          matchingDocs.push({ ...doc.data(), id: doc.id })
        }
      }
    }

    return matchingDocs
  })
  return { posts }
}
