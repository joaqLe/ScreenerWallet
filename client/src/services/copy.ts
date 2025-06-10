export interface Trader {
  alias: string;
  address: string;
}

export interface FollowedTrader extends Trader {
  copyPercent: number;
  active: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchFollowers(): Promise<FollowedTrader[]> {
  const res = await fetch(`${API_URL}/api/copy/followers`);
  if (!res.ok) {
    throw new Error('Failed to fetch followers');
  }
  const json = await res.json();
  return json.followers ?? json;
}

export async function followTrader(trader: Trader): Promise<FollowedTrader[]> {
  const res = await fetch(`${API_URL}/api/copy/follow`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trader),
  });
  if (!res.ok) {
    throw new Error('Failed to follow trader');
  }
  const json = await res.json();
  return json.followers ?? json;
}

export async function unfollowTrader(address: string): Promise<FollowedTrader[]> {
  const res = await fetch(`${API_URL}/api/copy/unfollow`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address }),
  });
  if (!res.ok) {
    throw new Error('Failed to unfollow trader');
  }
  const json = await res.json();
  return json.followers ?? json;
}
