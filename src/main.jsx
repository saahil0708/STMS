import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { LoginProvider } from './Context/LoginContext.jsx'
import { ToastProvider } from './Context/ToastContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
    </ToastProvider>
  </StrictMode>,
)
