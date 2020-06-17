import '../../css/main.css'
import React, { useEffect } from 'react'
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
import { getPhotoByAuthUser } from '../../utils/functions/userFunctions'
import Button from '../../components/elements/Button'

initFirebase()

const Index = (props: any) => {
  const { AuthUserInfo } = props
  const {
    loading,
    loadingError,
    loadingMore,
    loadingMoreError,
    hasMore,
    items,
    loadMore,
  } = getPhotoByAuthUser({ AuthUserInfo })

  return (
    <AppShell title="Photos">
      <label>photos</label>
      <div className="flex flex-wrap">
        {loading && <div>...</div>}
        {items.map((item) => {
          const photo = item.data()
          return (
            <div key={item.ref.id} className="flex flex-col align-center">
              <Image
                cloudName={config.cloudinary.cloudName}
                version={photo.version}
                publicId={photo.publicId}
                className="h-64 w-64 self-center"
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
          )
        })}
        {hasMore && !loadingMore && (
          <Button label="More..." onClick={loadMore} />
        )}
        <div>
          <Link href={'/photos/add'}>
            <Button label="Add Photo" />
          </Link>
        </div>
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
