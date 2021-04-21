import { initializeApp, getApps, getApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAU64dBRZUAf0aS3g8aq_xwM2_Co9bNUv4',
  authDomain: 'tinta-love.firebaseapp.com',
  projectId: 'tinta-love',
  storageBucket: 'tinta-love.appspot.com',
  messagingSenderId: '715168088259',
  appId: '1:715168088259:web:20c93279633a54b563a276',
  measurementId: 'G-65SGLH60C4',
}

const firebaseApp: any = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp()

const authProvider = firebaseApp.container.getProvider('auth-exp')
let auth: Auth
if (authProvider.isInitialized()) {
  auth = authProvider.getImmediate()
} else {
  auth = getAuth(firebaseApp)
}
//Do whatever with this
export { auth }

export default firebaseApp

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
// export async function getUserWithUsername(username) {
//   const usersRef = firestore.collection("users");
//   const query = usersRef.where("username", "==", username).limit(1);
//   const userDoc = (await query.get()).docs[0];
//   return userDoc;
// }

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(data) {
  console.log(data, 'la data en posttojson')
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    created_at: data?.created_at?.toMillis() || 0,
    updated_at: data?.updated_at?.toMillis() || 0,
  }
}

export function postsToJSON(arrayData) {
  console.log(arrayData, 'la data en posttojson')
  let data = []

  data = arrayData.map((doc) => postToJSON(doc))

  return data
}
