import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import Link from 'next/link'
import Router from 'next/router'
import initFirebase from '../../utils/auth/initFirebase'

initFirebase()

type Inputs = {
  email: string
  password: string
  displayName: string
}

// const Registration = (props: any) => (
function Registration(props: any) {
  const initialValues: Inputs = {
    email: '',
    password: '',
    displayName: '',
  }
  var firstInput: HTMLInputElement | null = null

  const [inputs, setInputs] = useState(initialValues)

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(inputs.email, inputs.password)
      var user = firebase.auth().currentUser
      if (user) {
        await user.updateProfile({
          displayName: inputs.displayName,
        })
      }
      Router.push('/')
    } catch (error) {
      alert(error)
    }
  }
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-purple-900 sm:text-3xl sm:leading-9 sm:truncate">
              Create An Account!
            </h2>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <form>
              <div>
                <div>
                  <div className="mt-8 border-t border-purple-200 pt-8"></div>
                  <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                    {/* email */}
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-5 text-purple-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1 rounded-md shadow-sm">
                        <input
                          id="email"
                          type="email"
                          className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        />
                      </div>
                    </div>
                    {/* displayName */}
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="displayName"
                        className="block text-sm font-medium leading-5 text-purple-700"
                      >
                        Display Name
                      </label>
                      <div className="mt-1 rounded-md shadow-sm">
                        <input
                          id="displayName"
                          className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        />
                      </div>
                    </div>
                    {/* password */}
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-5 text-purple-700"
                      >
                        Password
                      </label>
                      <div className="mt-1 rounded-md shadow-sm">
                        <input
                          id="password"
                          className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        />
                      </div>
                    </div>
                    {/* password */}
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-5 text-purple-700"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1 rounded-md shadow-sm">
                        <input
                          id="password"
                          className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <span className="block w-full rounded-md shadow-sm">
          <button
            onClick={handleSubmit}
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:bg-purple-700 transition ease-in-out duration-150"
          >
            Create Account
          </button>
        </span>
      </div>
    </>
  )
}

export default Registration
