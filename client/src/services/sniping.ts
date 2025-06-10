export interface SnipingRule {
  id: number;
  liquidity?: number;
  volume?: number;
  investment?: number;
  active?: boolean;
  token?: string;
  amount?: number;
}

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/sniping`;

export async function fetchRules(): Promise<SnipingRule[]> {
  const res = await fetch(`${BASE_URL}/rules`);
  if (!res.ok) {
    throw new Error('Failed to fetch rules');
  }
  return res.json();
}

export type NewRule = Omit<SnipingRule, 'id'>;

export async function createRule(rule: NewRule): Promise<SnipingRule> {
  const res = await fetch(`${BASE_URL}/rules`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rule),
  });
  if (!res.ok) {
    throw new Error('Failed to create rule');
  }
  return res.json();
}

export async function deleteRule(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/rules/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete rule');
  }
}
