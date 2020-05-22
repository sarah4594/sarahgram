import '../../css/main.css'
import React, { useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import Link from 'next/link'
import withAuthUser from '../../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo'
import initFirebase from '../../utils/auth/initFirebase'
import usePagination from 'firestore-pagination-hook'
import AppShell from '../../components/app/AppShell'

initFirebase()

const Index = (props: any) => {
  const { AuthUserInfo } = props
  const authUser = get(AuthUserInfo, 'AuthUser')

  const db = firebase.firestore()
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
      .orderBy('spaceId', 'asc'),
    {
      limit: 10,
    },
  )

  return (
    <AppShell title="Photos">
      <label>photos</label>{' '}
      <Link href={'/photos/create'}>
        <a>[ create ]</a>
      </Link>
      <div>
        {loading && <div>...</div>}
        {items.map((item) => (
          <pre className="text-xs">
            {JSON.stringify(item.data() || {}, null, 2)}
          </pre>
        ))}
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
