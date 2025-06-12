import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';
import { WalletProvider } from './context/WalletContext';

// Inicializa React Query Client
const queryClient = new QueryClient();

// Aplica tema guardado si existe
const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
if (savedTheme === 'dark' || savedTheme === 'light') {
  document.body.classList.add(savedTheme);
}

// Montaje de la aplicación en el root con un único App
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <App />
      </WalletProvider>
    </QueryClientProvider>
  </StrictMode>
);
