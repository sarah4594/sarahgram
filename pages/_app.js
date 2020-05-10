import '../css/main.css'

// hack for firebase functions missing Headers
import fetch from 'node-fetch'
// @ts-ignore
global.Headers = global.Headers ?? fetch.Headers

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
