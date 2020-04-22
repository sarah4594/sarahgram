import React from 'react'

const SignUpButton = () => (
  <>
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
  </>
)

export default SignUpButton
