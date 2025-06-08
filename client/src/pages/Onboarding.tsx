import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

interface Slide {
  title: string;
  text: string;
  button?: string;
  final?: boolean;
}

const slides: Slide[] = [
  {
    title: 'Bienvenido a ScreenerWallet',
    text: 'tu aliado en el trading de tokens Solana',
    button: 'Comenzar ahora',
  },
  {
    title: 'Dashboard en tiempo real',
    text: 'Monitorea precios y movimientos de mercado al instante.',
  },
  {
    title: 'Wallet segura integrada',
    text: 'Guarda y gestiona tus activos sin salir de la app.',
  },
  {
    title: 'Trading ultra r\u00e1pido',
    text: 'Ejecuta swaps y \u00f3rdenes avanzadas en segundos.',
  },
  {
    title: 'Alertas inteligentes',
    text: 'Recibe alertas personalizadas y no pierdas ninguna oportunidad.',
    final: true,
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const next = () => setIndex((i) => Math.min(i + 1, slides.length - 1));
  const start = () => navigate('/dashboard');

  const slide = slides[index];
  return (
    <div className="onboarding-slide">
      <h2>{slide.title}</h2>
      <p>{slide.text}</p>
      {slide.final ? (
        <div>
          <button onClick={start}>Registrarme ahora</button>{' '}
          <button onClick={start}>Ya tengo cuenta</button>
        </div>
      ) : (
        <button onClick={next}>{slide.button || 'Siguiente'}</button>
      )}
    </div>
  );
}
