import {
  collection,
  getFirestore,
  getDocs,
  onSnapshot,
} from 'firebase/firestore'
import firebaseApp from 'lib/firebase'

const db = getFirestore(firebaseApp)

export async function getUsers() {
  const querySnapshot = await getDocs(collection(db, 'users'))
  let users = []
  querySnapshot.forEach((doc) => {
    console.log('algo cambio aquí')
    console.log(`${doc.id} => ${doc.data()}`, 'cada user')
    console.log(doc.data(), 'la data')
    users.push(doc.data())
  })

  return { users }
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
