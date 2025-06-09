import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);

  const passwordValid = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordValid && accepted) {
      localStorage.setItem('user', JSON.stringify({ email, username }));
      navigate('/wallet-setup');
    }
  };

  return (
    <div>
      <h2>Crea tu cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="ejemplo@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="nombre_usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {!passwordValid && password && (
            <p style={{ color: 'red' }}>
              Mínimo 8 caracteres, una mayúscula, un número
            </p>
          )}
        </div>
        <label>
          <input
            type="checkbox"
            checked={accepted}
            onChange={e => setAccepted(e.target.checked)}
          />
          Acepto <a href="#">términos y condiciones</a>
        </label>
        <div>
          <button type="submit" disabled={!passwordValid || !accepted}>
            Crear cuenta
          </button>
        </div>
      </form>
      <p>O regístrate con tu cuenta social</p>
      <div>
        <button style={{ background: 'white', color: 'black' }}>G</button>
        <button style={{ background: 'black', color: 'white' }}></button>
      </div>
    </div>
  );
}
