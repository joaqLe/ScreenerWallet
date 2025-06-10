import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { WalletProvider } from './context/WalletContext'

const queryClient = new QueryClient()

const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
if (savedTheme === 'dark' || savedTheme === 'light') {
  document.body.classList.add(savedTheme)
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    <WalletProvider>
      <App />
    </WalletProvider>
  </StrictMode>,
)
