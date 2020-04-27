import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from './NavBar'

const AppShell = ({ title, children }: any) => (
  <>
    <div className="bg-gray-100">
      <div>
        <div className="bg-gray-800 pb-32">
          <NavBar />
          <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl leading-9 font-bold text-white">
                {title}
              </h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
              <div className="rounded-lg h-96">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </>
)

export default AppShell
