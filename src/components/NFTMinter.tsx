'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { avalancheFuji } from 'wagmi/chains'
import { ImageIcon, Loader2, CheckCircle, ExternalLink, Copy } from 'lucide-react'

interface NFTMinterProps {
  onComplete: (tokenId: string) => void
  onLog: (message: string) => void
  className?: string
}

// ABI simplificado para el contrato de NFT (simulado)
const NFT_CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "tokenURI", "type": "string"},
      {"internalType": "bytes32", "name": "biometricHash", "type": "bytes32"}
    ],
    "name": "mintIdentityNFT",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export function NFTMinter({ onComplete, onLog, className }: NFTMinterProps) {
  const { address } = useAccount()
  const [isMinting, setIsMinting] = useState(false)
  const [mintedTokenId, setMintedTokenId] = useState<string | null>(null)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const contractAddress = '0x0000000000000000000000000000000000000000' // Reemplazar con dirección real

  const mintNFT = async () => {
    if (!address) {
      onLog('✗ Error: Wallet no conectada')
      return
    }

    setIsMinting(true)
    onLog('Preparando transacción...')

    try {
      // Generar hash biométrico simulado
      const biometricHash = '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
      
      // URI del metadata del NFT (simulado)
      const tokenURI = `https://api.verifyid.io/metadata/${address.toLowerCase()}`

      onLog('Firmando transacción en wallet...')

      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: NFT_CONTRACT_ABI,
        functionName: 'mintIdentityNFT',
        args: [tokenURI, biometricHash as `0x${string}`],
        chainId: avalancheFuji.id,
      })

      onLog('Transacción enviada a la blockchain...')
    } catch (err) {
      onLog(`✗ Error al mintear NFT: ${err instanceof Error ? err.message : 'Error desconocido'}`)
      setIsMinting(false)
    }
  }

  // Manejar confirmación de transacción
  if (hash && !transactionHash) {
    setTransactionHash(hash)
    onLog(`Transacción enviada: ${hash.slice(0, 10)}...`)
  }

  if (isConfirmed && hash && !mintedTokenId) {
    // Simular token ID (en producción vendría del evento del contrato)
    const simulatedTokenId = Math.floor(Math.random() * 10000).toString()
    setMintedTokenId(simulatedTokenId)
    onLog(`✓ NFT minteado exitosamente! Token ID: #${simulatedTokenId}`)
    onLog('✓ Verificación completada')
    onComplete(simulatedTokenId)
    setIsMinting(false)
  }

  const copyTransactionHash = async () => {
    if (transactionHash) {
      await navigator.clipboard.writeText(transactionHash)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getStatusMessage = () => {
    if (isPending) return 'Firmando transacción...'
    if (isConfirming) return 'Esperando confirmación...'
    if (isConfirmed) return 'NFT minteado exitosamente!'
    if (error) return 'Error en la transacción'
    return 'Listo para mintear'
  }

  const getStatusColor = () => {
    if (isPending || isConfirming) return 'text-yellow-400'
    if (isConfirmed) return 'text-green-400'
    if (error) return 'text-red-400'
    return 'text-muted-foreground'
  }

  return (
    <div className={className}>
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Mintear NFT-Identidad
          </CardTitle>
          <CardDescription>
            Crea tu NFT-Identidad verificada en Avalanche Fuji
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview del NFT */}
          <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border border-white/10 overflow-hidden">
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">NFT-Identidad</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Token de identidad verificada
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Verificación biométrica ✓</p>
                <p>• Blockchain: Avalanche Fuji</p>
                <p>• Estándar: ERC-721</p>
              </div>
            </div>
          </div>

          {/* Estado de la transacción */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estado:</span>
              <span className={`text-sm ${getStatusColor()}`}>
                {getStatusMessage()}
              </span>
            </div>

            {transactionHash && (
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Hash de transacción:
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyTransactionHash}
                    className="h-6 w-6 p-0"
                  >
                    {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <p className="text-xs font-mono break-all">
                  {transactionHash}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://testnet.snowtrace.io/tx/${transactionHash}`, '_blank')}
                  className="mt-2 w-full"
                >
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Ver en SnowTrace
                </Button>
              </div>
            )}

            {mintedTokenId && (
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">
                    NFT Minteado Exitosamente
                  </span>
                </div>
                <p className="text-sm text-green-300">
                  Token ID: #{mintedTokenId}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://testnet.snowtrace.io/token/${contractAddress}`, '_blank')}
                  className="mt-2 w-full"
                >
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Ver NFT en SnowTrace
                </Button>
              </div>
            )}
          </div>

          {/* Información de costos */}
          <div className="text-xs text-muted-foreground bg-white/5 p-3 rounded-lg">
            <p className="font-semibold mb-1">💰 Costos estimados:</p>
            <p>• Gas fee: ~0.001 AVAX</p>
            <p>• Sin costo de minteo (testnet)</p>
          </div>

          {/* Botón de minteo */}
          <Button
            onClick={mintNFT}
            disabled={isMinting || isPending || isConfirming || isConfirmed}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isMinting || isPending || isConfirming ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isPending ? 'Firmando...' : isConfirming ? 'Confirmando...' : 'Minteando...'}
              </>
            ) : isConfirmed ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                NFT Minteado
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                Mintear NFT-Identidad
              </>
            )}
          </Button>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">
                Error: {error.message}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
