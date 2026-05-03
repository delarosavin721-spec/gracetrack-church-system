import {
  collection, doc, addDoc, setDoc, getDoc, getDocs,
  updateDoc, deleteDoc, query, where, orderBy, onSnapshot,
  serverTimestamp, limit, Timestamp
} from 'firebase/firestore'
import { db } from './config'

// ── MEMBERS ────────────────────────────────────────────────

export const addMember = async (data) => {
  return await addDoc(collection(db, 'members'), {
    ...data,
    createdAt: serverTimestamp(),
    active: true,
    emailOptIn: true,
  })
}

export const updateMember = async (id, data) => {
  await updateDoc(doc(db, 'members', id), { ...data, updatedAt: serverTimestamp() })
}

export const deleteMember = async (id) => {
  await deleteDoc(doc(db, 'members', id))
}

export const getMembers = async () => {
  const snap = await getDocs(query(collection(db, 'members'), orderBy('name')))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const getMember = async (id) => {
  const snap = await getDoc(doc(db, 'members', id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export const onMembersChange = (callback) => {
  return onSnapshot(query(collection(db, 'members'), orderBy('name')), (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  })
}

// ── TRANSACTIONS ────────────────────────────────────────────

export const addTransaction = async (data) => {
  return await addDoc(collection(db, 'transactions'), {
    ...data,
    timestamp: serverTimestamp(),
  })
}

export const updateTransaction = async (id, data) => {
  await updateDoc(doc(db, 'transactions', id), { ...data, updatedAt: serverTimestamp() })
}

export const deleteTransaction = async (id) => {
  await deleteDoc(doc(db, 'transactions', id))
}

export const getTransactions = async (filters = {}) => {
  let q = query(collection(db, 'transactions'), orderBy('timestamp', 'desc'))
  if (filters.memberId) q = query(q, where('memberId', '==', filters.memberId))
  if (filters.type) q = query(q, where('type', '==', filters.type))
  if (filters.weekCode) q = query(q, where('weekCode', '==', filters.weekCode))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const onTransactionsChange = (callback) => {
  return onSnapshot(
    query(collection(db, 'transactions'), orderBy('timestamp', 'desc'), limit(50)),
    (snap) => callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  )
}

export const checkDuplicate = async (memberId, type, weekCode) => {
  const q = query(
    collection(db, 'transactions'),
    where('memberId', '==', memberId),
    where('type', '==', type),
    where('weekCode', '==', weekCode)
  )
  const snap = await getDocs(q)
  return !snap.empty
}

// ── ATTENDANCE ──────────────────────────────────────────────

export const markAttendance = async (data) => {
  const id = `${data.memberId}_${data.date}`
  await setDoc(doc(db, 'attendance', id), {
    ...data,
    timestamp: serverTimestamp(),
  }, { merge: true })
}

export const getAttendance = async (date) => {
  const q = query(collection(db, 'attendance'), where('date', '==', date))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const getMemberAttendance = async (memberId) => {
  const q = query(collection(db, 'attendance'), where('memberId', '==', memberId), orderBy('date', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── CHURCH SETTINGS ─────────────────────────────────────────

export const getChurchSettings = async () => {
  const snap = await getDoc(doc(db, 'churchSettings', 'main'))
  return snap.exists() ? snap.data() : {
    churchName: 'CCCCPGI',
    serviceTime: '9:00 AM',
    fridayStudyTime: '6:00 PM',
    location: 'Church Address',
    emailEnabled: true,
  }
}

export const updateChurchSettings = async (data) => {
  await setDoc(doc(db, 'churchSettings', 'main'), { ...data, updatedAt: serverTimestamp() }, { merge: true })
}

// ── DAILY VERSES ────────────────────────────────────────────

export const setDailyVerse = async (dateKey, data) => {
  await setDoc(doc(db, 'dailyVerses', dateKey), { ...data, date: dateKey })
}

export const getDailyVerse = async (dateKey) => {
  const snap = await getDoc(doc(db, 'dailyVerses', dateKey))
  return snap.exists() ? snap.data() : null
}

// ── USERS (Ushers) ──────────────────────────────────────────

export const getUshers = async () => {
  const q = query(collection(db, 'users'), where('role', '==', 'usher'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const getAdmins = async () => {
  const q = query(collection(db, 'users'), where('role', '==', 'admin'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── EMAIL LOGS ──────────────────────────────────────────────

export const logEmail = async (data) => {
  await addDoc(collection(db, 'emailLogs'), {
    ...data,
    sentAt: serverTimestamp(),
  })
}
