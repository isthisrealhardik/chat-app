// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhkx_dWnPZjvn1v88CdaM0SwF5k58aEp8",
  authDomain: "chat-app-6c9cf.firebaseapp.com",
  projectId: "chat-app-6c9cf",
  storageBucket: "chat-app-6c9cf.appspot.com",
  messagingSenderId: "76827198467",
  appId: "1:76827198467:web:dd2e9ae2f4e3f5944bba36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// instantiatinng google provider
const provider = new GoogleAuthProvider();

// user data
export const getUser = () => {
    return auth.currentUser;
}


// Login Handle
export const loginHandle = async () => {
    signInWithPopup(auth, provider)
        .then(cred => {
            const user = cred.user;
            console.log(`user signed in with the id: ${user.uid}`);
        })
        .catch (err => {
            console.error(err);
        })
} 

// adds a db
export const db = getFirestore(app);

export default app;