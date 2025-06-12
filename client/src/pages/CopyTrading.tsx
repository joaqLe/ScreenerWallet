// src/pages/CopyTrading.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Define missing types locally
type Trader = {
  alias: string;
  address: string;
};

type FollowedTrader = {
  alias: string;
  address: string;
  copyPercent: number;
};

// Mock implementations for fetchFollowers, followTrader, and unfollowTrader
const fetchFollowers = async (): Promise<FollowedTrader[]> => {
  // Replace with real API call
  return [
    { alias: 'Trader Alpha', address: '0xAlpha', copyPercent: 50 },
  ];
};

const followTrader = async (trader: Trader): Promise<FollowedTrader[]> => {
  // Replace with real API call
  return [
    { alias: trader.alias, address: trader.address, copyPercent: 50 },
  ];
};

const unfollowTrader = async (address: string): Promise<FollowedTrader[]> => {
  // Replace with real API call
  // For the mock, remove the trader with the given address from the mock followers list
  const currentFollowers: FollowedTrader[] = [
    { alias: 'Trader Alpha', address: '0xAlpha', copyPercent: 50 },
  ];
  return currentFollowers.filter(f => f.address !== address);
};

const popularTraders: Trader[] = [
  { alias: 'Trader Alpha', address: '0xAlpha' },
  { alias: 'Trader Beta', address: '0xBeta' },
  { alias: 'Trader Gamma', address: '0xGamma' },
];

export default function CopyTrading() {
  const queryClient = useQueryClient();
  const { data: followers = [], isLoading, error } = useQuery<FollowedTrader[]>({
    queryKey: ['copy', 'followers'],
    queryFn: fetchFollowers,
    initialData: [],
  });

  const followMutation = useMutation<FollowedTrader[], Error, Trader>({
    mutationFn: followTrader,
    onSuccess: (newFollowers: FollowedTrader[]) => {
      queryClient.setQueryData(['copy', 'followers'], newFollowers);
    },
  });

  const unfollowMutation = useMutation<FollowedTrader[], Error, string>({
    mutationFn: unfollowTrader,
    onSuccess: (newFollowers: FollowedTrader[]) => {
      queryClient.setQueryData(['copy', 'followers'], newFollowers);
    },
  });

  const handleFollow = (trader: Trader) => {
    const isFollowed = (followers as FollowedTrader[]).some((f: FollowedTrader) => f.address === trader.address);
    if (isFollowed) unfollowMutation.mutate(trader.address);
    else followMutation.mutate(trader);
  };

  if (isLoading) return <div>Cargando traders...</div>;
  if (error) return <div>Error al cargar traders.</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Copy Trading</h2>
      <h3>Explora traders populares</h3>
      <ul>
        {popularTraders.map((trader: Trader) => (
          <li key={trader.address} style={{ margin: '0.5rem 0' }}>
            <strong>{trader.alias}</strong> ({trader.address}){' '}
            <button onClick={() => handleFollow(trader)}>
              {(followers as FollowedTrader[]).some((f: FollowedTrader) => f.address === trader.address) ? 'Dejar de seguir' : 'Seguir'}
            </button>
          </li>
        ))}
      </ul>

      <h3>Traders seguidos</h3>
      {(followers as FollowedTrader[]).length === 0 ? (
        <p>No sigues a ningún trader.</p>
      ) : (
        <ul>
          {(followers as FollowedTrader[]).map((f: FollowedTrader) => (
            <li key={f.address} style={{ margin: '0.5rem 0' }}>
              <strong>{f.alias}</strong> ({f.address}) - Copia al {f.copyPercent}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
