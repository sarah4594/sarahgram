import '../css/main.css'
import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
  // @ts-ignore
} from 'cloudinary-react'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import Footer from '../components/app/footer'
import Button from '../components/elements/Button'
import Router from 'next/router'
import AppShell from '../components/app/AppShell'
import UserIcons from '../components/userIcons'
import { Posts } from '../components/timeline/Posts'
import { useAuthUserInfo } from '../utils/auth/hooks'
import {
  getUserByAuthUser,
  getPhotoByAuthUser,
} from '../utils/functions/userFunctions'
import Link from 'next/link'
import config from '../config.json'

const Timeline = (props: any) => {
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

  const { AuthUser } = useAuthUserInfo()
  const user = getUserByAuthUser({ AuthUser })
  const {
    loading,
    loadingError,
    loadingMore,
    loadingMoreError,
    hasMore,
    items,
    loadMore,
  } = getPhotoByAuthUser({ AuthUserInfo })

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
                  <div className="flex flex-col">
                    {loading && <div>...</div>}
                    {items.map((item) => {
                      const photo = item.data()
                      return (
                        <div
                          key={item.ref.id}
                          className="flex flex-col align-center"
                        >
                          <Posts url={item.url} username={user?.id} />
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
                      )
                    })}
                  </div>
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
                  {user?.id}
                </UserIcons>
                These are stories
                <div className="flex flex-wrap w-full flex-col-reverse">
                  <UserIcons
                    className="flex items-center w-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  >
                    {user?.id}
                  </UserIcons>
                  <UserIcons
                    className="flex items-center w-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  >
                    {user?.id}
                  </UserIcons>
                  <UserIcons
                    className="flex items-center w-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  >
                    {user?.id}
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

Timeline.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
    token: PropTypes.string,
  }),
}

Timeline.defaultProps = {
  AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(Timeline))
