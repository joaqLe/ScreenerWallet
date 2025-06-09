import { useState, useEffect } from 'react';

export default function Swap() {
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [usdValue, setUsdValue] = useState('');
  const [route] = useState<'Orca' | 'Raydium'>('Orca');
  const [balance, setBalance] = useState<number | null>(null);
  const [slippage] = useState(0.5);
  const [fee] = useState(0.000005);
  const [confirm, setConfirm] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const [txId, setTxId] = useState('');

  useEffect(() => {
    const key = localStorage.getItem('wallet');
    if (key && fromToken === 'SOL') {
      import('@solana/web3.js')
        .then(({ Connection, PublicKey }) => {
          const connection = new Connection(
            'https://api.mainnet-beta.solana.com'
          );
          connection.getBalance(new PublicKey(key)).then((lamports: number) => {
            setBalance(lamports / 1e9);
          });
        })
        .catch(() => setBalance(null));
    } else {
      setBalance(null);
    }
  }, [fromToken]);

  useEffect(() => {
    if (fromAmount) {
      const token = fromToken === 'SOL' ? 'solana' : fromToken.toLowerCase();
      fetch(`http://localhost:3001/api/prices?token=${token}`)
        .then(res => res.json())
        .then(json => {
          const price = json.pairs ? parseFloat(json.pairs[0].priceUsd) : 0;
          setUsdValue((parseFloat(fromAmount) * price).toFixed(2));
          setToAmount(fromAmount);
        })
        .catch(() => {
          setUsdValue('0');
          setToAmount(fromAmount);
        });
    } else {
      setUsdValue('');
      setToAmount('');
    }
  }, [fromAmount, fromToken]);

  const handleConfirm = () => {
    setConfirm(false);
    setSwapped(true);
    setTxId(Math.random().toString(36).substring(2, 10).toUpperCase());
  };

  if (swapped) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', color: 'green' }}>✔️</div>
        <p>Swap completado</p>
        <p>
          {fromAmount} {fromToken} → {toAmount} {toToken}
        </p>
        <p>Fee: {fee} SOL</p>
        <p>TX ID: {txId}</p>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      <h2>Swap</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Token origen:
          <select
            value={fromToken}
            onChange={e => setFromToken(e.target.value)}
          >
            <option value="SOL">SOL</option>
            <option value="USDC">USDC</option>
          </select>
          {balance !== null && <span> Balance: {balance}</span>}
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Cantidad:
          <input
            value={fromAmount}
            onChange={e => setFromAmount(e.target.value)}
            placeholder="0.0"
          />
        </label>
        {usdValue && <div>≈ ${usdValue} USD</div>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Token destino:
          <select value={toToken} onChange={e => setToToken(e.target.value)}>
            <option value="USDC">USDC</option>
            <option value="SOL">SOL</option>
          </select>
        </label>
        {toAmount && (
          <div>
            Recibirás: {toAmount} {toToken}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {route === 'Orca' ? (
          <img
            src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png"
            alt="Orca"
            width={32}
            height={32}
          />
        ) : (
          <img
            src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png"
            alt="Raydium"
            width={32}
            height={32}
          />
        )}
        <span>Ruta: {route}</span>
        <span>Slippage: {slippage}%</span>
        <span>Fee: {fee} SOL</span>
      </div>
      {confirm ? (
        <div style={{ marginTop: '1rem' }}>
          <p>
            Swappear {fromAmount} {fromToken} por {toAmount} {toToken}
          </p>
          <button
            onClick={handleConfirm}
            style={{
              fontSize: '1.2rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#0078d4',
              color: 'white',
            }}
          >
            Confirmar Swap
          </button>
          <button onClick={() => setConfirm(false)}>Cancelar</button>
        </div>
      ) : (
        <button
          onClick={() => setConfirm(true)}
          style={{
            marginTop: '1rem',
            fontSize: '1.2rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0078d4',
            color: 'white',
          }}
        >
          Confirmar Swap
        </button>
      )}
    </div>
  );
}

