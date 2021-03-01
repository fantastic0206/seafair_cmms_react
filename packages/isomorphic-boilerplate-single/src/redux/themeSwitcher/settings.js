export default {
  apiUrl: 'http://yoursite.com/api/',
};

const siteConfig = {
  siteName: 'M/V GRANDE LUXE',
  siteIcon: 'ion-flash',
  footerText: 'Isomorphic ©2018 Created by RedQ, Inc',
  enableAnimatedRoute: false,
};
const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault',
};
const language = 'english';
const AlgoliaSearchConfig = {
  appId: 'BPYMKGJ92J',
  apiKey: '6562758d9a6bb3c858895c2c4d81b28c',
};
const Auth0Config = {
  domain: 'redq.auth0.com',
  clientID: 'V0PTjCXJ1MaaUFQQuxbnzVRi3YQ5AATd',
  allowedConnections: ['Username-Password-Authentication'],
  rememberLastLogin: true,
  language: 'en',
  closable: true,
  options: {
    auth: {
      autoParseHash: true,
      responseType: 'token id_token',
      redirect: true,
      redirectUrl: 'http://localhost:3000/auth0loginCallback',
    },
    languageDictionary: {
      title: 'Isomorphic',
      emailInputPlaceholder: 'demo@gmail.com',
      passwordInputPlaceholder: 'demodemo',
    },
    theme: {
      labeledSubmitButton: true,
      logo: 'https://s3.amazonaws.com/redqteam.com/logo/isomorphic.png',
      primaryColor: '#E14615',
      authButtons: {
        connectionName: {
          displayName: 'Log In',
          primaryColor: '#b7b7b7',
          foregroundColor: '#000000',
        },
      },
    },
  },
};
const firebaseConfig = {
  apiKey: 'AIzaSyC_8ZdxWP8_eRVmw2_K6LTtZEyNAyQ5WYg',
  authDomain: 'isomorphic-51e7d.firebaseapp.com',
  databaseURL: 'https://isomorphic-51e7d.firebaseio.com',
  projectId: 'isomorphic-51e7d',
  storageBucket: 'isomorphic-51e7d.appspot.com',
  messagingSenderId: '745862953060',
};
const googleConfig = {
  apiKey: 'AIzaSyBF0FPDHlurGkDKua7PfZjpD2fr2rQsRw0',
};
const mapboxConfig = {
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  maxZoom: 18,
  defaultZoom: 11,
  center: [40.706877, -74.011265],
};

const youtubeSearchApi = 'AIzaSyDjq7LZKhLGIdvFpqMa70uglprIPcKQ3a4';

const accountKitConfig = {
  appId: '2349024828652337',
  state: 'csrf',
  version: 'v1.0',
  fbAppEventsEnabled: true,
  redirect: 'https://a1021477.ngrok.io/',
  debug: process.env.NODE_ENV !== 'production',
};

export {
  siteConfig,
  language,
  themeConfig,
  AlgoliaSearchConfig,
  Auth0Config,
  firebaseConfig,
  googleConfig,
  mapboxConfig,
  youtubeSearchApi,
  accountKitConfig,
};
