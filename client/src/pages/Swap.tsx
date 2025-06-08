import { useState } from 'react';

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
    </div>
  );
}
