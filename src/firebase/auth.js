import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config'
import { createDefaultAdminRecord } from './firestore'

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

// ── DEFAULT ADMIN SETUP ─────────────────────────────────────
export const createDefaultAdmin = async () => {
  const defaultEmail = 'admin@churchsystem.com'
  const defaultPassword = 'Admin@123Church' // Default password - user should change this

  try {
    // Create Firebase Auth account
    const credential = await createUserWithEmailAndPassword(auth, defaultEmail, defaultPassword)
    const uid = credential.user.uid

    // Create Firestore user record
    await createDefaultAdminRecord(uid)

    console.log('Default admin account created successfully')
    return {
      success: true,
      email: defaultEmail,
      password: defaultPassword,
      uid: uid
    }
  } catch (error) {
    // If user already exists, it's not an error - just log it
    if (error.code === 'auth/email-already-in-use') {
      console.log('Default admin account already exists')
      return {
        success: false,
        message: 'Default admin already exists',
        error: error.code
      }
    }
    console.error('Error creating default admin:', error)
    throw error
  }
}
