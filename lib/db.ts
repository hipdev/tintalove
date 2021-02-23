import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import firebaseApp from "lib/firebase";

const db = getFirestore(firebaseApp);

export async function createUser(user: User) {
  const docRef = doc(collection(db, "users"), user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    const userRef = doc(collection(db, "users"), user.uid);
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      createdAt: serverTimestamp(),
    });
    console.log("No such document!");
  }
}
