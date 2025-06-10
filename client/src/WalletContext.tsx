import { createContext, useContext, useState, ReactNode } from 'react';

type WalletContextType = {
  publicKey: string | null;
  setPublicKey: (key: string | null) => void;
};

const WalletContext = createContext<WalletContextType>({
  publicKey: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPublicKey: () => {},
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);

  return (
    <WalletContext.Provider value={{ publicKey, setPublicKey }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);

export default WalletContext;
