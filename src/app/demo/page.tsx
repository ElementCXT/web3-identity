"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WalletConnector } from "@/components/WalletConnector";
import { BiometricVerification } from "@/components/BiometricVerification";
import { NFTMinter } from "@/components/NFTMinter";
import { useWallet, useAppState } from "@/hooks/useWallet";
import { RotateCcw } from "lucide-react";

export default function DemoPage() {
  const { isConnected, isCorrectNetwork } = useWallet();
  const { step, logs, addLog, nextStep, resetDemo } = useAppState();

  const steps = [
    { id: 0, name: "Connect", label: "Conectar Wallet" },
    { id: 1, name: "Liveness", label: "Verificación Liveness" },
    { id: 2, name: "Mint", label: "Emitir NFT" }
  ];

  const handleWalletConnect = () => {
    if (isConnected && isCorrectNetwork) {
      addLog("✓ Wallet conectada a Avalanche Fuji");
      nextStep();
    }
  };

  const handleVerificationComplete = (success: boolean) => {
    if (success) {
      nextStep();
    }
  };

  const handleNFTComplete = (tokenId: string) => {
    addLog(`🎉 Proceso completado! Token ID: #${tokenId}`);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary" />
              <span className="font-bold text-xl">VerifyID</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost">← Volver al inicio</Button>
              </Link>
              <WalletConnector />
            </div>
          </div>
        </div>
      </nav>

      {/* Testnet Banner */}
      <div className="mt-16 bg-accent/20 border-y border-accent/30 py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-accent mr-2 animate-pulse" />
            Demo – Avalanche Fuji Testnet
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Demo Interactiva</h1>
            <p className="text-xl text-muted-foreground">Experimenta el flujo completo de verificación</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Demo Area */}
            <div className="lg:col-span-2">
              <Card className="glass border-white/10">
                <CardContent className="p-8">
                  {/* Stepper */}
                  <div className="w-full max-w-md mb-12">
                    <div className="flex items-center justify-between">
                      {steps.map((s, idx) => (
                        <div key={s.id} className="flex items-center flex-1">
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                                step > s.id
                                  ? "bg-accent text-accent-foreground"
                                  : step === s.id
                                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                                  : "bg-white/5 text-muted-foreground"
                              }`}
                            >
                              {step > s.id ? "✓" : idx + 1}
                            </div>
                            <span className={`text-xs font-medium ${step >= s.id ? "text-foreground" : "text-muted-foreground"}`}>
                              {s.label}
                            </span>
                          </div>
                          {idx < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-2 ${step > s.id ? "bg-accent" : "bg-white/10"}`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="space-y-6">
                    {step === 0 && (
                      <div className="text-center">
                        <WalletConnector 
                          onConnect={handleWalletConnect}
                          className="max-w-md mx-auto"
                        />
                        {!isConnected && (
                          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <p className="text-sm text-yellow-400">
                              ⚠️ Conecta tu wallet para continuar con la demo
                            </p>
                          </div>
                        )}
                        {isConnected && !isCorrectNetwork && (
                          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-sm text-red-400">
                              ⚠️ Cambia a Avalanche Fuji Testnet para continuar
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {step === 1 && (
                      <BiometricVerification
                        onComplete={handleVerificationComplete}
                        onLog={addLog}
                      />
                    )}

                    {step === 2 && (
                      <NFTMinter
                        onComplete={handleNFTComplete}
                        onLog={addLog}
                      />
                    )}
                  </div>

                  {/* Reset Button */}
                  {step > 0 && (
                    <div className="mt-8 text-center">
                      <Button
                        variant="outline"
                        onClick={resetDemo}
                        className="glass glass-hover"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reiniciar Demo
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Status Logs Sidebar */}
            <div className="lg:col-span-1">
              <Card className="glass border-white/10 sticky top-20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Estado de la transacción
                  </h3>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {logs.map((log, idx) => (
                      <div
                        key={idx}
                        className="text-sm p-2 rounded bg-white/5 border border-white/5 font-mono animate-in slide-in-from-bottom-2"
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="glass border-white/10">
              <CardContent className="p-6">
                <div className="text-accent mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Seguro y Privado</h3>
                <p className="text-sm text-muted-foreground">Tus datos biométricos nunca se almacenan, solo se genera una prueba criptográfica</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardContent className="p-6">
                <div className="text-accent mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Rápido y Eficiente</h3>
                <p className="text-sm text-muted-foreground">El proceso completo toma menos de 2 minutos de principio a fin</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardContent className="p-6">
                <div className="text-accent mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Verificación On-Chain</h3>
                <p className="text-sm text-muted-foreground">Tu identidad verificada queda registrada permanentemente en Avalanche</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}