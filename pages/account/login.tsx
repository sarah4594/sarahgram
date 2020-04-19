import '../../css/main.css'
import React, { useState, useEffect, ChangeEvent, Children } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import Link from 'next/link'
import Router from 'next/router'
import initFirebase from '../../utils/auth/initFirebase'
import Footer from '../../components/footer'
import SignInButton from '../../components/SignInButton'

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

  const onClick = (e: any) => {
    e.preventDefault
  }

  const handleInputChange = (e: ChangeEvent<any>) => {
    e.persist()
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
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
                <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
                  {'Or '}
                  <a
                    href="/"
                    className="font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                  >
                    start your 14-day free trial
                  </a>
                </p>
              </div>

              <div className="mt-8">
                <div>
                  <div>
                    <p className="text-sm leading-5 font-medium text-gray-700">
                      Sign in with
                    </p>
                    <div className="mt-1 grid grid-cols-3 gap-3">
                      {/* Google */}
                      <SignInButton onClick={handleLoginGoogle}>
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                        </svg>
                      </SignInButton>

                      {/* Facebook */}
                      <SignInButton onClick={onClick}>
                        <svg
                          className="h-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </SignInButton>

                      {/* Twitter */}
                      <SignInButton onClick={onClick}>
                        <svg
                          className="h-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </SignInButton>
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
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1 rounded-md shadow-sm">
                        <input
                          id="email"
                          type="email"
                          name="email"
                          onChange={handleInputChange}
                          value={inputs.email}
                          ref={(r) => (firstInput = r)}
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1 rounded-md shadow-sm">
                        <input
                          id="password"
                          type="password"
                          name="password"
                          onChange={handleInputChange}
                          value={inputs.password}
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember_me"
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                        />
                        <label
                          htmlFor="remember_me"
                          className="ml-2 block text-sm leading-5 text-gray-900"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm leading-5">
                        <a
                          href="/"
                          className="font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                        >
                          Forgot your password?
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="mt-6">
                        <span className="block w-full rounded-md shadow-sm">
                          <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:bg-purple-700 transition duration-150 ease-in-out"
                          >
                            Sign in
                          </button>
                        </span>
                      </div>

                      <div className="mt-6">
                        <span className="block w-full rounded-md shadow-sm">
                          <a
                            href="/account/signup"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md border-purple-700 border-2 text-purple-700 bg-white hover:bg-purple-300 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:bg-purple-700 transition duration-150 ease-in-out"
                          >
                            Signup
                          </a>
                        </span>
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
