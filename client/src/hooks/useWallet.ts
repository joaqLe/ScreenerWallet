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
}
