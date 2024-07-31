import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'
import {Auth0Provider} from '@auth0/auth0-react';
import { REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_DOMAIN } from './env'



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
      
      
    
    <ThemeProvider>
      <App/>
      </ThemeProvider>
      </Auth0Provider>
    </BrowserRouter>
    
  </React.StrictMode>,
)
