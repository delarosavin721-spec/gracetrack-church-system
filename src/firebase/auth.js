import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config'

export const registerUser = async (email, password, name, role = 'usher') => {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  const uid = credential.user.uid

  await setDoc(doc(db, 'users', uid), {
    uid,
    name,
    email,
    role,
    createdAt: serverTimestamp(),
    active: false, // Changed to false for approval system
  })

  return credential
}

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const logoutUser = async () => {
  return await signOut(auth)
}

export const resetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email)
}

export const getUserRole = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid))
  if (snap.exists()) return snap.data()
  return null
}

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}
