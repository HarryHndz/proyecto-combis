import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from '@/presentation/routes/AppRoute'
import './main.css'
import { AuthProvider } from '@/domain/validation/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>,
)
