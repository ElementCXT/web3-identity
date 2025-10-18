# Web3 Identity - VerifyID

Una plataforma de verificación de identidad descentralizada construida con Next.js, Wagmi y Avalanche Fuji Testnet.

## 🚀 Características

- **Conexión de Wallet**: Soporte para MetaMask, WalletConnect y otros wallets
- **Verificación Biométrica**: Simulación de verificación de liveness facial
- **NFT-Identidad**: Minteo de NFTs de identidad verificada en Avalanche Fuji
- **UI Moderna**: Interfaz construida con Tailwind CSS y componentes Radix UI
- **Web3 Integrado**: Configuración completa con Wagmi y Viem

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, React 18, TypeScript
- **Web3**: Wagmi, Viem, Ethers.js
- **UI**: Tailwind CSS, Radix UI, Lucide React
- **Blockchain**: Avalanche Fuji Testnet
- **Estado**: React Query (TanStack Query)

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/ElementCXT/web3-identity.git
cd web3-identity
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu-project-id
NEXT_PUBLIC_IDENTITY_NFT_CONTRACT=0x...
NEXT_PUBLIC_VERIFICATION_CONTRACT=0x...
```

4. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

## 🔧 Configuración de WalletConnect

1. Ve a [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Crea un nuevo proyecto
3. Copia tu Project ID
4. Agrégalo a tu archivo `.env.local`

## 🌐 Red Avalanche Fuji

La aplicación está configurada para usar Avalanche Fuji Testnet:

- **Chain ID**: 43113
- **RPC URL**: https://api.avax-test.network/ext/bc/C/rpc
- **Explorer**: https://testnet.snowtrace.io
- **Faucet**: https://faucet.avax.network/

## 🎯 Funcionalidades MVP

### 1. Conexión de Wallet
- Soporte para múltiples wallets (MetaMask, WalletConnect, etc.)
- Detección automática de red
- Cambio automático a Avalanche Fuji
- Visualización de balance AVAX

### 2. Verificación Biométrica
- Simulación de captura facial
- Proceso paso a paso con indicadores visuales
- Generación de hash biométrico simulado
- Manejo de errores y reintentos

### 3. Minteo de NFT
- Interacción con smart contracts
- Visualización de estado de transacción
- Enlaces a SnowTrace para verificar
- Preview del NFT generado

## 📱 Uso

1. **Conectar Wallet**: Haz clic en "Conectar Wallet" y selecciona tu wallet preferido
2. **Cambiar Red**: Si no estás en Fuji, la app te pedirá cambiar automáticamente
3. **Verificación**: Completa el proceso de verificación biométrica simulada
4. **Mintear NFT**: Confirma la transacción para mintear tu NFT-Identidad

## 🔒 Seguridad

- Los datos biométricos no se almacenan
- Solo se genera un hash criptográfico
- Las transacciones se ejecutan en testnet
- Todas las operaciones son transparentes y verificables

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Netlify

1. Conecta tu repositorio a Netlify
2. Configura las variables de entorno
3. Despliega automáticamente

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

## 🔮 Roadmap

- [ ] Integración con smart contracts reales
- [ ] Soporte para múltiples blockchains
- [ ] Dashboard de analytics
- [ ] API de verificación real
- [ ] Integración con IPFS
- [ ] Sistema de reputación
- [ ] Marketplace de identidades verificadas

---

**Nota**: Esta es una versión MVP para demostración. Para uso en producción se requieren contratos inteligentes reales y servicios de verificación biométrica certificados.