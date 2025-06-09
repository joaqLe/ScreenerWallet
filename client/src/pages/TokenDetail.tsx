import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Message {
  text: string;
  timestamp: number;
}

interface Ratings {
  up: number;
  down: number;
}

export default function TokenDetail() {
  const { name } = useParams();
  const token = name || '';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [ratings, setRatings] = useState<Ratings>({ up: 0, down: 0 });

  useEffect(() => {
    const storedChat = localStorage.getItem(`chat_${token}`);
    if (storedChat) {
      setMessages(JSON.parse(storedChat));
    }
    const storedRating = localStorage.getItem(`rating_${token}`);
    if (storedRating) {
      setRatings(JSON.parse(storedRating));
    }
  }, [token]);

  const addMessage = () => {
    if (!input.trim()) return;
    const newMessages = [
      { text: input.trim(), timestamp: Date.now() },
      ...messages,
    ];
    setMessages(newMessages);
    localStorage.setItem(`chat_${token}`, JSON.stringify(newMessages));
    setInput('');
  };

  const vote = (type: 'up' | 'down') => {
    const newRatings = { ...ratings, [type]: ratings[type] + 1 };
    setRatings(newRatings);
    localStorage.setItem(`rating_${token}`, JSON.stringify(newRatings));
  };

  return (
    <div>
      <h2>{token} Details</h2>
      <div>
        <button onClick={() => vote('up')}>👍 {ratings.up}</button>
        <button onClick={() => vote('down')}>👎 {ratings.down}</button>
      </div>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Chat about ${token}`}
        />
        <button onClick={addMessage}>Send</button>
      </div>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}

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
