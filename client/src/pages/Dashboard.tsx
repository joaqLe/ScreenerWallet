import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';


interface PriceData {
  pair: string;
  priceUsd: string;
  pairAddress: string;

interface TokenInfo {
  symbol: string;
  icon: string;
  priceUsd: number;
  change24h: number;

}

const tokens: TokenInfo[] = [
  { symbol: 'SOL', icon: '🪙', priceUsd: 150, change24h: 2.5 },
  { symbol: 'ETH', icon: '💎', priceUsd: 3300, change24h: -1.2 },
  { symbol: 'BTC', icon: '🪙', priceUsd: 68000, change24h: 3.1 },
];

export default function Dashboard() {
  const [tab, setTab] = useState<'gains' | 'losses' | 'trends'>('gains');

  const sortedGains = [...tokens].sort((a, b) => b.change24h - a.change24h);
  const sortedLosses = [...tokens].sort((a, b) => a.change24h - b.change24h);

  useEffect(() => {
    fetch('https://api.dexscreener.com/latest/dex/tokens/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619')
      .then(res => res.json())
      .then(json => setData(json.pairs ? json.pairs[0] : null))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {data ? (
        <div>
          <p>{data.pair}</p>
          <p>Price: ${data.priceUsd}</p>
          <a href={`/token/${data.pairAddress}`}>Ver detalle</a>

  const getTabData = () => {
    switch (tab) {
      case 'gains':
        return sortedGains;
      case 'losses':
        return sortedLosses;
      default:
        return tokens;
    }
  };

  const portfolioUsd = tokens.reduce((sum, t) => sum + t.priceUsd, 0);
  const portfolioSol = portfolioUsd / 150; // placeholder conversion
  const variation = tokens.reduce((sum, t) => sum + t.change24h, 0) / tokens.length;

  return (
    <div>
      <div className="dashboard-header">
        <div className="portfolio">
          <div>Total: ${portfolioUsd.toFixed(2)} USD</div>
          <div>{portfolioSol.toFixed(2)} SOL</div>
          <div className={variation >= 0 ? 'positive' : 'negative'}>
            {variation.toFixed(2)}% 24h
          </div>

        </div>
        <Link to="/alerts" className="alert-icon">🔔</Link>
      </div>

      <div className="token-tabs">
        <button onClick={() => setTab('gains')}>Top Ganancias</button>
        <button onClick={() => setTab('losses')}>Top Pérdidas</button>
        <button onClick={() => setTab('trends')}>Tendencias recientes</button>
      </div>
      <ul className="token-list">
        {getTabData().map(token => (
          <li key={token.symbol}>
            <Link to={`/token/${token.symbol}`}>
              <span>{token.icon}</span>
              <span>{token.symbol}</span>
              <span>${token.priceUsd}</span>
              <span className={token.change24h >= 0 ? 'positive' : 'negative'}>
                {token.change24h}%
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
