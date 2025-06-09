import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

interface WalletToken {
  symbol: string;
  icon: string;
  amount: number;
  priceUsd: number;
  change24h: number;
}

const tokens: WalletToken[] = [
  { symbol: 'SOL', icon: '🪙', amount: 12.5, priceUsd: 150, change24h: 1.8 },
  { symbol: 'USDC', icon: '💵', amount: 320.0, priceUsd: 1, change24h: 0 },
  { symbol: 'BTC', icon: '₿', amount: 0.02, priceUsd: 68000, change24h: -0.5 },
];

export default function Wallet() {
  const navigate = useNavigate();
  const [solPrice, setSolPrice] = useState<number>(150);

  useEffect(() => {
    fetch('https://api.dexscreener.com/latest/dex/tokens/solana')
      .then(res => res.json())
      .then(json => {
        const p = json.pairs ? parseFloat(json.pairs[0].priceUsd) : 150;
        setSolPrice(p);
      })
      .catch(() => setSolPrice(150));
  }, []);

  const totalUsd = tokens.reduce((sum, t) => sum + t.amount * t.priceUsd, 0);
  const totalSol = totalUsd / solPrice;
  const variation =
    tokens.reduce((sum, t) => sum + t.change24h, 0) / tokens.length;

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div className="dashboard-header">
        <div className="portfolio">
          <div style={{ fontSize: '1.8rem' }}>
            ${totalUsd.toFixed(2)} USD
          </div>
          <div>{totalSol.toFixed(2)} SOL</div>
          <div className={variation >= 0 ? 'positive' : 'negative'}>
            {variation.toFixed(2)}% 24h
          </div>
        </div>
      </div>
      <ul className="token-list">
        {tokens.map(t => (
          <li key={t.symbol}>
            <span>{t.icon}</span>
            <span>{t.symbol}</span>
            <span>{t.amount}</span>
            <span>${(t.amount * t.priceUsd).toFixed(2)}</span>
            <span className={t.change24h >= 0 ? 'positive' : 'negative'}>
              {t.change24h}%
            </span>
          </li>
        ))}
      </ul>
      <div
        style={{
          position: 'fixed',
          bottom: '3.5rem',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <button onClick={() => navigate('/send')}>⬆️ Enviar</button>
        <button onClick={() => navigate('/receive')}>⬇️ Recibir</button>
        <button onClick={() => navigate('/history')}>⏰ Historial</button>
      </div>
    </div>
  );
}
