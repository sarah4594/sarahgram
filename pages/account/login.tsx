import '../../css/main.css'
import React, { useState, useEffect, ChangeEvent, Children } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import Router from 'next/router'
import initFirebase from '../../utils/auth/initFirebase'
import Button from '../../components/elements/Button'
import Input from '../../components/elements/Input'
import CheckBoxes from '../../components/elements/CheckBoxes'
import ForgotPassword from '../../components/ForgotPassword'
import {
  GoogleSignInButton,
  FacebookSignInButton,
  TwitterSignInButton,
} from '../../components/account/SocialMediaButtons'
import AppShell from '../../components/app/AppShell'

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

  const handleSignUp = (e: any) => {
    e.preventDefault()
    Router.push('/account/signup')
  }

  useEffect(() => {
    firstInput?.focus()
  }, []) // [] = run once

  return (
    <>
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
                      <GoogleSignInButton onClick={handleLoginGoogle} />
                      {/* Facebook */}
                      <FacebookSignInButton onClick={handleLoginFacebook} />
                      {/* Twitter */}
                      <TwitterSignInButton onClick={handleLoginTwitter} />
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
                      <div className="text-sm leading-5">
                        <a
                          href="/"
                          className="font-medium text-purple-700 hover:text-purple-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                        >
                          Forgot your password?
                        </a>
                      </div>
                    </div>
                    <div className=" py-6 bg-white">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="mt-6">
                          <Button
                            className="w-full"
                            label="Sign In"
                            onClick={handleSubmit}
                          />
                        </div>
                        <div className="mt-6">
                          <Button
                            className="w-full"
                            label="Sign Up"
                            onClick={handleSignUp}
                          />
                        </div>
                      </div>
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
