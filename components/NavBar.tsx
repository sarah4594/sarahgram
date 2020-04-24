import React from 'react'
import ReactDOM from 'react-dom'
import logout from '../utils/auth/logout'

const NavBar = (props: any) => (
  <>
    <div className="bg-gray-100" style={{ minHeight: '192px' }}>
      <nav data-todo-x-data="{ open: false }" className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="-ml-2 mr-2 flex items-center md:hidden">
                {/* Mobile menu button */}
                <button
                  data-todo-at-click="open = !open"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
                >
                  {/* Icon when menu is closed. */}
                  <svg
                    data-todo-x-state-on="Menu open"
                    data-todo-x-state-off="Menu closed"
                    data-todo-colon-className="{ 'hidden': open, 'block': !open }"
                    data-todo-x-bind-className="{ 'hidden': open, 'block': !open }"
                    className="block h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  {/* Icon when menu is open. */}
                  <svg
                    data-todo-x-state-on="Menu open"
                    data-todo-x-state-off="Menu closed"
                    data-todo-colon-className="{ 'hidden': !open, 'block': open }"
                    data-todo-x-bind-className="{ 'hidden': !open, 'block': open }"
                    className="hidden h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                  alt=""
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-on-dark.svg"
                  alt=""
                />
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center">
                <a
                  href="/"
                  className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >
                  Home
                </a>
                <a
                  href="/"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >
                  Team
                </a>
                <a
                  href="/"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >
                  Projects
                </a>
                <a
                  href="/"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >
                  Calendar
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="rounded-md shadow-sm">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-purple-500 hover:bg-purple-400 focus:outline-none focus:shadow-outline-purple focus:border-purple-600 active:bg-purple-600 transition duration-150 ease-in-out"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>New Job</span>
                  </button>
                </span>
              </div>
              <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                <button className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-300 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out">
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                {/* Profile dropdown */}
                <div
                  data-todo-at-click-away="open = false"
                  className="ml-3 relative"
                  data-todo-x-data="{ open: false }"
                >
                  <div>
                    <button
                      data-todo-at-click="open = !open"
                      className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>
                  <div
                    data-todo-x-show="open"
                    data-todo-x-description="Profile dropdown panel, show/hide based on dropdown state."
                    data-todo-x-transition-enter="transition ease-out duration-200"
                    data-todo-x-transition-enter-start="transform opacity-0 scale-95"
                    data-todo-x-transition-enter-end="transform opacity-100 scale-100"
                    data-todo-x-transition-leave="transition ease-in duration-75"
                    data-todo-x-transition-leave-start="transform opacity-100 scale-100"
                    data-todo-x-transition-leave-end="transform opacity-0 scale-95"
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                  >
                    <div className="py-1 rounded-md bg-white shadow-xs">
                      <a
                        href="/"
                        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      >
                        Your Profile
                      </a>
                      <a
                        href="/"
                        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      >
                        Settings
                      </a>
                      <a
                        href="/"
                        onClick={async () => {
                          try {
                            await logout()
                            // Router.push('/account/login')
                          } catch (e) {
                            console.error(e)
                          }
                        }}
                        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          data-todo-x-description="Mobile menu, toggle classes based on menu state."
          data-todo-x-state-on="Menu open"
          data-todo-x-state-off="Menu closed"
          data-todo-colon-className="{ 'block': open, 'hidden': !open }"
          className="hidden md:hidden"
        >
          <div className="px-2 pt-2 pb-3 sm:px-3">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Dashboard
            </a>
            <a
              href="/"
              className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Team
            </a>
            <a
              href="/"
              className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Projects
            </a>
            <a
              href="/"
              className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Calendar
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5 sm:px-6">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-6 text-white">
                  Tom Cook
                </div>
                <div className="text-sm font-medium leading-5 text-gray-400">
                  tom@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 sm:px-3">
              <a
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              >
                Your Profile
              </a>
              <a
                href="/"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              >
                Settings
              </a>
              <a
                href="/"
                onClick={async () => {
                  try {
                    await logout()
                    // Router.push('/account/login')
                  } catch (e) {
                    console.error(e)
                  }
                }}
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </>
)

export default NavBar
