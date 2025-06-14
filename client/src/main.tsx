import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';
import { WalletProvider } from './context/WalletContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';

// Inicializa React Query Client
const queryClient = new QueryClient();

// Aplica tema guardado se maneja en ThemeProvider

// Montaje de la aplicación en el root con un único App
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </WalletProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
