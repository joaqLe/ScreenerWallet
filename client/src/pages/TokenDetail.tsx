import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface PriceData {
  pair: string;
  priceUsd: string;
  priceChange: string;
}

export default function TokenDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const [data, setData] = useState<PriceData | null>(null);

  useEffect(() => {
    if (!symbol) return;
    fetch(`http://localhost:3001/api/prices?token=${symbol}`)
      .then(res => res.json())
      .then(json => {
        if (json.pairs && json.pairs[0]) {
          const pair = json.pairs[0];
          setData({
            pair: pair.baseToken.symbol,
            priceUsd: pair.priceUsd,
            priceChange: pair.priceChange.h24,
          });
        }
      })
      .catch(console.error);
  }, [symbol]);

  return (
    <div>
      <h2>Token {symbol}</h2>
      {data ? (
        <div>
          <p>Precio: ${data.priceUsd}</p>
          <p>Cambio 24h: {data.priceChange}%</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <Link to="/">Volver</Link>
    </div>
  );
}
