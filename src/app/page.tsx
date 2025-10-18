import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WalletConnector } from "@/components/WalletConnector";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary" />
              <span className="font-bold text-xl">VerifyID</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm hover:text-primary transition-colors">Inicio</Link>
              <Link href="/demo" className="text-sm hover:text-primary transition-colors">Demo</Link>
              <Link href="/for-creators" className="text-sm hover:text-primary transition-colors">Para Creadores</Link>
              <Link href="/legal" className="text-sm hover:text-primary transition-colors">Legal</Link>
            </div>
            <WalletConnector />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(162,89,247,0.15),transparent_50%)]" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Verifica tu identidad y licencia tu imagen con{" "}
              <span className="gradient-text">NFTs</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ayudamos a creadores y marcas a verificar identidad y licenciar su imagen con NFTs, en minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Probar demo
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="glass glass-hover text-lg px-8">
                Ver video (2:00)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-white/10">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground mb-8">Confiado por equipos líderes</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {["Avalanche", "Ethereum", "OpenSea", "MetaMask", "Chainlink", "IPFS"].map((brand) => (
              <div key={brand} className="text-2xl font-bold">{brand}</div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Cómo funciona</h2>
            <p className="text-xl text-muted-foreground">Tres pasos simples para asegurar tu identidad digital</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Conecta tu Wallet",
                description: "Conecta tu billetera Web3 de forma segura. Compatible con MetaMask, WalletConnect y más."
              },
              {
                step: "02",
                title: "Verifica tu Identidad",
                description: "Pasa nuestra verificación de liveness biométrica en segundos. Tus datos permanecen privados."
              },
              {
                step: "03",
                title: "Recibe tu NFT",
                description: "Obtén tu NFT-Identidad verificado en Avalanche Fuji. Úsalo en campañas, colaboraciones y marketplaces."
              }
            ].map((item) => (
              <Card key={item.step} className="glass glass-hover border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader>
                  <div className="text-6xl font-bold gradient-text mb-4">{item.step}</div>
                  <CardTitle className="text-2xl mb-2">{item.title}</CardTitle>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ve cómo funciona</h2>
            <p className="text-xl text-muted-foreground">Prueba nuestra plataforma en acción</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="glass rounded-2xl p-2 border border-white/10">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-lg text-muted-foreground">Demo interactivo disponible</p>
                  <Link href="/demo">
                    <Button className="mt-4 bg-primary hover:bg-primary/90">
                      Probar Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Planes flexibles</h2>
            <p className="text-xl text-muted-foreground">Elige el plan que mejor se adapte a tus necesidades</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfecto para empezar",
                features: [
                  "1 NFT-Identidad",
                  "Verificación básica",
                  "Soporte por email",
                  "Almacenamiento en IPFS"
                ]
              },
              {
                name: "Creator",
                price: "$29",
                description: "Para creadores de contenido",
                features: [
                  "10 NFT-Identidades",
                  "Verificación avanzada",
                  "Soporte prioritario",
                  "Dashboard analítico",
                  "Integraciones API"
                ],
                popular: true
              },
              {
                name: "Business",
                price: "$99",
                description: "Para equipos y empresas",
                features: [
                  "NFT-Identidades ilimitados",
                  "Verificación enterprise",
                  "Soporte 24/7",
                  "White-label",
                  "Smart contracts personalizados",
                  "SLA garantizado"
                ]
              }
            ].map((plan) => (
              <Card
                key={plan.name}
                className={`glass glass-hover border-white/10 relative ${
                  plan.popular ? "border-primary/50 shadow-lg shadow-primary/20" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-semibold">
                    Más popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`} variant={plan.popular ? "default" : "outline"}>
                    Comenzar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Preguntas frecuentes</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "¿Qué es un NFT-Identidad?",
                  answer: "Un NFT-Identidad es un token único que certifica tu identidad digital verificada mediante biometría. Te permite demostrar autenticidad en plataformas Web3 y colaboraciones."
                },
                {
                  question: "¿Es segura la verificación de liveness?",
                  answer: "Sí, utilizamos tecnología biométrica de última generación. Tus datos biométricos nunca se almacenan, solo se genera una prueba criptográfica de verificación."
                },
                {
                  question: "¿En qué blockchains está disponible?",
                  answer: "Actualmente soportamos Avalanche Fuji Testnet para pruebas. En producción estará disponible en Avalanche Mainnet, Polygon y Ethereum."
                },
                {
                  question: "¿Puedo usar el NFT-Identidad en múltiples plataformas?",
                  answer: "Sí, tu NFT-Identidad es compatible con cualquier marketplace o plataforma que soporte el estándar ERC-721."
                },
                {
                  question: "¿Qué pasa si pierdo acceso a mi wallet?",
                  answer: "Puedes recuperar tu wallet usando tu frase semilla. Si la perdiste, podemos ayudarte a emitir un nuevo NFT-Identidad después de una nueva verificación."
                },
                {
                  question: "¿Hay costos adicionales por transacciones?",
                  answer: "Solo pagas las gas fees de la blockchain que elijas. Recomendamos Avalanche por sus bajas tarifas (menos de $0.01 por transacción)."
                }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass border border-white/10 rounded-lg px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary" />
                <span className="font-bold text-xl">VerifyID</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Verificación de identidad descentralizada para el futuro de Web3.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/demo" className="hover:text-foreground transition-colors">Demo</Link></li>
                <li><Link href="/for-creators" className="hover:text-foreground transition-colors">Para Creadores</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Docs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Sobre nosotros</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="/legal" className="hover:text-foreground transition-colors">Legal</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Comunidad</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Twitter</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Discord</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">GitHub</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-sm text-muted-foreground">
            <p>© 2025 VerifyID. Todos los derechos reservados. Este NFT es un utility token sin promesas financieras.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}