import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConfirmSeed() {
  const navigate = useNavigate();
  const phrase = localStorage.getItem('seed') || '';
  const words = phrase.split(' ');

  const indices = useMemo(() => {
    const arr: number[] = [];
    while (arr.length < 3 && words.length > 0) {
      const n = Math.floor(Math.random() * words.length);
      if (!arr.includes(n)) arr.push(n);
    }
    return arr;
  }, [words]);

  const [inputs, setInputs] = useState<string[]>(Array(indices.length).fill(''));

  const valid = inputs.every((val, i) => val.trim() === words[indices[i]]);

  const handleChange = (i: number, val: string) => {
    const next = [...inputs];
    next[i] = val;
    setInputs(next);
  };

  const handleConfirm = () => {
    if (valid) {
      alert('Wallet creada');
      navigate('/wallet');
    }
  };

  return (
    <div>
      <h2>Confirma tu seed phrase</h2>
      {indices.map((idx, i) => (
        <div key={idx}>
          <label>Palabra {idx + 1}:</label>
          <input
            value={inputs[i]}
            onChange={e => handleChange(i, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleConfirm} disabled={!valid}>Confirmar</button>
    </div>
  );
}
