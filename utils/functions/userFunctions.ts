import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

const getUserByUserId = () => {
  const router = useRouter()
  const { username } = router.query

  const db = firebase.firestore()

  const userRef = db.collection('users').doc(username as string)
  const [snapshot, loading, error] = useDocumentOnce(userRef)
  //@ts-ignore
  const uid = snapshot?.data().uid
  return { uid, username, loading, error }
}

export { getUserByUserId }
