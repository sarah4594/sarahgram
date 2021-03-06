import React, { useState, useEffect, ChangeEvent } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import Link from 'next/link'
import Router from 'next/router'
import withAuthUser from '../../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo'
import initFirebase from '../../utils/auth/initFirebase'
import AppShell from '../../components/app/AppShell'
import config from '../../config.json'
import {
  cloudinary,
  // @ts-ignore
} from 'cloudinary-react'
import UploadWidget from '../../components/cloudinary/UploadWidget'
import Button from '../../components/elements/Button'

initFirebase()

type Inputs = {
  photoUrl: string
  publicId: string
  version: string
  caption: string
  id?: string
  status: string
  timestamp: number
}

const Add = (props: any) => {
  const { AuthUserInfo } = props
  const authUser = get(AuthUserInfo, 'AuthUser')
  var firstInput: HTMLInputElement | null = null

  const initial: Inputs = {
    photoUrl: '',
    publicId: '',
    version: '',
    caption: '',
    id: undefined,
    status: 'pending',
    timestamp: 0,
  }

  const [inputs, setInputs] = useState(initial)

  const handleSubmit = async (e: ChangeEvent<any>) => {
    e.preventDefault()
    try {
      const db = firebase.firestore()
      const ref = db.collection('photos').doc(inputs.id)
      await ref.set({
        photoUrl: inputs.photoUrl,
        publicId: inputs.publicId,
        version: inputs.version,
        caption: inputs.caption,
        uid: authUser.id,
        status: 'posted',
        timestamp: Date.now(),
      })
      Router.push('/photos')
    } catch (error) {
      alert(error)
    }
  }

  const [image, setImage] = useState()

  const uploadFile = async (info: any) => {
    try {
      inputs.status = 'uploaded'
      inputs.photoUrl = info.secure_url
      inputs.publicId = info.public_id
      inputs.version = info.version
      inputs.timestamp = Date.now()
      const db = firebase.firestore()
      const ref = await db.collection('photos').add({
        photoUrl: inputs.photoUrl,
        publicId: inputs.publicId,
        version: inputs.version,
        caption: inputs.caption,
        status: inputs.status,
        timestamp: inputs.timestamp,
        uid: authUser.id,
      })
      setInputs({ ...inputs, id: ref.id })
    } catch (error) {
      alert(error)
    }
  }

  const handleInputChange = (e: ChangeEvent<any>) => {
    e.persist()
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <AppShell caption="Upload Photo">
      <UploadWidget
        id="widget-container"
        cloudName={config.cloudinary.cloudName}
        uploadPreset={config.cloudinary.uploadPreset}
        cropping={true}
        //@ts-ignore
        onUpload={async (result: any) => {
          console.log(result)
          if (result.event === 'success') {
            await uploadFile(result.info)
          }
        }}
      />
      {inputs.photoUrl && (
        <div>
          <img src={inputs.photoUrl} className="h-64" />
        </div>
      )}
      <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
        <label htmlFor="caption">
          <input
            type="text"
            id="caption"
            name="caption"
            placeholder="Add a caption"
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <p>
        <Link href={'/photos'}>
          <Button label="Back to Photos" />
        </Link>
      </p>
    </AppShell>
  )
}

Add.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
    token: PropTypes.string,
  }),
}

Add.defaultProps = {
  AuthUserInfo: null,
}

// Use `withAuthUser` to get the authed user server-side, which
// disables static rendering.
// Use `withAuthUserInfo` to include the authed user as a prop
// to your component.
export default withAuthUser(withAuthUserInfo(Add))
