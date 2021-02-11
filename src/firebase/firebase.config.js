import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyDo3dduPbQRvx9z5abNB75Eh1PXrhrHtM4",
  authDomain: "crwn-db-3fa80.firebaseapp.com",
  databaseURL: "https://crwn-db-3fa80.firebaseio.com",
  projectId: "crwn-db-3fa80",
  storageBucket: "crwn-db-3fa80.appspot.com",
  messagingSenderId: "123916356711",
  appId: "1:123916356711:web:19a789446008f3357c58c2",
  measurementId: "G-H59QZY35YG",
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Create an instance of the Google provider object
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInwithGoogle = () => auth.signInWithPopup(provider);

// Create User object in Firebase
export const createUserOnFirebase = async (userAuth, ...otherProps) => {
  if (!userAuth) return;
  const { email, displayName, uid } = userAuth;
  const userRef = firestore.doc(`users/${uid}`);
  const userSnapshot = await userRef.get();
  if (!userSnapshot.exists) {
    const createdAt = new Date();
    try {
      await userRef.set({
        email,
        displayName,
        createdAt,
        ...otherProps,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userRef;
};
export const addCollectionAndDocuments = async (
  collectionsKey,
  documentsToAdd
) => {
  const collectionRef = await firestore.collection(collectionsKey);
  if (!collectionRef.exists) {
    const batch = firestore.batch();
    documentsToAdd.forEach((obj) => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });
    return await batch.commit();
  }
};
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollections.reduce((accumalator, collection) => {
    accumalator[collection.title.toLowerCase()] = collection;
    return accumalator;
  }, {});
};
export default firebase;
