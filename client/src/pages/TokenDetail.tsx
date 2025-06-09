import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface PairData {
  chainId: string;
  pairAddress: string;
  priceUsd: string;
  priceChange: { h24: number };
  liquidity: { usd: number };
  volume: { h24: number };
  fdv: number | null;
  baseToken: { name: string; symbol: string; logoURI?: string | null };
}

export default function TokenDetail() {
  const { address = '' } = useParams();
  const navigate = useNavigate();
  const [pair, setPair] = useState<PairData | null>(null);
  const [tab, setTab] = useState<'trades' | 'orders' | 'security'>('trades');

  useEffect(() => {
    if (!address) return;
    fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`)
      .then(res => res.json())
      .then(json => setPair(json.pairs ? json.pairs[0] : null))
      .catch(console.error);
  }, [address]);

  const priceChange = pair?.priceChange?.h24 ?? 0;
  const priceColor = priceChange >= 0 ? 'green' : 'red';

  return (
    <div style={{ paddingBottom: '80px' }}>
      {pair ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {pair.baseToken.logoURI && (
              <img src={pair.baseToken.logoURI} alt="logo" width={50} />
            )}
            <h2>
              {pair.baseToken.name} ({pair.baseToken.symbol})
            </h2>
          </div>
          <div style={{ fontSize: '2rem' }}>
            ${parseFloat(pair.priceUsd).toFixed(4)}{' '}
            <span style={{ color: priceColor }}>
              {priceChange.toFixed(2)}%
            </span>
          </div>
          <iframe
            title="chart"
            src={`https://dexscreener.com/${pair.chainId}/${pair.pairAddress}?embed=1`}
            width="100%"
            height="400"
            style={{ border: 'none', marginTop: '1rem' }}
          />
          <div style={{ marginTop: '1rem' }}>
            <p>Marketcap: {pair.fdv ? `$${pair.fdv.toLocaleString()}` : 'N/A'}</p>
            <p>Liquidez: ${pair.liquidity.usd.toLocaleString()}</p>
            <p>Volumen 24h: ${pair.volume.h24.toLocaleString()}</p>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => setTab('trades')}>Trades recientes</button>
            <button onClick={() => setTab('orders')}>Órdenes abiertas</button>
            <button onClick={() => setTab('security')}>Seguridad contrato</button>
            <div style={{ marginTop: '0.5rem' }}>
              {tab === 'trades' && <p>Datos de trades no disponibles en la API.</p>}
              {tab === 'orders' && <p>No hay órdenes abiertas.</p>}
              {tab === 'security' && <p>Score de seguridad: N/A</p>}
            </div>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
      <button
        style={{
          position: 'fixed',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#2e8b57',
          color: 'white',
          padding: '1rem 2rem',
          fontSize: '1.2rem',
        }}
        onClick={() => navigate(`/swap?token=${address}`)}
      >
        Swap ahora
      </button>
    </div>
  );
}
