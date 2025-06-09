import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

export default function Send() {
  const [token, setToken] = useState('SOL');
  const [balance, setBalance] = useState<number | null>(null);
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [usdValue, setUsdValue] = useState('');
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem('wallet');
    if (key) {
      const connection = new Connection('https://api.mainnet-beta.solana.com');
      connection.getBalance(new PublicKey(key)).then((lamports: number) => {
        setBalance(lamports / 1e9);
      });
    }
  }, []);

  useEffect(() => {
    if (amount) {
      fetch(`${import.meta.env.VITE_API_URL}/api/prices?token=solana`)
        .then(res => res.json())
        .then(json => {
          const price = json.pairs ? parseFloat(json.pairs[0].priceUsd) : 0;
          setUsdValue((parseFloat(amount) * price).toFixed(2));
        })
        .catch(() => setUsdValue('0'));
    } else {
      setUsdValue('');
    }
  }, [amount]);

  const handleSend = () => {
    alert(`Sent ${amount} ${token} to ${to} (placeholder)`);
    setConfirm(false);
    setTo('');
    setAmount('');
  };

  return (
    <div>
      <h2>Enviar Tokens</h2>
      <div>
        <label>
          Token:
          <select value={token} onChange={e => setToken(e.target.value)}>
            <option value="SOL">SOL</option>
            <option value="USDC">USDC</option>
          </select>
          {balance !== null && <span> Balance: {balance}</span>}
        </label>
      </div>
      <div>
        <label>
          Dirección destino:
          <input
            value={to}
            onChange={e => setTo(e.target.value)}
            placeholder="Ingresar dirección"
          />
          <button type="button">Escanear QR</button>
        </label>
      </div>
      <div>
        <label>
          Cantidad:
          <input
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0.0"
          />
          {usdValue && <span> (${usdValue} USD)</span>}
        </label>
      </div>
      {confirm ? (
        <div>
          <p>
            Enviar {amount} {token} a {to}
          </p>
          <p>Fee: 0.000005 SOL (estimado)</p>
          <button
            onClick={handleSend}
            style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}
          >
            Confirmar
          </button>
          <button onClick={() => setConfirm(false)}>Cancelar</button>
        </div>
      ) : (
        <button
          onClick={() => setConfirm(true)}
          style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}
        >
          Confirmar transacción
        </button>
      )}
    </div>
  );
}
