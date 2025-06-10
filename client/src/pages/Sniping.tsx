import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface SnipingRule {
  id: number;
  liquidity: number;
  volume: number;
  investment: number;
  active: boolean;
}
import { useSniping } from '../hooks/useSniping';

interface Snipe {
  id: number;
  token: string;
  amount: number;
  timestamp: number;
}

export default function Sniping() {
  const schema = yup
    .object({
      liquidity: yup
        .number()
        .typeError('Requerido')
        .min(0, 'Debe ser mayor o igual a 0')
        .required('Requerido'),
      volume: yup
        .number()
        .typeError('Requerido')
        .min(0, 'Debe ser mayor o igual a 0')
        .required('Requerido'),
      investment: yup
        .number()
        .typeError('Requerido')
        .min(0, 'Debe ser mayor o igual a 0')
        .required('Requerido'),
      active: yup.boolean().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    liquidity: number;
    volume: number;
    investment: number;
    active: boolean;
  }>({
    resolver: yupResolver(schema),
    defaultValues: { active: true },
  });

  const { rules, createRule, deleteRule } = useSniping();
  const [snipes, setSnipes] = useState<Snipe[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/sniping/snipes`)
      .then(res => res.json())
      .then(setSnipes)
      .catch(console.error);
  }, []);

  const onSubmit = (data: {
    liquidity: number;
    volume: number;
    investment: number;
    active: boolean;
  }) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/sniping/rules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((rule) => {
        setRules([...rules, rule]);
        reset({ liquidity: undefined, volume: undefined, investment: undefined, active: true });
      })
      .catch(console.error);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      liquidity: Number(liquidity),
      volume: Number(volume),
      investment: Number(investment),
      active,
    };
    createRule(body).then(() => {
      setLiquidity('');
      setVolume('');
      setInvestment('');
      setActive(true);
    });
  };

  return (
    <div>
      <h2>Sniping</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Liquidez mínima (SOL/USD):
          <input type="number" {...register('liquidity')} />
        </label>
        {errors.liquidity && <span>{errors.liquidity.message}</span>}
        <br />
        <label>
          Volumen inicial:
          <input type="number" {...register('volume')} />
        </label>
        {errors.volume && <span>{errors.volume.message}</span>}
        <br />
        <label>
          Cantidad automática invertir:
          <input type="number" {...register('investment')} />
        </label>
        {errors.investment && <span>{errors.investment.message}</span>}
        <br />
        <label>
          Activa:
          <input type="checkbox" {...register('active')} />
        </label>
        {errors.active && <span>{errors.active.message}</span>}
        <br />
        <button type="submit">Crear Regla</button>
      </form>

      <h3>Reglas</h3>
      <ul>
        {rules.map(rule => (
          <li key={rule.id}>
            Liquidez: {rule.liquidity} | Volumen: {rule.volume} | Inversión:{' '}
            {rule.investment} | {rule.active ? 'Activa' : 'Inactiva'}
            <button
              onClick={() => deleteRule(rule.id)}
              style={{ marginLeft: '0.5rem' }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h3>Últimos snipes</h3>
      <ul>
        {snipes.map(snipe => (
          <li key={snipe.id}>
            {new Date(snipe.timestamp).toLocaleString()} - {snipe.token} - {snipe.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
