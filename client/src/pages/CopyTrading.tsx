import { useEffect, useState } from 'react';

interface Trader {
  alias: string;
  address: string;
}

interface FollowedTrader extends Trader {
  copyPercent: number;
  active: boolean;
}

const popularTraders: Trader[] = [
  { alias: 'Trader Alpha', address: '0xAlpha' },
  { alias: 'Trader Beta', address: '0xBeta' },
  { alias: 'Trader Gamma', address: '0xGamma' },
];

export default function CopyTrading() {
  const [search, setSearch] = useState('');
  const [followed, setFollowed] = useState<FollowedTrader[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('followedTraders');
    if (stored) {
      setFollowed(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('followedTraders', JSON.stringify(followed));
  }, [followed]);

  const handleFollow = (trader: Trader) => {
    setFollowed(prev => {
      if (prev.find(t => t.address === trader.address)) {
        return prev.filter(t => t.address !== trader.address);
      } else {
        return [...prev, { ...trader, copyPercent: 100, active: true }];
      }
    });
  };

  const updatePercent = (address: string, percent: number) => {
    setFollowed(prev =>
      prev.map(t => (t.address === address ? { ...t, copyPercent: percent } : t))
    );
  };

  const toggleActive = (address: string) => {
    setFollowed(prev =>
      prev.map(t => (t.address === address ? { ...t, active: !t.active } : t))
    );
  };

  const filtered = popularTraders.filter(t =>
    t.alias.toLowerCase().includes(search.toLowerCase()) ||
    t.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Copy Trading</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar trader por alias o dirección"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <h3>Explorador de traders populares</h3>
      <ul>
        {filtered.map(trader => {
          const isFollowed = followed.some(t => t.address === trader.address);
          return (
            <li key={trader.address} style={{ marginBottom: '0.5rem' }}>
              <strong>{trader.alias}</strong> ({trader.address})
              <button
                style={{ marginLeft: '1rem' }}
                onClick={() => handleFollow(trader)}
              >
                {isFollowed ? 'Dejar seguir' : 'Seguir'}
              </button>
            </li>
          );
        })}
      </ul>

      <h3>Traders seguidos</h3>
      {followed.length === 0 && <p>No sigues a ningún trader.</p>}
      <ul>
        {followed.map(trader => (
          <li key={trader.address} style={{ marginBottom: '1rem' }}>
            <strong>{trader.alias}</strong> ({trader.address})
            <div>
              <label>
                Cantidad a copiar (%):
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={trader.copyPercent}
                  onChange={e =>
                    updatePercent(trader.address, Number(e.target.value))
                  }
                  style={{ marginLeft: '0.5rem', width: '60px' }}
                />
              </label>
              <label style={{ marginLeft: '1rem' }}>
                <input
                  type="checkbox"
                  checked={trader.active}
                  onChange={() => toggleActive(trader.address)}
                />{' '}
                Activar copia
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
