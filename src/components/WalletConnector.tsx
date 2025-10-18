'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useWallet } from '@/hooks/useWallet'
import { Wallet, ChevronDown, ExternalLink, Copy, Check } from 'lucide-react'

interface WalletConnectorProps {
  onConnect?: () => void
  className?: string
}

export function WalletConnector({ onConnect, className }: WalletConnectorProps) {
  const { 
    isConnected, 
    address, 
    balance, 
    isLoading, 
    error, 
    connectWallet, 
    disconnectWallet, 
    switchToFuji, 
    isCorrectNetwork,
    connectors 
  } = useWallet()

  const [showConnectors, setShowConnectors] = useState(false)
  const [copied, setCopied] = useState(false)

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleConnect = async (connectorId: string) => {
    await connectWallet(connectorId)
    setShowConnectors(false)
    onConnect?.()
  }

  if (isConnected && address) {
    return (
      <div className={className}>
        <Card className="glass border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Wallet Conectada
            </CardTitle>
            <CardDescription>
              {isCorrectNetwork ? (
                <span className="text-green-400">✓ Conectado a Avalanche Fuji</span>
              ) : (
                <span className="text-yellow-400">⚠ Red incorrecta</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-sm">{formatAddress(address)}</p>
                <p className="text-xs text-muted-foreground">
                  Balance: {balance ? `${parseFloat(balance).toFixed(4)} AVAX` : 'Cargando...'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyAddress}
                className="h-8 w-8 p-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            {!isCorrectNetwork && (
              <Button
                onClick={switchToFuji}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                size="sm"
              >
                Cambiar a Fuji Testnet
              </Button>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://testnet.snowtrace.io/address/${address}`, '_blank')}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver en SnowTrace
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={disconnectWallet}
                className="flex-1"
              >
                Desconectar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={className}>
      <Card className="glass border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Conectar Wallet
          </CardTitle>
          <CardDescription>
            Conecta tu wallet para comenzar la verificación
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={() => setShowConnectors(!showConnectors)}
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                'Conectando...'
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Seleccionar Wallet
                  <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            {showConnectors && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                {connectors.map((connector) => (
                  <Button
                    key={connector.id}
                    variant="outline"
                    onClick={() => handleConnect(connector.id)}
                    className="w-full justify-start"
                    disabled={isLoading}
                  >
                    <div className="w-6 h-6 mr-3 rounded-full bg-gradient-to-br from-primary to-accent" />
                    {connector.name}
                  </Button>
                ))}
              </div>
            )}

            <div className="text-xs text-muted-foreground text-center pt-2">
              <p>Necesitas AVAX de prueba? </p>
              <a
                href="https://faucet.avax.network/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Obtener AVAX gratis →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
