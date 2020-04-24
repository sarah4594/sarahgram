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
import Header from '../../components/header'
import Footer from '../../components/footer'
import { SecondaryButton } from '../../components/Buttons/ButtonTypes'
import SignOutButton from '../../components/Buttons/SignOutButton'
import NavBar from '../../components/NavBar'

initFirebase()

const Account = (props: any) => {
  const { AuthUserInfo, environment } = props
  var authUser = get(AuthUserInfo, 'AuthUser')

  const handleSignOut = async (e: any) => {
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

  return (
    <>
      {!authUser ? (
        <></>
      ) : (
        <>
          <NavBar />
          <Header />
          <div className="bg-gray-100">
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
                        <div className="grid grid-cols-1 gap-2">
                          <SecondaryButton onClick={handleUpdate}>
                            Update Display Name
                          </SecondaryButton>
                        </div>
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
                          <SignOutButton onClick={handleSignOut} />
                        </div>
                      </div>
                      <Footer />
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
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
