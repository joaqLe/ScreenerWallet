import { useEffect, useState } from 'react';

interface SnipingRule {
  id: number;
  liquidity: number;
  volume: number;
  investment: number;
  active: boolean;
}

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

  const [rules, setRules] = useState<SnipingRule[]>([]);
  const [snipes, setSnipes] = useState<Snipe[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/sniping/rules')
      .then(res => res.json())
      .then(setRules)
      .catch(console.error);

    fetch('http://localhost:3001/api/sniping/snipes')
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
    fetch('http://localhost:3001/api/sniping/rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(rule => {
        setRules([...rules, rule]);
        setLiquidity('');
        setVolume('');
        setInvestment('');
        setActive(true);
      })
      .catch(console.error);
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
