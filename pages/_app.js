import { Auth0Provider } from '@auth0/auth0-react';
import '../styles/globals.css';

const clientID = "HdGcsM21zlTWb3fmjzEuLOTjkFCynPOS";

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain="sunkplane.us.auth0.com"
      clientId={clientID}
      redirectUri="http://localhost:3000/login"
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;