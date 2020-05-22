import '../../css/main.css'
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

initFirebase()

type Inputs = {
  photoUrl: string
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

  const uploadFile = async (e: any) => {
    console.log('Uplaoding file...')
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'SarahGram')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/snickersarah/image/upload',
      { method: 'POST', body: data },
    )
    const file = await res.json()
    console.log(file)
    try {
      inputs.status = 'uploaded'
      inputs.photoUrl = file.secure_url
      inputs.timestamp = Date.now()
      const db = firebase.firestore()
      const ref = await db.collection('photos').add({
        photoUrl: inputs.photoUrl,
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
      This is where you'll be able to upload picures
      <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
        <label htmlFor="file">
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Upload an Image"
            required
            onChange={uploadFile}
          />
        </label>
      </div>
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
          <a>[ back to photos ]</a>
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
