import React from 'react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Icon3D, type Icon3DName } from '@/components/ui/icon-3d';
import { RevealOnScroll, RevealText, Magnetic } from '@/motion';

/**
 * Os seis problemas usam o mesmo tratamento visual dos cards de Serviços:
 * faixa de cabeçalho em roxo→ciano alternado, título em branco e ícone 3D.
 *
 * A versão anterior dava um accent diferente a cada card (coral, âmbar, lima,
 * rosa, céu, índigo) e pintava título e ícone nessa cor. Os ícones 3D têm cor
 * própria e não acompanham accent, então manter aquele sistema deixaria só o
 * título colorido, sem o ícone — meio caminho que não lê como intenção.
 * A paleta padrão da marca vale para a página inteira.
 */
const PAIN_POINTS: { icon: Icon3DName; title: string; description: string; color: string }[] = [
  {
    icon: 'clock',
    title: 'Processos Lentos',
    description: 'Eliminamos gargalos operacionais que consomem o tempo da sua equipe e atrasam entregas.',
    color: 'from-sapient-purple/20 to-sapient-blue/20',
  },
  {
    icon: 'dollar',
    title: 'Custo Elevado',
    description: 'Reduzimos desperdícios financeiros através da automação inteligente de tarefas repetitivas.',
    color: 'from-sapient-blue/20 to-sapient-purple/20',
  },
  {
    icon: 'target',
    title: 'Falta de Leads',
    description: 'Implementamos sistemas de aquisição que trazem clientes qualificados constantemente.',
    color: 'from-sapient-purple/20 to-sapient-blue/20',
  },
  {
    icon: 'setting',
    title: 'Baixa Produtividade',
    description: 'Otimizamos o fluxo de trabalho para que sua equipe foque no que realmente gera valor.',
    color: 'from-sapient-blue/20 to-sapient-purple/20',
  },
  {
    icon: 'chat',
    title: 'Atendimento Ineficiente',
    description: 'Automatizamos o suporte para garantir respostas rápidas e satisfação do cliente 24/7.',
    color: 'from-sapient-purple/20 to-sapient-blue/20',
  },
  {
    icon: 'folder',
    title: 'Gestão Desorganizada',
    description: 'Centralizamos seus dados e processos em uma estrutura clara e fácil de gerenciar.',
    color: 'from-sapient-blue/20 to-sapient-purple/20',
  },
];

const PainPointsSection = () => {
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
          {PAIN_POINTS.map((point, index) => (
            <div key={point.title} data-pain className="h-full">
              <GlowCard
                glowColor={index % 2 === 0 ? 'purple' : 'blue'}
                customSize
                className="h-full p-6 !grid-rows-none !flex !flex-col transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className={`mb-4 bg-gradient-to-br ${point.color} flex items-center justify-center gap-3 px-4 py-3 rounded-xl`}
                >
                  <Icon3D name={point.icon} size={40} className="flex-none drop-shadow-lg" />
                  <h3 className="text-xl font-semibold text-white">{point.title}</h3>
                </div>
                <p className="text-ink-secondary">{point.description}</p>
              </GlowCard>
            </div>
          ))}
        </RevealOnScroll>

        {/* FOMO */}
        <RevealOnScroll className="mt-20 bg-gradient-sapient rounded-lg p-8 text-white text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Não perca mais tempo e dinheiro!</h3>
          <p className="mb-6 text-lg">
            Enquanto você hesita, seus concorrentes já estão automatizando seus processos e
            conquistando seus clientes.
            <strong className="block mt-2">
              Apenas 3 vagas disponíveis este mês para implementação prioritária!
            </strong>
          </p>
          <div className="flex justify-center">
            <Magnetic>
              <Button
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg transition-colors"
                onClick={() => window.open('https://bit.ly/40BtBp2', '_blank')}
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
