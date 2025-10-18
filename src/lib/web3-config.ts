import { createConfig, http } from 'wagmi'
import { avalancheFuji } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// Configuración de Avalanche Fuji Testnet
export const config = createConfig({
  chains: [avalancheFuji],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id',
    }),
  ],
  transports: {
    [avalancheFuji.id]: http('https://api.avax-test.network/ext/bc/C/rpc'),
  },
})

// Configuración de la red Avalanche Fuji
export const avalancheFujiConfig = {
  chainId: 43113,
  name: 'Avalanche Fuji Testnet',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://api.avax-test.network/ext/bc/C/rpc'] },
    public: { http: ['https://api.avax-test.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io' },
  },
  testnet: true,
}

// Direcciones de contratos para Fuji testnet
export const contractAddresses = {
  identityNFT: '0x0000000000000000000000000000000000000000', // Reemplazar con dirección real
  verificationContract: '0x0000000000000000000000000000000000000000', // Reemplazar con dirección real
}

// URLs de faucets para obtener AVAX de prueba
export const faucetUrls = {
  avalanche: 'https://faucet.avax.network/',
  snowtrace: 'https://testnet.snowtrace.io/faucet',
}
