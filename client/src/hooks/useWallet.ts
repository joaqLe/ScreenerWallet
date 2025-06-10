import { useEffect, useState } from 'react'
import { Connection, Keypair } from '@solana/web3.js'
import { mnemonicToSeedSync } from 'bip39'

const SEED_KEY = 'seed_enc'
const WALLET_KEY = 'wallet'
const ENC_KEY = 'screener'

const xor = (text: string, key: string) =>
  [...text]
    .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length)))
    .join('')

const encrypt = (text: string) => btoa(xor(text, ENC_KEY))
const decrypt = (data: string) => xor(atob(data), ENC_KEY)

export default function useWallet() {
  const [connection, setConnection] = useState<Connection | null>(null)
  const [publicKey, setPublicKey] = useState<string | null>(null)

  useEffect(() => {
    const url = import.meta.env.VITE_SOLANA_RPC
    if (url) setConnection(new Connection(url))
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem(SEED_KEY)
    if (stored) {
      try {
        const phrase = decrypt(stored)
        const seed = mnemonicToSeedSync(phrase).slice(0, 32)
        const kp = Keypair.fromSeed(seed)
        const pk = kp.publicKey.toBase58()
        localStorage.setItem(WALLET_KEY, pk)
        setPublicKey(pk)
      } catch (e) {
        console.error('Failed to load wallet', e)
      }
    }
  }, [])

  const saveSeed = (phrase: string) => {
    localStorage.setItem(SEED_KEY, encrypt(phrase))
    const seed = mnemonicToSeedSync(phrase).slice(0, 32)
    const kp = Keypair.fromSeed(seed)
    const pk = kp.publicKey.toBase58()
    localStorage.setItem(WALLET_KEY, pk)
    setPublicKey(pk)
  }

  const disconnect = () => {
    setConnection(null)
    setPublicKey(null)
  }

  return { connection, publicKey, saveSeed, disconnect }
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
