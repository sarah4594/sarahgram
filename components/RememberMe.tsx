import React from 'react'

const RememberMe = () => (
  <>
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
  </>
)
export default RememberMe
