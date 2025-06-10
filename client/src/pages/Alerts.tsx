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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/alerts`)
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
