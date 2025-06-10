import { useEffect, useState } from 'react';
import { useSniping } from '../hooks/useSniping';

interface Snipe {
  id: number;
  token: string;
  amount: number;
  timestamp: number;
}

export default function Sniping() {
  const [liquidity, setLiquidity] = useState('');
  const [volume, setVolume] = useState('');
  const [investment, setInvestment] = useState('');
  const [active, setActive] = useState(true);

  const { rules, createRule, deleteRule } = useSniping();
  const [snipes, setSnipes] = useState<Snipe[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/sniping/snipes`)
      .then(res => res.json())
      .then(setSnipes)
      .catch(console.error);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      liquidity: Number(liquidity),
      volume: Number(volume),
      investment: Number(investment),
      active,
    };
    createRule(body).then(() => {
      setLiquidity('');
      setVolume('');
      setInvestment('');
      setActive(true);
    });
  };

  return (
    <div>
      <h2>Sniping</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Liquidez mínima (SOL/USD):
          <input value={liquidity} onChange={e => setLiquidity(e.target.value)} />
        </label>
        <br />
        <label>
          Volumen inicial:
          <input value={volume} onChange={e => setVolume(e.target.value)} />
        </label>
        <br />
        <label>
          Cantidad automática invertir:
          <input value={investment} onChange={e => setInvestment(e.target.value)} />
        </label>
        <br />
        <label>
          Activa:
          <input
            type="checkbox"
            checked={active}
            onChange={e => setActive(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit">Crear Regla</button>
      </form>

      <h3>Reglas</h3>
      <ul>
        {rules.map(rule => (
          <li key={rule.id}>
            Liquidez: {rule.liquidity} | Volumen: {rule.volume} | Inversión:{' '}
            {rule.investment} | {rule.active ? 'Activa' : 'Inactiva'}
            <button
              onClick={() => deleteRule(rule.id)}
              style={{ marginLeft: '0.5rem' }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h3>Últimos snipes</h3>
      <ul>
        {snipes.map(snipe => (
          <li key={snipe.id}>
            {new Date(snipe.timestamp).toLocaleString()} - {snipe.token} - {snipe.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
