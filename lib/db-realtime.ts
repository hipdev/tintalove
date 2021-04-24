import { collection, getFirestore, doc, onSnapshot } from 'firebase/firestore'

import firebaseApp from 'lib/firebase'

const db = getFirestore(firebaseApp)

export function listenArtistById(uid, setArtist) {
  const unsub = onSnapshot(doc(collection(db, 'artists'), uid), (doc) => {
    console.log('Artist data realtime: ', doc.data())
    setArtist({ ...doc.data(), uid })
  })

  return unsub
}

export function listenArtistWizardById(uid, setArtistWizard) {
  const unsub = onSnapshot(
    doc(collection(db, 'artists_wizard'), uid),
    (doc) => {
      setArtistWizard({ ...doc.data(), uid })
    }
  )

  return unsub
}

export function listenStudioWizardById(uid, setStudioWizard) {
  const unsub = onSnapshot(doc(collection(db, 'studio_wizard'), uid), (doc) => {
    setStudioWizard({ ...doc.data(), uid })
  })

  return unsub
}

export async function getUsersRealtime() {
  console.log('entrando aqui')
  const unsubscribe = onSnapshot(
    collection(db, 'users'),
    (snapshot) => {
      // ...
      let users = []
      snapshot.forEach((doc) => {
        console.log('algo cambio aquí')
        console.log(`${doc.id} => ${doc.data()}`, 'cada user')
        console.log(doc.data(), 'la data')
        users.push(doc.data())
      })
      console.log(snapshot, 'esto :O')
      return { users }
    },
    (error) => {
      // ...
    }
  )

  return { users: unsubscribe }
}
