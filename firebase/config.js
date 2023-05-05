// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI2mi0doZbN_LHcQ9ImFEujL1cQPgRRmQ",
  authDomain: "two-chat-app-acf6d.firebaseapp.com",
  projectId: "two-chat-app-acf6d",
  storageBucket: "two-chat-app-acf6d.appspot.com",
  messagingSenderId: "336209360846",
  appId: "1:336209360846:web:b56ef1adf14dcaed571d9f"
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