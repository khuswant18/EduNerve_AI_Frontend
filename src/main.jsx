import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

if (!googleClientId && import.meta.env.DEV) {
  console.warn('Missing VITE_GOOGLE_CLIENT_ID. Google Login will be disabled until you configure it.')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
