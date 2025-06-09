import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface PriceData {
  pair: string;
  priceUsd: string;
  token: string;
}

export default function Dashboard() {
  const tokens = ['solana', 'ethereum', 'bitcoin'];
  const [prices, setPrices] = useState<PriceData[]>([]);

  useEffect(() => {
    Promise.all(
      tokens.map((t) =>
        fetch(`http://localhost:3001/api/prices?token=${t}`)
          .then((res) => res.json())
          .then((json) => {
            const pair = json.pairs ? json.pairs[0] : null;
            return pair
              ? { pair: pair.pair, priceUsd: pair.priceUsd, token: t }
              : null;
          })
          .catch(() => null)
      )
    ).then((all) => setPrices(all.filter(Boolean) as PriceData[]));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {prices.map((p) => (
          <li key={p.token}>
            <Link to={`/token/${p.token}`}>{p.pair}</Link> - ${p.priceUsd}
          </li>
        ))}
      </ul>
    </div>
  );
}
