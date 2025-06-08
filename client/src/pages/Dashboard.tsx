import { useEffect, useState } from 'react';

interface PriceData {
  pair: string;
  priceUsd: string;
}

export default function Dashboard() {
  const [data, setData] = useState<PriceData | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/prices?token=solana')
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
