import '../css/main.css'
import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import Footer from '../components/app/footer'
import Button from '../components/elements/Button'
import Router from 'next/router'
import AppShell from '../components/app/AppShell'
import UserIcons from '../components/userIcons'
import { Posts } from '../components/timeline/Posts'

const Index = (props: any) => {
  const { AuthUserInfo } = props
  const authUser = get(AuthUserInfo, 'AuthUser')

  const goToLogin = (e: any) => {
    e.preventDefault()
    Router.push('/account/login')
  }

  const goToSignUp = (e: any) => {
    e.preventDefault()
    Router.push('/account/signUp')
  }

  const images = [
    'https://images.unsplash.com/photo-1587169847138-7039d7e8c7f0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=614&ixlib=rb-1.2.1&q=80&w=614',
    'https://images.unsplash.com/photo-1586890723318-c5854ce2c3f3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=614&ixlib=rb-1.2.1&q=80&w=614',
    'https://images.unsplash.com/photo-1587169847138-7039d7e8c7f0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=614&ixlib=rb-1.2.1&q=80&w=614',
    'https://images.unsplash.com/photo-1586890723318-c5854ce2c3f3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=614&ixlib=rb-1.2.1&q=80&w=614',
  ]

  return (
    <AppShell title="Timeline">
      {!authUser ? (
        <>
          <div>not signed in.</div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <div className="grid grid-cols-1 gap-2">
              <Button className="w-full" label="Login" onClick={goToLogin} />
            </div>
          </div>
          Don't Have An Account?
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <div className="grid grid-cols-1 gap-2">
              <Button className="w-full" label="Sign Up" onClick={goToSignUp} />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Mobile Stories */}
          <div className="flex md:hidden">Mobile Stories</div>
          {/* 2 Cols photos + md:stories */}
          <div className="flex m-4">
            <div className="flex w-full md:w-2/3 border-4 border-red-500 rounded-lg">
              <div className="m-4 px-2 py-2">
                {/* Timeline Posts */}
                <div className=" m-4 grid grid-cols-1 grid-row-1">
                  {images.map((url, index) => (
                    <Posts url={url} key={index} />
                  ))}
                </div>
              </div>
            </div>
            {/* Stories */}
            <div className="hidden md:flex w-1/3 border-4 border-green-500 rounded-lg">
              <div className="m-4">
                <UserIcons
                  className="flex items-center w-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                >
                  Sarah Carter
                </UserIcons>
                These are stories
                <div className="flex flex-wrap w-full flex-col-reverse">
                  <UserIcons
                    className="flex items-center w-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  >
                    Sarah Carter
                  </UserIcons>
                  <UserIcons
                    className="flex items-center w-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  >
                    Sarah Carter
                  </UserIcons>
                  <UserIcons
                    className="flex items-center w-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  >
                    Sarah Carter
                  </UserIcons>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
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
