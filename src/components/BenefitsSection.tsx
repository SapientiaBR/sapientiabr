import React, { useLayoutEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { RevealText, useReducedMotion, gsap } from '@/motion';

const BENEFITS = [
  'Menos tarefas repetitivas para SDRs e atendimento',
  'Conversas e dados do cliente no contexto certo',
  'Leads encaminhados para o próximo passo do funil',
  'Processos padronizados, sem depender de memória ou planilhas',
  'Mais tempo da equipe para decisões e relacionamento',
  'Uma base operacional preparada para crescer com consistência',
];

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || reduced) return;

    // Pin é caro em tela estreita e rouba altura útil no celular; ali a lista
    // simplesmente aparece de uma vez.
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-benefit]', pin);
      const marks = gsap.utils.toArray<HTMLElement>('[data-benefit-mark]', pin);

      // A seção trava e o checklist acende item a item conforme o scroll
      // avança. `scrub` amarra o progresso da animação ao da barra de rolagem,
      // então o usuário controla o ritmo.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=110%',
          pin,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      tl.from(items, { opacity: 0.18, xPercent: -2, stagger: 1, ease: 'none' }, 0)
        .from(marks, { opacity: 0.2, scale: 0.7, stagger: 1, ease: 'none' }, 0);

      return () => tl.kill();
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section id="benefits" ref={sectionRef} className="bg-sapient-deep">
      <div ref={pinRef} className="flex min-h-screen items-center py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-gradient-subtle p-6 md:p-10">
              <RevealText
                as="h2"
                className="mb-8 text-center text-4xl font-bold leading-[1.1] text-white md:text-5xl"
              >
                O que muda com uma operação <em className="accent">conectada</em>.
              </RevealText>

              <p className="mb-10 text-center text-lg text-ink-secondary md:text-xl">
                A automação não substitui o conhecimento da sua equipe. Ela tira o trabalho manual do caminho
                para que cada pessoa atue com mais contexto, ritmo e controle.
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {BENEFITS.map((benefit, index) => (
                  <div key={benefit} data-benefit>
                    <GlowCard
                      glowColor={index % 2 === 0 ? 'purple' : 'blue'}
                      customSize
                      className="!grid-rows-none !flex h-full items-start gap-4 p-5"
                    >
                      <CheckCircle
                        data-benefit-mark
                        className="mt-1 h-6 w-6 flex-shrink-0 text-purple-300"
                      />
                      <p className="text-lg font-medium text-ink-primary">{benefit}</p>
                    </GlowCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
