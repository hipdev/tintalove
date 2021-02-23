import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAU64dBRZUAf0aS3g8aq_xwM2_Co9bNUv4",
  authDomain: "tinta-love.firebaseapp.com",
  projectId: "tinta-love",
  storageBucket: "tinta-love.appspot.com",
  messagingSenderId: "715168088259",
  appId: "1:715168088259:web:20c93279633a54b563a276",
  measurementId: "G-65SGLH60C4",
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}

firebaseApp = getApp();

export default firebaseApp;

export const auth = getAuth(firebaseApp);

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
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
