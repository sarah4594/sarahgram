import '../../css/main.css'
import React, { useState, useEffect, ChangeEvent, Children } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import Link from 'next/link'
import Router from 'next/router'
import initFirebase from '../../utils/auth/initFirebase'
import SignInButton from '../../components/SignInButton'
import NavBar from '../../components/NavBar'
import Input from '../../components/Input'
import CheckBoxes from '../../components/CheckBoxes'
import ForgotPassword from '../../components/ForgotPassword'
import SignUpButton from '../../components/SignUpButton'
import GoogleSignIn from '../../components/Buttons/GoogleSignIn'
import FacebookSignIn from '../../components/Buttons/FacebookSignIn'
import TwitterSignIn from '../../components/Buttons/TwitterSignIn'

initFirebase()

type Inputs = {
  email: string
  password: string
}

function Login() {
  const initial: Inputs = {
    email: '',
    password: '',
  }
  var firstInput: HTMLInputElement | null = null

  const [inputs, setInputs] = useState(initial)

  const handleSubmit = async (e: ChangeEvent<any>) => {
    e.preventDefault()
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(inputs.email, inputs.password)
      Router.push('/')
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

  const handleLoginFacebook = async (e: any) => {
    e.preventDefault()
    try {
      const provider = new firebase.auth.FacebookAuthProvider()
      await firebase.auth().signInWithPopup(provider)
      Router.push('/')
    } catch (error) {
      alert(error)
    }
  }

  const handleLoginGoogle = async (e: any) => {
    e.preventDefault()
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth().signInWithPopup(provider)
      Router.push('/')
    } catch (error) {
      alert(error)
    }
  }

  const handleLoginTwitter = async (e: any) => {
    e.preventDefault()
    try {
      const provider = new firebase.auth.TwitterAuthProvider()
      await firebase.auth().signInWithPopup(provider)
      Router.push('/')
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    firstInput?.focus()
  }, []) // [] = run once

  return (
    <>
      <NavBar />
      <div>
        <div className="min-h-screen bg-white flex">
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm">
              <div>
                <img
                  className="h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                  alt="Workflow"
                />
                <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-8">
                <div>
                  <div>
                    <p className="text-sm leading-5 font-medium text-gray-700">
                      Sign in with
                    </p>
                    <div className="mt-1 grid grid-cols-3 gap-3">
                      {/* Google */}
                      <GoogleSignIn onClick={handleLoginGoogle} />
                      {/* Facebook */}
                      <FacebookSignIn onClick={handleLoginFacebook} />
                      {/* Twitter */}
                      <TwitterSignIn onClick={handleLoginTwitter} />
                    </div>
                  </div>

                  <div className="mt-6 relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm leading-5">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <form onSubmit={handleSubmit}>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={inputs.email}
                      label="Email Address"
                      onChange={handleInputChange}
                    />
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={inputs.password}
                      label="Password"
                      onChange={handleInputChange}
                    />
                    <div className="mt-6 flex items-center justify-between">
                      <CheckBoxes
                        id="remember_me"
                        classNameInput="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                        classNameLabel="ml-2 block text-sm leading-5 text-gray-900"
                        label="Remember Me"
                      />

                      <ForgotPassword />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="mt-6">
                        <span className="block w-full rounded-md shadow-sm">
                          <SignInButton
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:bg-purple-700 transition duration-150 ease-in-out"
                            onClick={handleSubmit}
                          >
                            Sign In
                          </SignInButton>
                        </span>
                      </div>

                      <SignUpButton />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative w-0 flex-1">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
