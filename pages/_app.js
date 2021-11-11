import { Provider } from 'next-auth/client';
import PrimarySearchAppBar from '../components/AppBar.jsx'

const App = ({ Component, pageProps }) => {
const { session } = pageProps;

  return (
    <Provider session={session}>
      <PrimarySearchAppBar />
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
