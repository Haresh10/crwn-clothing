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

export default firebase;
