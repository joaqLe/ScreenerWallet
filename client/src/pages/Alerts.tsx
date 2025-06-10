import { useEffect, useState } from 'react';
import NewAlertModal from 'components/NewAlertModal';

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
  };

  const toggleAlert = (alert: Alert) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/alerts/${alert.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !alert.active }),
    })
      .then((res) => res.json())
      .then((updated: Alert) => {
        setAlerts(alerts.map((a) => (a.id === updated.id ? updated : a)));
      })
      .catch(console.error);
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
        {alerts.map((a) => (
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
