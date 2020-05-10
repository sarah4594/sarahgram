import '../css/main.css'
import React from 'react'
import AppShell from '../components/app/AppShell'
import Footer from '../components/app/footer'
import UserIcons from '../components/userIcons'
import { Posts } from '../components/timeline/Posts'

const Timeline = () => {
  const images = [
    'https://images.unsplash.com/photo-1587169847138-7039d7e8c7f0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=614&ixlib=rb-1.2.1&q=80&w=614',
    'https://images.unsplash.com/photo-1586890723318-c5854ce2c3f3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=614&ixlib=rb-1.2.1&q=80&w=614',
    'https://images.unsplash.com/photo-1587169847138-7039d7e8c7f0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=614&ixlib=rb-1.2.1&q=80&w=614',
    'https://images.unsplash.com/photo-1586890723318-c5854ce2c3f3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=614&ixlib=rb-1.2.1&q=80&w=614',
  ]
  return (
    <AppShell>
      {/* Mobile Stories */}
      <div className="flex md:hidden">Mobile Stories</div>
      {/* 2 Cols photos + md:stories */}
      <div className="flex m-4">
        <div className="flex w-full md:w-2/3 border-4 border-red-500 rounded-lg">
          <div className="m-4 px-2 py-2">
            {/* Timeline Posts */}
            <div className=" m-4 grid grid-cols-1 grid-row-1">
              {images.map((url, index) => (
                <Posts url={url} key={index} />
              ))}
            </div>
          </div>
        </div>
        {/* Stories */}
        <div className="hidden md:flex w-1/3 border-4 border-green-500 rounded-lg">
          <div className="m-4">
            <UserIcons
              className="flex items-center w-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            >
              Sarah Carter
            </UserIcons>
            These are stories
            <div className="flex flex-wrap w-full flex-col-reverse">
              <UserIcons
                className="flex items-center w-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              >
                Sarah Carter
              </UserIcons>
              <UserIcons
                className="flex items-center w-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              >
                Sarah Carter
              </UserIcons>
              <UserIcons
                className="flex items-center w-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              >
                Sarah Carter
              </UserIcons>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </AppShell>
  )
}

export default Timeline
