import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

interface Alert {
  id: string;
  token: string;
  type: string;
  condition: {
    operator: string;
    value: number;
  };
  notify: {
    push: boolean;
    email: boolean;
    telegram: boolean;
  };
  active: boolean;
}

interface Props {
  onCreated: (alert: Alert) => void;
  onClose: () => void;
}

interface FormValues {
  token: string;
  type: string;
  operator: '>' | '<';
  value: number;
  push: boolean;
  email: boolean;
  telegram: boolean;
}

const schema = yup
  .object({
    token: yup.string().required('Token requerido'),
    type: yup.string().required('Tipo requerido'),
    operator: yup.mixed<'>' | '<'>().oneOf(['>', '<']).required('Operador requerido'),
    value: yup
      .number()
      .typeError('Valor requerido')
      .positive('Debe ser positivo')
      .required('Valor requerido'),
    push: yup.boolean(),
    email: yup.boolean(),
    telegram: yup.boolean(),
  })
  .required();

export default function NewAlertModal({ onCreated, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'price',
      operator: '>',
      push: false,
      email: false,
      telegram: false,
    },
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (data: FormValues) => {
    setSubmitting(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: data.token,
        type: data.type,
        condition: { operator: data.operator, value: data.value },
        notify: { push: data.push, email: data.email, telegram: data.telegram },
      }),
    })
      .then((res) => res.json())
      .then((alert: Alert) => {
        onCreated(alert);
        reset();
        onClose();
      })
      .catch(console.error)
      .finally(() => setSubmitting(false));
  };

  return (
    <div style={{ background: '#fff', padding: '1rem', border: '1px solid #ccc' }}>
      <h3>Nueva Alerta</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Token:
            <input {...register('token')} placeholder="SOL" />
          </label>
          {errors.token && <span>{errors.token.message}</span>}
        </div>
        <div>
          <label>
            Tipo:
            <select {...register('type')}>
              <option value="price">Precio</option>
              <option value="volume">Volumen</option>
              <option value="whale">Ballena</option>
              <option value="newToken">Token nuevo</option>
            </select>
          </label>
          {errors.type && <span>{errors.type.message}</span>}
        </div>
        <div>
          <label>
            Condición:
            <select {...register('operator')}>
              <option value=">">Mayor que</option>
              <option value="<">Menor que</option>
            </select>
            <input type="number" {...register('value')} />
          </label>
          {(errors.operator || errors.value) && (
            <span>{errors.operator?.message || errors.value?.message}</span>
          )}
        </div>
        <div>
          <label>
            <input type="checkbox" {...register('push')} /> Push móvil
          </label>
          <label>
            <input type="checkbox" {...register('email')} /> Email
          </label>
          <label>
            <input type="checkbox" {...register('telegram')} /> Telegram
          </label>
        </div>
        <button type="submit" disabled={submitting}>
          Crear alerta
        </button>
        <button type="button" onClick={onClose} disabled={submitting}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
