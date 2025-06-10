import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchFollowers,
  followTrader,
  unfollowTrader,
  FollowedTrader,
  Trader,
} from '../services/copy';

export default function useCopyTrading() {
  const queryClient = useQueryClient();

  const {
    data: followers = [],
    isLoading,
    error,
  } = useQuery<FollowedTrader[]>({
    queryKey: ['followers'],
    queryFn: fetchFollowers,
  });

  const followMutation = useMutation({
    mutationFn: followTrader,
    onSuccess: (data) => {
      queryClient.setQueryData(['followers'], data);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowTrader,
    onSuccess: (data) => {
      queryClient.setQueryData(['followers'], data);
    },
  });

  const updateFollower = (
    address: string,
    updater: (t: FollowedTrader) => FollowedTrader,
  ) => {
    queryClient.setQueryData<FollowedTrader[]>(['followers'], (old = []) =>
      old.map((t) => (t.address === address ? updater(t) : t)),
    );
  };

  return {
    followers,
    isLoading,
    error,
    follow: followMutation.mutate,
    followStatus: followMutation.status,
    unfollow: unfollowMutation.mutate,
    unfollowStatus: unfollowMutation.status,
    updateFollower,
  };
}
