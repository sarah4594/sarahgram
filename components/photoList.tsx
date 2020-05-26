import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Link from 'next/link'
import {
  Image,
  Transformation,
  // @ts-ignore
} from 'cloudinary-react'
import usePagination from 'firestore-pagination-hook'
import config from '../config.json'

const PhotoList = ({ uid }: any) => {
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
      .where('uid', '==', `${uid}` ?? '')
      .where('status', '==', 'posted')
      .orderBy('timestamp', 'desc'),
    {
      limit: 10,
    },
  )

  return (
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
      {hasMore && !loadingMore && <button onClick={loadMore}>[ more ]</button>}
    </div>
  )
}

export default PhotoList
