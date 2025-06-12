import { useState } from 'react';
import NewAlertModal from '../components/NewAlertModal';
import { useAlerts } from '../hooks/useAlerts';

export default function Alerts() {
  const { alerts, updateAlert } = useAlerts();
  const [showModal, setShowModal] = useState(false);

  const handleCreated = () => {
    setShowModal(false);
  };

  const toggleAlert = (alertId: string, active: boolean) => {
    updateAlert.mutate({ id: alertId, active: !active });
  };

  return (
    <div>
      <h2>Alertas</h2>
      <button onClick={() => setShowModal(true)} style={{ marginBottom: '1rem' }}>
        Nueva alerta
      </button>
      {showModal && (
        <NewAlertModal onCreated={handleCreated} onClose={() => setShowModal(false)} />
      )}
      <h3>Alertas activas</h3>
      <ul>
        {(alerts.data as any[] | undefined)?.map((a) => (
          <li key={a.id}>
            {a.token} {a.type} {a.condition.operator} {a.condition.value} -{' '}
            {a.active ? 'Activo' : 'Inactivo'}
            <button onClick={() => toggleAlert(a.id, a.active)} style={{ marginLeft: '0.5rem' }}>
              {a.active ? 'Desactivar' : 'Activar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
