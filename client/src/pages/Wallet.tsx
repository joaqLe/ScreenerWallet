import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

export default function Wallet() {
  const [balance, setBalance] = useState<number | null>(null);
  const [pubkey, setPubkey] = useState<string>('');

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
  }, []);

  return (
    <div>
      <h2>Wallet</h2>
      {pubkey ? <p>Address: {pubkey}</p> : <p>No wallet loaded</p>}
      {balance !== null && <p>Balance: {balance} SOL</p>}
    </div>
  );
}
