import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './routes/AppRoute'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
