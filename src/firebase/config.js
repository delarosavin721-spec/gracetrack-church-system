// Firebase Configuration
// Copy this file and rename to config.js, then fill in your Firebase project values
// Get these from: Firebase Console → Project Settings → Your Apps → Web App

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCSPYMLkdTvpdLctpfG_zB7I4VVy7miVWQ",
  authDomain: "gracetrack-8cd61.firebaseapp.com",
  projectId: "gracetrack-8cd61",
  storageBucket: "gracetrack-8cd61.firebasestorage.app",
  messagingSenderId: "776718748001",
  appId: "1:776718748001:web:c8d62182ac0bb257551d20",
  measurementId: "G-4BQT2EQDEL"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
