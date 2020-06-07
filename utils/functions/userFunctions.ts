import { useCollectionOnce } from 'react-firebase-hooks/firestore'
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

const getUserByUid = async (uid: string) => {
  const db = firebase.firestore()
  //@ts-ignore
  const snapshot: any = await db
    .collection('users')
    .where('uid', '==', uid)
    .get()
  let user = null
  if (snapshot?.docs && snapshot.docs[0]) {
    user = snapshot.docs[0].data()
  }
  return user
}

const getPostsByUserId = () => {
  const router = useRouter()
  const { username } = router.query
  console.log(`These are ${username}'s posts`)
}

const getUserByAuthUser = ({ AuthUser }: any) => {
  const db = firebase.firestore()
  const uid = AuthUser?.id ?? ''
  const [snapshot, loading, error] = useCollectionOnce(
    db.collection('users').where('uid', '==', uid),
  )

  let user = null
  if (!loading && !error) {
    user = snapshot?.docs[0].data()
    if (user) {
      user.id = snapshot?.docs[0].id
    }
  }
  return user
}

export { getUserByUserId, getPostsByUserId, getUserByAuthUser }
