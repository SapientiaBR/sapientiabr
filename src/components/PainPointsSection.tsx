import React from 'react';
import { Clock, DollarSign, Users, TimerOff, MessageSquare, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/spotlight-card';
import { RevealOnScroll, RevealText, Magnetic } from '@/motion';

const PainPointsSection = () => {
  /**
   * Cada card usa um accent diferente. O Brand Guide trata essa variedade como
   * intencional: cria ritmo visual e diferencia categorias, em vez de virar uma
   * parede de cards idênticos.
   */
  const painPoints = [
    {
      Icon: Clock,
      accent: 'var(--accent-coral)',
      title: "Processos Lentos",
      description: "Eliminamos gargalos operacionais que consomem o tempo da sua equipe e atrasam entregas."
    },
    {
      Icon: DollarSign,
      accent: 'var(--accent-amber)',
      title: "Custo Elevado",
      description: "Reduzimos desperdícios financeiros através da automação inteligente de tarefas repetitivas."
    },
    {
      Icon: Users,
      accent: 'var(--accent-lime)',
      title: "Falta de Leads",
      description: "Implementamos sistemas de aquisição que trazem clientes qualificados constantemente."
    },
    {
      Icon: TimerOff,
      accent: 'var(--accent-rose)',
      title: "Baixa Produtividade",
      description: "Otimizamos o fluxo de trabalho para que sua equipe foque no que realmente gera valor."
    },
    {
      Icon: MessageSquare,
      accent: 'var(--accent-sky)',
      title: "Atendimento Ineficiente",
      description: "Automatizamos o suporte para garantir respostas rápidas e satisfação do cliente 24/7."
    },
    {
      Icon: Briefcase,
      accent: 'var(--accent-indigo)',
      title: "Gestão Desorganizada",
      description: "Centralizamos seus dados e processos em uma estrutura clara e fácil de gerenciar."
    }
  ];

  return (
    <section id="pain-points" className="bg-sapient-dark py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <RevealText as="h2" className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Problemas que <em className="accent">Resolvemos</em>
          </RevealText>
          <RevealOnScroll delay={0.15}>
            <p className="text-ink-secondary max-w-2xl mx-auto">
              Identificamos os principais desafios que os negócios enfrentam hoje e desenvolvemos
              soluções inteligentes para superá-los.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll
          stagger="[data-pain]"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {painPoints.map(({ Icon, accent, title, description }) => (
            <div key={title} data-pain className="h-full">
              <GlowCard
                glowColor="red"
                customSize
                className="h-full p-6 group !grid-rows-none !flex !flex-col transition-transform duration-300 hover:-translate-y-1"
              >
                {/* border-top 3px no accent do card — regra do Brand Guide. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl"
                  style={{ backgroundColor: accent }}
                />
                <div className="mb-4 flex items-center gap-3">
                  <Icon className="w-8 h-8" style={{ color: accent }} />
                  <h3 className="text-xl font-semibold" style={{ color: accent }}>{title}</h3>
                </div>
                <p className="text-ink-secondary">{description}</p>
              </GlowCard>
            </div>
          ))}
        </RevealOnScroll>
        
        {/* FOMO Section */}
        <RevealOnScroll className="mt-20 bg-gradient-sapient rounded-lg p-8 text-white text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Não perca mais tempo e dinheiro!</h3>
          <p className="mb-6 text-lg">
            Enquanto você hesita, seus concorrentes já estão automatizando seus processos e conquistando seus clientes. 
            <strong className="block mt-2">Apenas 3 vagas disponíveis este mês para implementação prioritária!</strong>
          </p>
          <div className="flex justify-center">
            <Magnetic>
              <Button
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg transition-colors"
                onClick={() => window.open("https://bit.ly/40BtBp2", "_blank")}
              >
                Garanta sua vaga agora!
              </Button>
            </Magnetic>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default PainPointsSection;
