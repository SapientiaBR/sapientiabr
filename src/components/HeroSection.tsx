import React, { useRef } from "react";
import { Button } from '@/components/ui/button';
import { OwlParticles } from '@/three/OwlParticles';
import { RevealText, RevealOnScroll, Magnetic } from '@/motion';
import redMapleLogo from '@/assets/red-maple-logo.png';

const SECTORS = ['Advocacia', 'Clínicas', 'Agências', 'Viagens', 'Imobiliárias', 'Serviços B2B'];

const CLIENTS = [
  { src: '/lovable-uploads/270c4ddf-c48c-4607-b418-b55200a9c04d.png', alt: 'Construtora Zero' },
  { src: redMapleLogo, alt: 'Red Maple' },
  { src: '/lovable-uploads/5a51bd6e-130f-4365-896b-7066b189ded1.png', alt: 'Alline Móveis' },
];

const HeroSection = () => {
  // A dissolução das partículas é dirigida pelo scroll desta seção.
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div id="hero" ref={heroRef} className="relative overflow-hidden bg-sapient-deep">
      {/* Halo do guide: gradiente radial suave no topo, nunca um fundo chapado. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-radial" />

      <div className="container relative z-10 mx-auto pb-20 pt-24">
        <div className="mb-16 flex min-h-[92vh] flex-col items-center justify-center gap-2">
          <OwlParticles scrollTriggerRef={heroRef} />

          <RevealText
            as="h1"
            immediate
            delay={0.15}
            className="hero-title mb-7 max-w-4xl text-balance text-center text-white"
          >
            <em className="accent">IA</em> que atende, vende e organiza a sua operação.
          </RevealText>

          <div className="max-w-3xl text-center">
            <RevealOnScroll delay={0.45}>
              <p className="mb-8 text-lg text-ink-secondary md:text-xl">
                Conectamos WhatsApp, CRM, agenda, pagamentos e sistemas internos com agentes de IA.
                E criamos sites institucionais que colocam sua operação para trabalhar desde o primeiro contato.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Magnetic>
                  <Button
                    className="bg-gradient-sapient px-8 py-6 text-lg font-medium text-white transition-opacity hover:opacity-90"
                    onClick={() => window.open("https://bit.ly/40BtBp2", "_blank")}
                  >
                    Agendar um diagnóstico
                  </Button>
                </Magnetic>
                <button
                  type="button"
                  onClick={() => {
                    const servicesSection = document.getElementById('services');
                    servicesSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-base text-ink-secondary underline underline-offset-4 transition-colors hover:text-white"
                >
                  Ver como funciona
                </button>
              </div>

              <p className="mt-6 font-label text-xs uppercase tracking-widest text-ink-muted">
                IA para atendimento, SDRs e operações
                <span className="mx-2 text-purple-300">|</span>
                Sistemas conectados, sem retrabalho
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Sobre Nós */}
        <RevealOnScroll className="mx-auto max-w-5xl">
          <div className="glass-premium rounded-xl p-6 md:p-8">
            <h2 className="mb-4 text-center text-3xl font-bold text-white">
              Sobre <em className="accent">Nós</em>
            </h2>
            <p className="mb-6 text-center text-ink-secondary">
              A <strong className="text-white">Sapient.IA</strong> desenha sistemas operacionais
              conectados para empresas que não podem perder leads, contexto ou tempo em tarefas manuais.
            </p>

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border-t-[3px] border-purple-400 bg-white/[0.04] p-5">
                <h3 className="mb-2 text-xl font-semibold text-purple-300">Por que Sapient.IA?</h3>
                <p className="text-ink-secondary">
                  Não encaixamos uma ferramenta nova na sua rotina. Entendemos o fluxo que sua equipe
                  já usa e conectamos os pontos que hoje estão soltos.
                </p>
              </div>

              <div className="rounded-lg border-t-[3px] border-cyan-400 bg-white/[0.04] p-5">
                <h3 className="mb-2 text-xl font-semibold text-cyan-300">O que propomos?</h3>
                <p className="text-ink-secondary">
                  Criamos agentes de IA, automações e integrações para atendimento, vendas e operação.
                  Quando faz sentido, o site institucional também entra no ecossistema.
                </p>
              </div>
            </div>

            <p className="text-center italic text-ink-secondary">
              Da primeira mensagem ao onboarding: uma operação com menos passos manuais e mais visibilidade.
            </p>
          </div>
        </RevealOnScroll>

        {/* Prova social */}
        <div className="mt-16 text-center">
          <RevealOnScroll>
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
              Soluções feitas para o seu <em className="accent">contexto</em>.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-ink-secondary">
              Atendimento, vendas e operação pedem fluxos diferentes. A infraestrutura precisa acompanhar.
            </p>
          </RevealOnScroll>

          <RevealOnScroll
            stagger="[data-client]"
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {CLIENTS.map((client) => (
              <div
                key={client.alt}
                data-client
                className="flex h-16 w-32 items-center justify-center rounded-lg bg-white/[0.06] p-2 transition-colors hover:bg-white/10"
              >
                <img
                  src={client.src}
                  alt={client.alt}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </RevealOnScroll>

          <RevealOnScroll
            stagger="[data-sector]"
            className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-3 md:grid-cols-6"
          >
            {SECTORS.map((sector) => (
              <div
                key={sector}
                data-sector
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-medium text-ink-primary"
              >
                {sector}
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex animate-bounce justify-center">
        <a
          href="#pain-points"
          aria-label="Ir para a próxima seção"
          className="text-white/70 transition-colors hover:text-white"
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
