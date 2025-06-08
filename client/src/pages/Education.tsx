import React from 'react';

const tutorials = [
  {
    title: 'Cómo evitar scams',
    embed: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    title: 'Uso avanzado de ScreenerWallet',
    embed: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export default function Education() {
  return (
    <div>
      <h2>Sección Educativa</h2>
      <p>Mini-tutoriales cortos para mejorar tu seguridad y aprovechar funciones avanzadas.</p>
      {tutorials.map((tut, idx) => (
        <div key={idx} style={{ marginBottom: '1rem' }}>
          <h3>{tut.title}</h3>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src={tut.embed}
              title={tut.title}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ))}
    </div>
  );
}
