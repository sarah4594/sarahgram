import React, { useState } from 'react'
import logout from '../../utils/auth/logout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'

const NavBar = (props: any) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const toggleClick = () => setOpen(!open)

  const links = [
    { label: 'Home', pathname: '/' },
    { label: 'Spaces', pathname: '/spaces', match: /^\/spaces(\/|$)/ },
    { label: 'Profile', pathname: '/account', match: /^\/account(\/|$)/ },
  ]

  const handleSignOut = async (e: any) => {
    try {
      e.preventDefault()
      await logout()
      // Router.push('/account/login')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <nav
      data-todo-at-keydown-window-escape="open = false"
      className="bg-gray-800"
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="border-b border-gray-700">
          <div className="flex items-center justify-between h-16 px-4 sm:px-0">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                  alt="Workflow logo"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline">
                  {links.map((link, index) => {
                    const isActive = link.match
                      ? link.match.test(router.pathname)
                      : router.pathname === link.pathname
                    const cn = classNames(
                      'px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:text-white focus:bg-gray-700',
                      {
                        'text-white bg-gray-900': isActive,
                        'text-gray-300': !isActive,
                        'hover:text-white hover:bg-gray-700': !isActive,
                        'ml-4': index > 0,
                      },
                    )
                    return (
                      <Link href={link.pathname}>
                        <a className={cn}>{link.label}</a>
                      </Link>
                    )
                  })}
                  {/* <a
                    href="/"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  >
                    Team
                  </a> */}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                  aria-label="Notifications"
                >
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
                      onClick={toggleClick}
                      className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                      id="user-menu"
                      aria-label="User menu"
                      aria-haspopup="true"
                      data-todo-x-bind-aria-expanded="open"
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
                    data-todo-x-transition-enter="transition ease-out duration-100"
                    data-todo-x-transition-enter-start="transform opacity-0 scale-95"
                    data-todo-x-transition-enter-end="transform opacity-100 scale-100"
                    data-todo-x-transition-leave="transition ease-in duration-75"
                    data-todo-x-transition-leave-start="transform opacity-100 scale-100"
                    data-todo-x-transition-leave-end="transform opacity-0 scale-95"
                    className={`${
                      open ? 'display' : 'hidden'
                    } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg`}
                  >
                    <div className="py-1 rounded-md bg-white shadow-xs">
                      <Link href="/">
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Your Profile
                        </a>
                      </Link>
                      <Link href="/account">
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Settings
                        </a>
                      </Link>
                      <a
                        onClick={handleSignOut}
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <button
                data-todo-at-click="open = !open"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                data-todo-x-bind-aria-label="open ? 'Close main menu' data-todo-colon- 'Main menu'"
                data-todo-x-bind-aria-expanded="open"
              >
                <svg
                  data-todo-x-state-on="Menu open"
                  data-todo-x-state-off="Menu closed"
                  data-todo-colon-className="{ 'hidden': open, 'block': !open }"
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
                <svg
                  data-todo-x-state-on="Menu open"
                  data-todo-x-state-off="Menu closed"
                  data-todo-colon-className="{ 'hidden': !open, 'block': open }"
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
          </div>
        </div>
      </div>

      <div
        data-todo-x-description="Mobile menu, toggle classes based on menu state."
        data-todo-x-state-on="Open"
        data-todo-x-state-off="closed"
        data-todo-colon-className="{ 'block': open, 'hidden': !open }"
        className="hidden border-b border-gray-700 md:hidden"
      >
        <div className="px-2 py-3 sm:px-3">
          <a
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Home
          </a>
          <a
            href="/"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Spaces
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                Tom Cook
              </div>
              <div className="mt-1 text-sm font-medium leading-none text-gray-400">
                tom@example.com
              </div>
            </div>
          </div>
          <div
            className="mt-3 px-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              role="menuitem"
            >
              Your Profile
            </a>
            <Link href="/account">
              <a
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                role="menuitem"
              >
                Settings
              </a>
            </Link>
            <Link href="/">
              <a
                onClick={handleSignOut}
                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                role="menuitem"
              >
                Sign out
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
