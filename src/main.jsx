import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'
import AuthProvider from './contexts/AuthProvider'
import LCProvider from './contexts/LCProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LCProvider>
        <RouterProvider router={router} />
      </LCProvider>
    </AuthProvider>
  </StrictMode>,
)
