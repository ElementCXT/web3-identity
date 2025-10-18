'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface BiometricVerificationProps {
  onComplete: (success: boolean) => void
  onLog: (message: string) => void
  className?: string
}

export function BiometricVerification({ onComplete, onLog, className }: BiometricVerificationProps) {
  const [step, setStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const steps = [
    { id: 0, name: 'Preparación', description: 'Preparando cámara y sensores...' },
    { id: 1, name: 'Captura', description: 'Capturando imagen facial...' },
    { id: 2, name: 'Análisis', description: 'Analizando características biométricas...' },
    { id: 3, name: 'Verificación', description: 'Verificando autenticidad...' },
    { id: 4, name: 'Completado', description: 'Verificación exitosa' },
  ]

  const startVerification = async () => {
    setIsProcessing(true)
    setError(null)
    onLog('Iniciando verificación biométrica...')

    for (let i = 0; i < steps.length; i++) {
      setStep(i)
      onLog(`${steps[i].name}: ${steps[i].description}`)
      
      // Simular tiempo de procesamiento
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    }

    // Simular éxito (90% de probabilidad)
    const success = Math.random() > 0.1
    
    if (success) {
      onLog('✓ Verificación biométrica exitosa')
      onLog('✓ Identidad verificada y certificada')
      onComplete(true)
    } else {
      setError('La verificación biométrica falló. Por favor, inténtalo de nuevo.')
      onLog('✗ Error en la verificación biométrica')
      onComplete(false)
    }

    setIsProcessing(false)
  }

  const resetVerification = () => {
    setStep(0)
    setError(null)
    setIsProcessing(false)
  }

  return (
    <div className={className}>
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Verificación Biométrica
          </CardTitle>
          <CardDescription>
            Verifica tu identidad usando tecnología de reconocimiento facial
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Simulación de cámara */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-white/10 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {isProcessing ? (
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      {steps[step]?.description || 'Procesando...'}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {error ? 'Error en la captura' : 'Cámara lista para captura'}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Overlay de progreso */}
              {isProcessing && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs text-white">
                      Paso {step + 1} de {steps.length}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <div 
                      className="bg-accent h-1 rounded-full transition-all duration-500"
                      style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Indicadores de estado */}
          <div className="space-y-2">
            {steps.map((s, index) => (
              <div
                key={s.id}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                  step > index
                    ? 'bg-green-500/10 border border-green-500/20'
                    : step === index
                    ? 'bg-accent/10 border border-accent/20'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  step > index
                    ? 'bg-green-500 text-white'
                    : step === index
                    ? 'bg-accent text-white'
                    : 'bg-white/10 text-muted-foreground'
                }`}>
                  {step > index ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-semibold">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    step >= index ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {s.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3">
            {!isProcessing && !error && step === 0 && (
              <Button
                onClick={startVerification}
                className="flex-1 bg-accent hover:bg-accent/90"
              >
                <Camera className="w-4 h-4 mr-2" />
                Iniciar Verificación
              </Button>
            )}

            {error && (
              <>
                <Button
                  onClick={resetVerification}
                  variant="outline"
                  className="flex-1"
                >
                  Reintentar
                </Button>
                <Button
                  onClick={() => onComplete(false)}
                  variant="ghost"
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </>
            )}
          </div>

          {/* Información de privacidad */}
          <div className="text-xs text-muted-foreground bg-white/5 p-3 rounded-lg">
            <p className="font-semibold mb-1">🔒 Privacidad garantizada</p>
            <p>
              Tus datos biométricos no se almacenan. Solo se genera una prueba criptográfica 
              de verificación que se almacena en la blockchain.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
