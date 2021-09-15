import { collection, getFirestore, doc, onSnapshot } from 'firebase/firestore'

import firebaseApp from 'lib/firebase'

const db = getFirestore(firebaseApp)

export async function getUsersRealtime() {
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
