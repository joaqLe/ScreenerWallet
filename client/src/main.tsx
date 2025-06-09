import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
if (savedTheme === 'dark' || savedTheme === 'light') {
  document.body.classList.add(savedTheme)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
