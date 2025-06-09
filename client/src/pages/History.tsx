import { useState } from 'react';

interface Transaction {
  id: number;
  type: 'swap' | 'send' | 'receive';
  date: string; // ISO string
  amount: number;
  token: string;
  status: 'completed' | 'pending' | 'failed';
}

const sampleData: Transaction[] = [
  {
    id: 1,
    type: 'swap',
    date: '2024-04-01T10:24:00Z',
    amount: 1.5,
    token: 'SOL',
    status: 'completed',
  },
  {
    id: 2,
    type: 'send',
    date: '2024-04-02T12:10:00Z',
    amount: 3,
    token: 'USDC',
    status: 'pending',
  },
  {
    id: 3,
    type: 'receive',
    date: '2024-04-03T08:05:00Z',
    amount: 5,
    token: 'SOL',
    status: 'failed',
  },
];

function icon(type: Transaction['type']): string {
  switch (type) {
    case 'swap':
      return '\uD83D\uDD04';
    case 'send':
      return '\uD83D\uDCE4';
    case 'receive':
      return '\uD83D\uDCE5';
  }
}

export default function History() {
  const [typeFilter, setTypeFilter] = useState<'all' | 'swap' | 'send' | 'receive'>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filtered = sampleData
    .filter((tx) => typeFilter === 'all' || tx.type === typeFilter)
    .filter((tx) => (startDate ? tx.date >= startDate : true))
    .filter((tx) => (endDate ? tx.date <= `${endDate}T23:59:59` : true))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      <h2>Historial de Transacciones</h2>
      <div className="filters">
        <label>
          Tipo:
          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(
                e.target.value as 'all' | 'swap' | 'send' | 'receive'
              )
            }
          >
            <option value="all">Todos</option>
            <option value="swap">Swaps</option>
            <option value="send">Envíos</option>
            <option value="receive">Recibos</option>
          </select>
        </label>
        <label>
          Desde:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          Hasta:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </div>
      <ul className="tx-list">
        {filtered.map((tx) => (
          <li key={tx.id} className="tx-item">
            <span className="tx-icon">{icon(tx.type)}</span>
            <span>{new Date(tx.date).toLocaleString()}</span>
            <span>
              {tx.amount} {tx.token}
            </span>
            <span className={`status-${tx.status}`}>{tx.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
