import '../../css/main.css'
import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import { get } from 'lodash'
import Router from 'next/router'
import withAuthUser from '../../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo'
import initFirebase from '../../utils/auth/initFirebase'
import logout from '../../utils/auth/logout'
import Footer from '../../components/app/footer'
import Button from '../../components/elements/Button'
import AppShell from '../../components/app/AppShell'
import Editable from '../../components/Editable'

initFirebase()

const Account = (props: any) => {
  const { AuthUserInfo, environment } = props
  var authUser = get(AuthUserInfo, 'AuthUser')

  const handleSignOut = async (e: any) => {
    e.preventDefault()
    try {
      await logout()
      // Router.push('/account/login')
    } catch (e) {
      console.error(e)
    }
  }

  const handleUpdate = (e: any) => {
    e.preventDefault()
    Router.push('/account/update-name')
  }

  useEffect(() => {
    if (!authUser) {
      Router.push('/')
    }
  })

  const [displayName, setDisplayName] = useState(authUser.displayName)

  const updateDisplayName = async (displayName: string) => {
    setDisplayName(displayName)
    // Call update authUser
    try {
      var user = firebase.auth().currentUser
      if (user) {
        await user.updateProfile({
          displayName,
        })
        authUser = user
      }
    } catch (error) {
      alert(error)
    }
  }
  return (
    <>
      {!authUser ? (
        <></>
      ) : (
        <AppShell title="Profile Settings">
          {/* <div className="bg-gray-100"> */}
          <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow overflow-hidden  sm:rounded-lg">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                    Personal details
                  </p>
                </div>
                <div className="px-4 py-5 sm:p-0">
                  <dl>
                    {/* Display Name */}
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                      <dt className="text-sm leading-5 font-medium text-gray-500">
                        Display Name
                      </dt>
                      <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        {authUser.displayName}
                      </dd>
                    </div>
                    {/* Email */}
                    <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                      <dt className="text-sm leading-5 font-medium text-gray-500">
                        Email
                      </dt>
                      <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        {authUser.email}
                      </dd>
                    </div>
                    {/* Environment */}
                    <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                      <dt className="text-sm leading-5 font-medium text-gray-500">
                        Environment
                      </dt>
                      <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        {`env: ${environment}`}
                      </dd>
                    </div>
                    <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                      <div className="grid grid-cols-1 gap-2">
                        <Button
                          className="w-full"
                          label="Update Info"
                          onClick={handleUpdate}
                        />
                        <Button
                          className="w-full"
                          label="Sign Out"
                          onClick={handleSignOut}
                        />
                      </div>
                    </div>
                    <Footer />
                  </dl>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </AppShell>
      )}
    </>
  )
}

Account.getInitialProps = async function () {
  const getEnvironment = firebase.functions().httpsCallable('getEnvironment')
  const result = await getEnvironment({})
  return {
    environment: result.data.environment,
  }
}

export default withAuthUser(withAuthUserInfo(Account))
