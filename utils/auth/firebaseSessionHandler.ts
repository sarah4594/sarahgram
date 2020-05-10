// From:
// https://github.com/zeit/next.js/blob/canary/examples/with-firebase-authentication/pages/index.js

import fetch from 'node-fetch'

export const setSession = (user: firebase.User | null) => {
  // Log in.
  if (user) {
    return user.getIdToken().then((token: any) => {
      return fetch('/api/login', {
        method: 'POST',
        // eslint-disable-next-line no-undef
        // @ts-ignore
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ token }),
      })
    })
  }

  // Log out.
  return fetch('/api/logout', {
    method: 'POST',
    //@ts-ignore
    credentials: 'same-origin',
  })
}
