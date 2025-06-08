import { useEffect, useState } from 'react';

interface PriceData {
  pair: string;
  priceUsd: string;
  pairAddress: string;
}

export default function Dashboard() {
  const [data, setData] = useState<PriceData | null>(null);

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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
