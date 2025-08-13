import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AccountProvider } from './contexts/account.context.jsx'
import { ToastProvider } from './contexts/toast.context.jsx'
import { FavoriteProvider } from './contexts/favorite.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccountProvider>
      <FavoriteProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </FavoriteProvider>
    </AccountProvider>
  </StrictMode>,
)
