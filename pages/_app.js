// pages/_app.js

import PrimarySearchAppBar from '../components/AppBar'
import { Provider } from "next-auth/client"

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <PrimarySearchAppBar/>
      <Component {...pageProps} />
    </Provider>
  )
}