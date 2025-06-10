import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { SnipingRule, NewRule } from '../services/sniping';
import { fetchRules, createRule, deleteRule } from '../services/sniping';

export function useSniping() {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ['snipingRules'],
    queryFn: fetchRules,
  });

  const create = useMutation({
    mutationFn: (rule: NewRule) => createRule(rule),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['snipingRules'] }),
  });

  const remove = useMutation({
    mutationFn: (id: number) => deleteRule(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['snipingRules'] }),
  });

  return {
    rules: data as SnipingRule[],
    isLoading,
    createRule: create.mutateAsync,
    deleteRule: remove.mutateAsync,
  };
}
