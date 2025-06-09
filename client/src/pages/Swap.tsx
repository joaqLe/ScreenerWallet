import { useState } from 'react';

const ORCA_LOGO_URL =
  'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png';
const RAYDIUM_LOGO_URL =
  'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png';

export default function Swap() {
  const [from, setFrom] = useState('SOL');
  const [to, setTo] = useState('USDC');

  const handleSwap = () => {
    alert(`Swap ${from} -> ${to} (placeholder)`);
  };

  return (
    <div>
      <h2>Swap</h2>
      <label>
        From:
        <input value={from} onChange={e => setFrom(e.target.value)} />
      </label>
      <label>
        To:
        <input value={to} onChange={e => setTo(e.target.value)} />
      </label>
      <button onClick={handleSwap}>Swap</button>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '1rem',
        }}
      >
        <img src={ORCA_LOGO_URL} alt="Orca" width={32} height={32} />
        <span style={{ fontSize: '1.5rem' }}>↔️</span>
        <img src={RAYDIUM_LOGO_URL} alt="Raydium" width={32} height={32} />
      </div>
    </div>
  );
}
