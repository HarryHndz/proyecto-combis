import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from '@/presentation/routes/AppRoute'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
