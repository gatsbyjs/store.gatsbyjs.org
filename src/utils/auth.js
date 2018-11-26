import auth0js from 'auth0-js';

export const isBrowser = typeof window !== 'undefined';

// To speed things up, we’ll keep the profile stored unless the user logs out.
// This prevents a flicker while the HTTP round-trip completes.
let profile = false;

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

export const logout = callback => {
  if (isBrowser) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  // Remove the locally cached profile to avoid confusing errors.
  profile = false;

  callback();
};

const setSession = authResult => {
  if (!isBrowser) {
    return;
  }

  const expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  );

  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);

  return true;
};

export const handleAuthentication = callback => {
  if (!isBrowser) {
    return;
  }

  auth0.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult);
      callback();
    } else if (err) {
      console.error(err);
    }
  });
};

export const isAuthenticated = () => {
  if (!isBrowser) {
    // For SSR, we’re never authenticated.
    return false;
  }

  let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
};

export const getAccessToken = () => {
  if (!isBrowser) {
    return '';
  }

  return localStorage.getItem('access_token');
};

export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    // If the user has already logged in, don’t bother fetching again.
    if (profile) {
      resolve(profile);
      return;
    }

    const accessToken = getAccessToken();

    if (!isAuthenticated()) {
      resolve({});
      return;
    }

    auth0.client.userInfo(accessToken, (err, userProfile) => {
      if (err) {
        reject(err);
        return;
      }

      profile = userProfile;
      resolve(profile);
    });
  });
};
