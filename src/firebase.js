import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";


let firebaseConfig = {
    apiKey: "AIzaSyAEmiks1JP6xDNspL6mxnr9lvTFyi5Kt0s",
    authDomain: "instreels-9fd6a.firebaseapp.com",
    projectId: "instreels-9fd6a",
    storageBucket: "instreels-9fd6a.appspot.com",
    messagingSenderId: "666093650668",
    appId: "1:666093650668:web:e6b0da75e62fb38b4b1bc9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore=firebase.firestore();
export const auth = firebase.auth();
export const storage=firebase.storage();

let GoogleProvider=new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle=()=> auth.signInWithPopup(GoogleProvider);
export default firebase;


