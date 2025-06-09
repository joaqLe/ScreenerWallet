import { useNavigate } from 'react-router-dom';

export default function WalletSetup() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Configura tu wallet segura</h2>
      <p>Selecciona una opción:</p>
      <div>
        <button onClick={() => navigate('/seed-phrase')}>Crear nueva wallet</button>
      </div>
      <div>
        <button onClick={() => alert('Importar wallet no implementado')}>Importar wallet existente</button>
      </div>
    </div>
  );
}
