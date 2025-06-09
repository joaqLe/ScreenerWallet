import { useEffect, useState } from 'react';
import { generateMnemonic } from 'bip39';
import { useNavigate } from 'react-router-dom';

export default function SeedPhrase() {
  const [words, setWords] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const phrase = generateMnemonic();
    setWords(phrase.split(' '));
    localStorage.setItem('seed', phrase);
  }, []);

  return (
    <div>
      <p>
        Tu frase semilla (seed phrase) es tu clave privada. Escríbela y guárdala en un lugar seguro. Nunca la compartas.
      </p>
      <ol>
        {words.map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ol>
      <button onClick={() => navigate('/confirm-seed')}>Ya la guardé, continuar</button>
    </div>
  );
}
