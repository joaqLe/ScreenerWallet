import React, { useState } from 'react';

const faqData = [
  {
    q: '¿Qué es ScreenerWallet?',
    a: 'Una aplicación experimental para visualizar precios y gestionar tu wallet.'
  },
  {
    q: '¿Cómo evito scams?',
    a: 'No compartas tus claves privadas y verifica siempre las URLs oficiales.'
  },
  {
    q: '¿Dónde puedo reportar problemas?',
    a: 'Envía un correo al equipo o abre un issue en el repositorio.'
  }
];

export default function FAQ() {
  const [search, setSearch] = useState('');
  const filtered = faqData.filter(item =>
    item.q.toLowerCase().includes(search.toLowerCase()) ||
    item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Preguntas Frecuentes</h2>
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <div>
        {filtered.map((item, idx) => (
          <details key={idx} style={{ marginBottom: '0.5rem', textAlign: 'left' }}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
