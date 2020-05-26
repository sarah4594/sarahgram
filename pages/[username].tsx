import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import PropTypes from 'prop-types'
import initFirebase from '../utils/auth/initFirebase'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import AppShell from '../components/app/AppShell'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import PhotoList from '../components/photoList'
import UserIcons from '../components/userIcons'
import { getUserByUserId } from '../utils/functions/userFunctions'

initFirebase()

const Index = () => {
  const { uid, username, loading, error } = getUserByUserId()
  return (
    <AppShell title={`Photos for ${username}`}>
      <UserIcons
        className="flex items-center w-full"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      >
        Sarah Carter
      </UserIcons>
      <div className="border border-black">
        this is where all the picutres should go...
        {loading && <div>...</div>}
        {!loading && !error && !uid && <div>USer Not Found</div>}
        {uid && <PhotoList uid={uid} />}
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
