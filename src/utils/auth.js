import auth0js from 'auth0-js';

export const isBrowser = typeof window !== 'undefined';

// To speed things up, we’ll keep the profile stored unless the user logs out.
// This prevents a flicker while the HTTP round-trip completes.
let profile = false;

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false
};

// Only instantiate Auth0 if we’re in the browser.
const auth0 = isBrowser
  ? new auth0js.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      audience: process.env.AUTH0_AUDIENCE,
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
  : {};

export const login = () => {
  if (!isBrowser) {
    return;
  }

  auth0.authorize();
};

export const logout = () => {
  localStorage.setItem('isLoggedIn', false);
  profile = false;

  const { protocol, host } = window.location;
  const returnTo = `${protocol}//${host}`;

  auth0.logout({ returnTo });
};

const setSession = callback => (err, authResult) => {
  if (!isBrowser) {
    return;
  }

  if (err) {
    console.error(err);
    callback();
    return;
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    tokens.accessToken = authResult.accessToken;
    tokens.idToken = authResult.idToken;
    tokens.expiresAt = expiresAt;
    profile = authResult.idTokenPayload;
    localStorage.setItem('isLoggedIn', true);
    callback();
  }
};

export const silentAuth = callback => {
  if (!isBrowser) {
    return;
  }

  if (!isAuthenticated()) return callback();
  auth0.checkSession({}, setSession(callback));
};

export const handleAuthentication = (callback = () => {}) => {
  if (!isBrowser) {
    return;
  }

  auth0.parseHash(setSession(callback));
};

export const isAuthenticated = () => {
  if (!isBrowser) {
    return;
  }

  return localStorage.getItem('isLoggedIn') === 'true';
};

export const getAccessToken = () => {
  if (!isBrowser) {
    return '';
  }

  return tokens.accessToken;
};

export const getUserInfo = () => {
  if (profile) {
    return profile;
  }
};
