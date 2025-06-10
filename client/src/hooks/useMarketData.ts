import { useQuery } from '@tanstack/react-query'

export default function useMarketData(tokenMint: string) {
  const { data, isLoading, error } = useQuery(['price', tokenMint], () =>
    fetch(`${import.meta.env.VITE_API_URL}/prices?token=${tokenMint}`).then(
      (res) => res.json(),
    ),
  )

  const price =
    data?.price ??
    (data?.pairs ? parseFloat(data.pairs[0].priceUsd) : undefined)

  return { price, isLoading, error }
}
