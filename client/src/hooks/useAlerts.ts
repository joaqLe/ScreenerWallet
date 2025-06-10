import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';

interface Alert {
  id: string;
  token: string;
  type: string;
  condition: { operator: string; value: number };
  notify: { push: boolean; email: boolean; telegram: boolean };
  active: boolean;
}

export function useAlerts() {
  const queryClient = useQueryClient();

  const alerts = useQuery<Alert[]>('alerts', () => api.get('/alerts'));

  const createAlert = useMutation({
    mutationFn: (data: Omit<Alert, 'id' | 'active'>) =>
      api.post<Alert>('/alerts', data),
    onSuccess: () => queryClient.invalidateQueries('alerts'),
  });

  const updateAlert = useMutation({
    mutationFn: ({ id, ...data }: Partial<Alert> & { id: string }) =>
      api.patch<Alert>(`/alerts/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries('alerts'),
  });

  const deleteAlert = useMutation({
    mutationFn: (id: string) => api.delete(`/alerts/${id}`),
    onSuccess: () => queryClient.invalidateQueries('alerts'),
  });

  return { alerts, createAlert, updateAlert, deleteAlert };
}
