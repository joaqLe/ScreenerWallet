import { useState } from 'react';
import '../index.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <img src="/vite.svg" alt="Logo" style={{ width: '80px', marginBottom: '1rem' }} />
      <input
        type="text"
        placeholder="usuario@email.com"
        style={{ padding: '0.5rem', width: '250px' }}
      />
      <div style={{ position: 'relative' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Contraseña"
          style={{ padding: '0.5rem', width: '250px' }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{ position: 'absolute', right: '0', top: '0', height: '100%' }}
        >
          {showPassword ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
      <a href="/forgot-password" style={{ fontSize: '0.8rem' }}>Olvidé mi contraseña</a>
      <button style={{ width: '250px' }}>Ingresar</button>
      <div style={{ textAlign: 'center' }}>
        <p>O entra con tu cuenta social</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button>Google</button>
          <button>Apple</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
