import React from 'react'
import 'firebase/auth'

function Input(props: any) {
  var firstInput: HTMLInputElement | null = null

  return (
    <>
      <div>
        <label
          htmlFor={props.id}
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          {props.label}
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id={props.id}
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            ref={(r) => (firstInput = r)}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
      </div>
    </>
  )
}

export default Input
