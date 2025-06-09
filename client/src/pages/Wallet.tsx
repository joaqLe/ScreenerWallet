import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

export default function Wallet() {
  const [balance, setBalance] = useState<number | null>(null);
  const [pubkey, setPubkey] = useState<string>('');
  const [inputKey, setInputKey] = useState('');

  useEffect(() => {
    const key = localStorage.getItem('wallet');
    if (key) {
      setPubkey(key);

      const rpcUrl = import.meta.env.VITE_RPC_URL ||
        'https://api.mainnet-beta.solana.com';
      const connection = new Connection(rpcUrl);
      connection.getBalance(new PublicKey(key)).then((lamports: number) => {
        setBalance(lamports / 1e9);
      });

    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'wallet') {
        setPubkey(e.newValue || '');
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (pubkey) {
      const connection = new Connection('https://api.mainnet-beta.solana.com');
      connection
        .getBalance(new PublicKey(pubkey))
        .then((lamports: number) => {
          setBalance(lamports / 1e9);
        })
        .catch(() => setBalance(null));
    } else {
      setBalance(null);
    }
  }, [pubkey]);

  const handleLoad = () => {
    if (inputKey) {
      localStorage.setItem('wallet', inputKey);
      setPubkey(inputKey);
      setInputKey('');
    }
  };

  return (
    <div>
      <h2>Wallet</h2>
      <div>
        <input
          value={inputKey}
          onChange={e => setInputKey(e.target.value)}
          placeholder="Enter public key"
        />
        <button onClick={handleLoad}>Load</button>
      </div>
      {pubkey ? <p>Address: {pubkey}</p> : <p>No wallet loaded</p>}
      {balance !== null && <p>Balance: {balance} SOL</p>}
    </div>
  );
}
