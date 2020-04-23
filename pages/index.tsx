import '../css/main.css'
import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import Link from 'next/link'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import Header from '../components/header'
import Footer from '../components/footer'
import {
  PrimaryButton,
  SecondaryButton,
} from '../components/Buttons/ButtonTypes'
import SignOutButton from '../components/Buttons/SignOutButton'
import Router from 'next/router'
import logout from '../utils/auth/logout'
import { AuthUserInfoContext } from '../utils/auth/hooks'

const Index = (props: any) => {
  const { AuthUserInfo } = props
  const authUser = get(AuthUserInfo, 'AuthUser')

  const goToAccount = (e: any, props: any) => {
    e.preventDefault()
    Router.push('/account')
  }

  const goToSpaces = (e: any, props: any) => {
    e.preventDefault()
    Router.push('/spaces')
  }

  const goToLogin = (e: any) => {
    e.preventDefault()
    Router.push('/account/login')
  }

  const goToSignUp = (e: any) => {
    e.preventDefault()
    Router.push('/account/signUp')
  }

  const handleSignOut = async (e: any) => {
    try {
      await logout()
      // Router.push('/account/login')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Header />
      {!authUser ? (
        <>
          <div>not signed in.</div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <div className="grid grid-cols-1 gap-2">
              <PrimaryButton onClick={goToLogin}>Login</PrimaryButton>
            </div>
          </div>
          Don't Have An Account?
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <div className="grid grid-cols-1 gap-2">
              <SecondaryButton onClick={goToSignUp}>Sign Up</SecondaryButton>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow overflow-hidden  sm:rounded-lg">
                  <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      User Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                      About
                    </p>
                  </div>
                  <div className="px-4 py-5 sm:p-0">
                    <dl>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                          Display Name
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                          {authUser.displayName}
                        </dd>
                      </div>
                      <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                          Id
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                          {authUser.id}
                        </dd>
                      </div>
                      <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                          {authUser.email}
                        </dd>
                      </div>
                      <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                          Email Verified
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                          {authUser.emailVerified.toString()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                  <div className="grid grid-cols-1 gap-2">
                    <PrimaryButton onClick={goToAccount}>Account</PrimaryButton>
                    <PrimaryButton onClick={goToSpaces}>Spaces</PrimaryButton>
                    <SignOutButton onClick={handleSignOut} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <>
        <Footer />
      </>
    </>
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
