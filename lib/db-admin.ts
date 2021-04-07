import { collection, getFirestore, getDocs } from 'firebase/firestore/lite'
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
