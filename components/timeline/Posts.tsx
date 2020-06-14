import React from 'react'
import UserIcons from '../userIcons'

export const Posts = ({ url, username }: any) => (
  <>
    <UserIcons
      className="flex items-center w-full"
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    >
      {username}
    </UserIcons>
    <img src={url} />
  </>
)
