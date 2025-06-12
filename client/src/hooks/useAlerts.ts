// src/hooks/useAlerts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';

export interface Alert {
  id: string;
  token: string;
  type: string;
  condition: { operator: string; value: number };
  notify: { push: boolean; email: boolean; telegram: boolean };
  active: boolean;
}

export function useAlerts() {
  const queryClient = useQueryClient();

  // Consulta de alertas
  const alerts = useQuery<Alert[]>({
    queryKey: ['alerts'],
    queryFn: () => api.get<Alert[]>('/alerts'),
  });

  // Crear alerta
  const createAlert = useMutation({
    mutationFn: (data: Omit<Alert, 'id' | 'active'>) => api.post<Alert>('/alerts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  // Actualizar alerta
  const updateAlert = useMutation({
    mutationFn: ({ id, ...data }: Partial<Alert> & { id: string }) =>
      api.patch<Alert>(`/alerts/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  // Borrar alerta
  const deleteAlert = useMutation({
    mutationFn: (id: string) => api.delete(`/alerts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  return { alerts, createAlert, updateAlert, deleteAlert };
}
