'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { avalancheFuji } from 'wagmi/chains'

export interface WalletState {
  isConnected: boolean
  address: string | undefined
  balance: string | undefined
  chainId: number | undefined
  isLoading: boolean
  error: string | null
}

export function useWallet() {
  const { address, isConnected, chainId } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({
    address,
    chainId: avalancheFuji.id,
  })

  const [error, setError] = useState<string | null>(null)

  const walletState: WalletState = {
    isConnected,
    address,
    balance: balance?.formatted,
    chainId,
    isLoading: isPending,
    error,
  }

  const connectWallet = async (connectorId: string) => {
    try {
      setError(null)
      const connector = connectors.find(c => c.id === connectorId)
      if (!connector) {
        throw new Error('Connector no encontrado')
      }
      
      await connect({ connector })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    }
  }

  const disconnectWallet = () => {
    disconnect()
    setError(null)
  }

  const switchToFuji = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xa869' }], // 43113 en hex
        })
      }
    } catch (err) {
      // Si la red no existe, la agregamos
      if (err instanceof Error && err.message.includes('4902')) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xa869',
                chainName: 'Avalanche Fuji Testnet',
                nativeCurrency: {
                  name: 'Avalanche',
                  symbol: 'AVAX',
                  decimals: 18,
                },
                rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
                blockExplorerUrls: ['https://testnet.snowtrace.io'],
              },
            ],
          })
        } catch (addErr) {
          setError('Error al agregar la red Fuji')
        }
      } else {
        setError('Error al cambiar a la red Fuji')
      }
    }
  }

  // Verificar si estamos en la red correcta
  const isCorrectNetwork = chainId === avalancheFuji.id

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    switchToFuji,
    isCorrectNetwork,
    connectors,
  }
}

// Hook para manejar el estado de la aplicación
export function useAppState() {
  const [step, setStep] = useState(0)
  const [logs, setLogs] = useState<string[]>(['Esperando conexión de wallet...'])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isMinting, setIsMinting] = useState(false)

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message])
  }

  const nextStep = () => {
    setStep(prev => prev + 1)
  }

  const resetDemo = () => {
    setStep(0)
    setLogs(['Esperando conexión de wallet...'])
    setIsVerifying(false)
    setIsMinting(false)
  }

  return {
    step,
    logs,
    isVerifying,
    isMinting,
    addLog,
    nextStep,
    resetDemo,
    setIsVerifying,
    setIsMinting,
  }
}
