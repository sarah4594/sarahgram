import '../../css/main.css'
import React, { useState, useEffect } from 'react'
import firebase, { apps } from 'firebase/app'
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

initFirebase()

const AccountUpdateName = () => {
  var input: HTMLInputElement | null = null

  const { AuthUser } = useAuthUserInfo()

  const handleDisplayNameSubmit = async () => {
    try {
      var user = firebase.auth().currentUser
      if (user) {
        await user.updateProfile({
          displayName: input?.value || '',
        })
      }
      Router.push('/account')
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    if (input) {
      input.value = AuthUser?.displayName || ''
      input.focus()
    }
  })

  const gotoAccount = (e: any) => {
    e.preventDefault()
    Router.push('/account')
  }

  return (
    <AppShell title="Update Info">
      <div className="p-4">
        <label htmlFor="displayName">Display Name </label>
        <input
          type="text"
          id="displayName"
          name="displayName"
          ref={(r) => (input = r)}
          defaultValue=""
        />
      </div>
      {/* <div className="p-4">
            <label htmlFor="email">Email </label>
            <input type="email" id="email" name="email" defaultValue="" />
          </div> */}
      <div className="grid pb-2 cols-1">
        <Button onClick={handleDisplayNameSubmit} label="Update" />
      </div>
      <div className="grid pb-2 cols-1">
        <Button onClick={gotoAccount} label="Back To Account" />
      </div>
      <Footer />
    </AppShell>
  )
}

export default withAuthUser(AccountUpdateName)
