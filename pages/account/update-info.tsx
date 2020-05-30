import '../../css/main.css'
import React, { useState, useEffect } from 'react'
import firebase, { apps } from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { get } from 'lodash'
import Router from 'next/router'
import withAuthUser from '../../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo'
import initFirebase from '../../utils/auth/initFirebase'
import Footer from '../../components/app/footer'
import AppShell from '../../components/app/AppShell'
import Button from '../../components/elements/Button'
import { useAuthUserInfo } from '../../utils/auth/hooks'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

initFirebase()

const UpdateForm = ({ user, handleSubmit }: any) => {
  var input: HTMLInputElement | null = null
  type Inputs = {
    displayName: string
    username: string
  }
  const initialValues = {
    displayName: user.displayName,
    username: user.id,
  }
  const [inputs, setInputs] = useState(initialValues)

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist()
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (input) {
      input.focus()
    }
  }, [])

  return (
    <>
      <div className="p-4">
        <label htmlFor="displayName">Display Name </label>
        <input
          type="text"
          id="displayName"
          name="displayName"
          ref={(r) => (input = r)}
          required
          value={inputs.displayName}
          onChange={handleInputChange}
        />
      </div>
      <div className="p-4">
        <label htmlFor="username">Username </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={inputs.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid pb-2 cols-1">
        <Button onClick={() => handleSubmit(inputs)} label="Submit" />
      </div>
    </>
  )
}

const AccountUpdateName = () => {
  const { AuthUser } = useAuthUserInfo()
  const db = firebase.firestore()
  const uid = AuthUser?.id ?? ''

  const [snapshot, loading, error] = useCollectionOnce(
    db.collection('users').where('uid', '==', uid),
  )
  let user = null
  let existingUsername: any = null
  if (!loading && !error) {
    if (snapshot?.docs && snapshot.docs[0]) {
      user = snapshot.docs[0].data()
      user.id = snapshot.docs[0].id
    } else {
      // first time user
      user = {}
    }
    existingUsername = user.id
  }
  console.log('update-info', user)

  const handleSubmit = async (inputs: any) => {
    // is user changing name - replace
    // keep track of existing username
    // is new username differnt from existing
    //    check for duplicates
    //    is it unique
    //    if not unique then error
    //    if unique then save
    // if changing username delete existing document
    if (inputs.username === existingUsername) {
      await db.collection('users').doc(inputs.username).set({
        displayName: inputs.displayName,
        uid: uid,
      })
      Router.push('/account/profile-settings')
    } else {
      const { exists } = await db.collection('users').doc(inputs.username).get()
      if (exists) {
        alert(`${inputs.username} already exists`)
        return
      }
      await db.collection('users').doc(inputs.username).set({
        displayName: inputs.displayName,
        uid: uid,
      })
      // delete existing username
      if (existingUsername) {
        await db.collection('users').doc(existingUsername).delete()
      }
      Router.push('/account/profile-settings')
    }
  }

  const gotoAccount = (e: any) => {
    e.preventDefault()
    Router.push('/account/profile-settings')
  }

  return (
    <AppShell title="Update Info">
      {user && <UpdateForm user={user} handleSubmit={handleSubmit} />}
      <div className="grid pb-2 cols-1">
        <Button onClick={gotoAccount} label="Back To Account" />
      </div>
      <Footer />
    </AppShell>
  )
}

export default withAuthUser(AccountUpdateName)
