import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import {Auth0Provider} from '@auth0/auth0-react';
import { REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_DOMAIN } from './env'
import { store } from './app/store'
import ShoppingCart from './components/ShoppinCart'



const domain = REACT_APP_AUTH0_DOMAIN
const clientId = REACT_APP_AUTH0_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider 
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    useRefreshTokens={true}
    cacheLocation="localstorage">
      
      
    
    
    <Provider store={store}>
      <App/>
      <ShoppingCart/>
    </Provider>
      
      </Auth0Provider>
    </BrowserRouter>
    
  </React.StrictMode>,
)
