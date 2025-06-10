import { useEffect, useState } from 'react';
import NewAlertModal from 'components/NewAlertModal';
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
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showModal, setShowModal] = useState(false);

  const API_URL =
    (import.meta as any).env?.VITE_API_URL || process.env.VITE_API_URL || '';

  useEffect(() => {
    fetch(`${API_URL}/api/alerts`)
      .then((res) => res.json())
      .then(setAlerts)
      .catch(console.error);
  }, []);

  const handleCreated = (alert: Alert) => {
    setAlerts([...alerts, alert]);

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
    fetch(`${API_URL}/api/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        type,
        condition: { operator, value: Number(value) },
        notify: { push, email, telegram },
      }),
    })
      .then((res) => res.json())
      .then((alert: Alert) => {
        setAlerts([...alerts, alert]);
        setToken('');
        setValue('');
        setPush(false);
        setEmail(false);
        setTelegram(false);
      })
      .catch(console.error);
  };

  const toggleAlert = (alert: Alert) => {
    fetch(`${API_URL}/api/alerts/${alert.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !alert.active }),
    })
      .then((res) => res.json())
      .then((updated: Alert) => {
        setAlerts(alerts.map((a) => (a.id === updated.id ? updated : a)));
      })
      .catch(console.error);
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
      <button onClick={() => setShowModal(true)} style={{ marginBottom: '1rem' }}>
        Nueva alerta
      </button>
      {showModal && (
        <NewAlertModal
          onCreated={handleCreated}
          onClose={() => setShowModal(false)}
        />
      )}
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
