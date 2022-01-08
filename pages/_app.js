import AuthProvider from '../components/authProvider';
import '../styles/globals.scss';

const clientID = "HdGcsM21zlTWb3fmjzEuLOTjkFCynPOS";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider 
      createUserURI="/create-user" 
      loginURI="/login"
      authBaseDomain="http://localhost:9090"
    >
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;