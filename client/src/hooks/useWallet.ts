import { Connection, PublicKey, Keypair } from '@solana/web3.js'
import { useCallback, useEffect, useState } from 'react'

export interface WalletState {
  publicKey: string | null
  balance: number | null
  connect: () => Promise<void>
  disconnect: () => void
}

export default function useWallet(): WalletState {
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const rpcUrl = import.meta.env.VITE_RPC_URL

  const connect = useCallback(async () => {
    let key = localStorage.getItem('wallet')
    if (!key) {
      const kp = Keypair.generate()
      key = kp.publicKey.toBase58()
      localStorage.setItem('wallet', key)
    }
    setPublicKey(key)
  }, [])

  const disconnect = useCallback(() => {
    localStorage.removeItem('wallet')
    setPublicKey(null)
    setBalance(null)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('wallet')
    if (saved) setPublicKey(saved)
  }, [])

  useEffect(() => {
    if (publicKey) {
      const connection = new Connection(rpcUrl)
      connection
        .getBalance(new PublicKey(publicKey))
        .then((lamports) => setBalance(lamports / 1e9))
        .catch(() => setBalance(null))
    } else {
      setBalance(null)
    }
  }, [publicKey, rpcUrl])

  return { publicKey, balance, connect, disconnect }
}
