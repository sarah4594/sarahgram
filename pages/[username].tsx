import React, { useEffect, version } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import Link from 'next/link'
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
  // @ts-ignore
} from 'cloudinary-react'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import initFirebase from '../utils/auth/initFirebase'
import usePagination from 'firestore-pagination-hook'
import AppShell from '../components/app/AppShell'
import config from '../config.json'
import Router, { useRouter } from 'next/router'
import { useDocument } from 'react-firebase-hooks/firestore'

initFirebase()

const Index = (props: any) => {
  const { AuthUserInfo } = props
  const router = useRouter()
  const { username } = router.query
  const authUser = get(AuthUserInfo, 'AuthUser')

  const db = firebase.firestore()

  // //@ts-ignore
  // const userRef = db.collection('users').doc(username)
  // const [snapshot, loadingUser, errorUser] = useDocument(userRef)

  // const user = snapshot?.data()
  const {
    loading,
    loadingError,
    loadingMore,
    loadingMoreError,
    hasMore,
    items,
    loadMore,
  } = usePagination(
    db
      .collection('photos')
      .where('uid', '==', authUser?.id ?? '')
      .where('status', '==', 'posted')
      .orderBy('timestamp', 'desc'),
    {
      limit: 10,
    },
  )

  return (
    <AppShell title={`Photos for ${username}`}>
      <div className="flex flex-wrap">
        {loading && <div>...</div>}
        {items?.map((item) => {
          const photo = item.data()
          return (
            <Link href={`/p/${item.ref.id}`}>
              <a>
                <div key={item.ref.id} className="flex flex-col align-center">
                  <Image
                    cloudName={config.cloudinary.cloudName}
                    version={photo.version}
                    publicId={photo.publicId}
                    className="h-64 w-64 self-center"
                    // onClick={handleOnClick(photo.version, photo.publicId)}
                  >
                    <Transformation
                      width="256"
                      height="256"
                      gravity="face"
                      crop="thumb"
                    />
                  </Image>
                  <div>{photo.caption}</div>
                </div>
              </a>
            </Link>
          )
        })}
        {hasMore && !loadingMore && (
          <button onClick={loadMore}>[ more ]</button>
        )}
      </div>
    </AppShell>
  )
}

Index.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
    token: PropTypes.string,
  }),
}

Index.defaultProps = {
  AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(Index))
