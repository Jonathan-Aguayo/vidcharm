// pages/_app.js

import PrimarySearchAppBar from '../components/AppBar'
import { Provider } from "next-auth/client"
import { createTheme,ThemeProvider } from '@mui/material'
import { purple } from '@mui/material/colors'
const theme = createTheme({
  palette:{
    primary:{
      main: '#315f72',

    },
    secondary:{
      main: '#a2a595'
    },
    background:{
    },
    common:{
      third:'#a7beae',
      black:'#201e20'
    }
  },
})
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider session={pageProps.session}>
        <PrimarySearchAppBar/>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  )
}