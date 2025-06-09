import '../index.css';

function ForgotPassword() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <h2>Recuperar Contraseña</h2>
      <p>Recibirás un enlace para restablecer tu contraseña.</p>
      <input type="email" placeholder="tu@email.com" style={{ padding: '0.5rem', width: '250px' }} />
      <button style={{ width: '250px' }}>Enviar enlace</button>
    </div>
  );
}

export default ForgotPassword;
