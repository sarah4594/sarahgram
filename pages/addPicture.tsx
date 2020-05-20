import '../css/main.css'
import React, { useState, useEffect } from 'react'
import firebase, { apps } from 'firebase/app'
import 'firebase/auth'
import { get } from 'lodash'
import Router from 'next/router'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import initFirebase from '../utils/auth/initFirebase'
import Footer from '../components/app/footer'
import AppShell from '../components/app/AppShell'
import Button from '../components/elements/Button'

initFirebase()

const AddPictures = (props: any) => {
  const { AuthUserInfo } = props
  var authUser = get(AuthUserInfo, 'AuthUser')
  var input: HTMLInputElement | null = null

  const handleSubmit = async () => {
    try {
      var user = firebase.auth().currentUser
      if (user) {
        await user.updateProfile({
          displayName: input?.value || '',
          email: input?.value || '',
        })
        authUser = user
      }
      Router.push('/account')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      {!authUser ? (
        <></>
      ) : (
        <AppShell>
          This is where you'll be able to upload picures
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <label htmlFor="file">
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Upload an Image"
              />
            </label>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <label htmlFor="caption">
              <input
                type="text"
                id="caption"
                name="caption"
                placeholder="Add a caption"
              />
            </label>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <Button onClick={handleSubmit} label="Submit" />
          </div>
        </AppShell>
      )}
    </>
  )
}

export default withAuthUser(withAuthUserInfo(AddPictures))
