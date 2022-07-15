import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./redux/store";
import axios from 'axios';
import { Auth0Provider } from '@auth0/auth0-react';

axios.defaults.baseURL = "http://localhost:3001";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <React.StrictMode>
        <PersistGate persistor={persistor}>
          <Auth0Provider
            domain="dev-clxn9t-m.us.auth0.com"
            clientId="RKgs7Hgy94AWuO8sE4pNdbA8vkH5jjof"
            redirectUri={window.location.origin}
          >
            <App />
          </Auth0Provider>
        </PersistGate>
      </React.StrictMode>
  </Provider>
);


