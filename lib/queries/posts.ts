import {
  collection,
  getFirestore,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'

const db = getFirestore(firebaseApp)

export async function createArtistPost(uid, infoPicture, dataForm, artist) {
  if (!dataForm?.description || dataForm?.styles.length < 0) {
    throw new Error('Te faltan los campos del formulario')
  }
  if (!infoPicture) {
    throw new Error('Te falta agregar la foto')
  }
  const styles = dataForm.styles.map((style) => style.value)

  await addDoc(collection(db, 'posts'), {
    created_at: serverTimestamp(),
    artist_id: uid,
    image: infoPicture,
    username: artist.username,
    city_name: artist.city_name,
    country: artist.country,
    displayName: artist.displayName,
    styles,
    description: dataForm.description,
  })
    .then((doc) => {
      return { doc: doc.id, status: true }
    })
    .catch((error) => console.log(error))
}
