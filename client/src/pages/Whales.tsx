import { useEffect, useState } from 'react';

interface WhaleTransaction {
  id: number;
  address: string;
  token: string;
  amount: number;
  timestamp: string;
}

interface WhaleAlert {
  address: string;
  token: string;
  amount: number;
}

export default function Whales() {
  const [transactions, setTransactions] = useState<WhaleTransaction[]>([]);
  const [tracked, setTracked] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<WhaleAlert[]>([]);

  const [newAddress, setNewAddress] = useState('');
  const [alertAddress, setAlertAddress] = useState('');
  const [alertToken, setAlertToken] = useState('');
  const [alertAmount, setAlertAmount] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/whales')
      .then(res => res.json())
      .then(json => setTransactions(json.transactions || []))
      .catch(console.error);

    fetch('http://localhost:3001/api/whales/tracked')
      .then(res => res.json())
      .then(json => setTracked(json.tracked || []))
      .catch(console.error);

    fetch('http://localhost:3001/api/whales/alerts')
      .then(res => res.json())
      .then(json => setAlerts(json.alerts || []))
      .catch(console.error);
  }, []);

  const addAddress = () => {
    fetch('http://localhost:3001/api/whales/tracked', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: newAddress }),
    })
      .then(res => res.json())
      .then(json => {
        setTracked(json.tracked || []);
        setNewAddress('');
      })
      .catch(console.error);
  };

  const addAlert = () => {
    fetch('http://localhost:3001/api/whales/alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: alertAddress,
        token: alertToken,
        amount: Number(alertAmount),
      }),
    })
      .then(res => res.json())
      .then(json => {
        setAlerts(json.alerts || []);
        setAlertAddress('');
        setAlertToken('');
        setAlertAmount('');
      })
      .catch(console.error);
  };

  return (
    <div>
      <h2>Whale Tracker</h2>

      <section>
        <h3>Recent Whale Transactions</h3>
        <ul>
          {transactions.map(tx => (
            <li key={tx.id}>
              {tx.address} &ndash; {tx.token} {tx.amount} ({new Date(tx.timestamp).toLocaleString()})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Tracked Addresses</h3>
        <ul>
          {tracked.map(addr => (
            <li key={addr}>{addr}</li>
          ))}
        </ul>
        <input
          value={newAddress}
          onChange={e => setNewAddress(e.target.value)}
          placeholder="Whale address"
        />
        <button onClick={addAddress}>Track Address</button>
      </section>

      <section>
        <h3>Whale Alerts</h3>
        <ul>
          {alerts.map((a, i) => (
            <li key={i}>
              {a.address} &ndash; {a.token} over {a.amount}
            </li>
          ))}
        </ul>
        <input
          value={alertAddress}
          onChange={e => setAlertAddress(e.target.value)}
          placeholder="Address"
        />
        <input
          value={alertToken}
          onChange={e => setAlertToken(e.target.value)}
          placeholder="Token"
        />
        <input
          type="number"
          value={alertAmount}
          onChange={e => setAlertAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={addAlert}>Add Alert</button>
      </section>
    </div>
  );
}
