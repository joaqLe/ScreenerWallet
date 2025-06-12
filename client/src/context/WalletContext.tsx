import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import useWallet from '../hooks/useWallet';
import type { WalletState } from '../hooks/useWallet';

const WalletContext = createContext<WalletState | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const wallet = useWallet();
  return <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>;
}

export function useWalletContext(): WalletState {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error('useWalletContext must be used within WalletProvider');
  }
  return ctx;
}

export default WalletContext;