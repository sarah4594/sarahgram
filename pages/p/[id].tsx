import '../../css/main.css'
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
import withAuthUser from '../../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo'
import initFirebase from '../../utils/auth/initFirebase'
import usePagination from 'firestore-pagination-hook'
import AppShell from '../../components/app/AppShell'
import config from '../../config.json'
import Router, { useRouter } from 'next/router'
import { useDocument } from 'react-firebase-hooks/firestore'

initFirebase()

const Index = (props: any) => {
  const { AuthUserInfo } = props
  const router = useRouter()
  const { id } = router.query

  const authUser = get(AuthUserInfo, 'AuthUser')

  const db = firebase.firestore()
  //@ts-ignore
  const ref = db.collection('photos').doc(id)
  const [snapshot, loading, error] = useDocument(ref)
  const photo = snapshot?.data()

  return (
    <AppShell title="Photo">
      <div className="flex flex-wrap">
        {loading && <div>...</div>}
        {photo && (
          <div className="flex flex-col">
            <Image
              cloudName={config.cloudinary.cloudName}
              version={photo.version}
              publicId={photo.publicId}
              className="self-center"
            ></Image>
            <div>{photo.caption}</div>
          </div>
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
