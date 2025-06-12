import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSniping } from '../hooks/useSniping';

interface Snipe {
  id: number;
  token: string;
  amount: number;
  timestamp: number;
}

const schema = yup
  .object({
    liquidity: yup.number().typeError('Requerido').min(0).required('Requerido'),
    volume: yup.number().typeError('Requerido').min(0).required('Requerido'),
    investment: yup.number().typeError('Requerido').min(0).required('Requerido'),
    active: yup.boolean().required(),
  })
  .required();

type FormValues = yup.InferType<typeof schema>;

export default function Sniping() {
  const { rules, createRule, deleteRule } = useSniping();
  const [snipes, setSnipes] = useState<Snipe[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { active: true },
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/sniping/snipes`)
      .then((res) => res.json())
      .then(setSnipes)
      .catch(console.error);
  }, []);

  const onSubmit = (data: FormValues) => {
    createRule(data).then(() =>
      reset({ liquidity: undefined, volume: undefined, investment: undefined, active: true })
    );
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
        {rules.map((rule) => (
          <li key={rule.id}>
            Liquidez: {rule.liquidity} | Volumen: {rule.volume} | Inversión: {rule.investment} |{' '}
            {rule.active ? 'Activa' : 'Inactiva'}
            <button onClick={() => deleteRule(rule.id)} style={{ marginLeft: '0.5rem' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h3>Últimos snipes</h3>
      <ul>
        {snipes.map((snipe) => (
          <li key={snipe.id}>
            {new Date(snipe.timestamp).toLocaleString()} - {snipe.token} - {snipe.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
