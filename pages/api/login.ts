import commonMiddleware from '../../utils/middleware/commonMiddleware'
import { verifyIdToken } from '../../utils/auth/firebaseAdmin'
import { NextApiRequest, NextApiResponse } from 'next'
import firebase from 'firebase/app'
import 'firebase/firestore'
import initFirebase from '../../utils/auth/initFirebase'

initFirebase()

// req type: CookieSession?
const handler = async (req: any, res: NextApiResponse) => {
  if (!req.body) {
    return res.status(400)
  }

  const { token } = req.body

  // Here, we decode the user's Firebase token and store it in a cookie. Use
  // express-session (or similar) to store the session data server-side.
  // An alternative approach is to use Firebase's `createSessionCookie`. See:
  // https://firebase.google.com/docs/auth/admin/manage-cookies
  // Firebase docs:
  //   "This is a low overhead operation. The public certificates are initially
  //    queried and cached until they expire. Session cookie verification can be
  //    done with the cached public certificates without any additional network
  //    requests."
  // However, in a serverless environment, we shouldn't rely on caching, so
  // it's possible Firebase's `verifySessionCookie` will make frequent network
  // requests in a serverless context.
  try {
    const decodedToken = await verifyIdToken(token)
    let user = null
    req.session.decodedToken = decodedToken
    req.session.token = token

    const db = firebase.firestore()
    //@ts-ignore
    const snapshot: any = await db
      .collection('users')
      .where('uid', '==', decodedToken.uid)
      .get()

    if (snapshot?.docs && snapshot.docs[0]) {
      user = snapshot.docs[0].data()
      req.session.user = user
    }

    return res.status(200).json({ status: true, decodedToken, user })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export default commonMiddleware(handler)
