import {
  collection,
  getFirestore,
  serverTimestamp,
  addDoc,
  getDocs,
  QueryDocumentSnapshot,
  doc,
  getDoc,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'

const db = getFirestore(firebaseApp)

export async function createArtistPost(
  uid,
  infoPicture,
  dataForm,
  artist,
  isPortrait
) {
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
    artist_picture: artist.profile_picture.url,
    styles,
    description: dataForm.description,
    isPortrait,
  })
    .then((doc) => {
      return { doc: doc.id, status: true }
    })
    .catch((error) => console.log(error))
}

export async function getPostsInfo() {
  const querySnapshot = await getDocs(collection(db, 'posts'))
  const posts: Array<any> = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    // console.log('consultando artistas', doc.data())
    return posts.push({ ...doc.data(), id: doc.id })
  })

  return { posts }
}

export async function getPostsIds() {
  const querySnapshot = await getDocs(collection(db, 'posts'))
  const posts: any = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot) =>
    posts.push({ id: doc.id })
  )

  return posts
}

export async function getPostDataById(id) {
  const docRef = doc(collection(db, 'posts'), id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { post: { ...docSnap.data(), id: docSnap.id } }
  } else {
    return { post: null }
  }
}
