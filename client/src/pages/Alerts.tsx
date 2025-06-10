import { useState } from 'react';
import { useAlerts } from '../hooks/useAlerts';

interface Alert {
  id: string;
  token: string;
  type: string;
  condition: {
    operator: string;
    value: number;
  };
  notify: {
    push: boolean;
    email: boolean;
    telegram: boolean;
  };
  active: boolean;
}

export default function Alerts() {
  const { alerts: alertsQuery, createAlert, updateAlert } = useAlerts();
  const [token, setToken] = useState('');
  const [type, setType] = useState('price');
  const [operator, setOperator] = useState('>');
  const [value, setValue] = useState('');
  const [push, setPush] = useState(false);
  const [email, setEmail] = useState(false);
  const [telegram, setTelegram] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAlert.mutate({
      token,
      type,
      condition: { operator, value: Number(value) },
      notify: { push, email, telegram },
    });
    setToken('');
    setValue('');
    setPush(false);
    setEmail(false);
    setTelegram(false);
  };

  const toggleAlert = (alert: Alert) => {
    updateAlert.mutate({ id: alert.id, active: !alert.active });
  };

  return (
    <div>
      <h2>Alertas</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <div>
          <label>
            Token:
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="SOL"
            />
          </label>
        </div>
        <div>
          <label>
            Tipo:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="price">Precio</option>
              <option value="volume">Volumen</option>
              <option value="whale">Ballena</option>
              <option value="newToken">Token nuevo</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Condición:
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
            >
              <option value="">-</option>
              <option value=">">Mayor que</option>
              <option value="<">Menor que</option>
            </select>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={push}
              onChange={(e) => setPush(e.target.checked)}
            />
            Push móvil
          </label>
          <label>
            <input
              type="checkbox"
              checked={email}
              onChange={(e) => setEmail(e.target.checked)}
            />
            Email
          </label>
          <label>
            <input
              type="checkbox"
              checked={telegram}
              onChange={(e) => setTelegram(e.target.checked)}
            />
            Telegram
          </label>
        </div>
        <button type="submit">Crear alerta</button>
      </form>
      <h3>Alertas activas</h3>
      <ul>
        {alertsQuery.data?.map((a) => (
          <li key={a.id}>
            {a.token} {a.type} {a.condition.operator} {a.condition.value} -{' '}
            {a.active ? 'Activo' : 'Inactivo'}
            <button onClick={() => toggleAlert(a)} style={{ marginLeft: '0.5rem' }}>
              {a.active ? 'Desactivar' : 'Activar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
