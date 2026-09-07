import React from 'react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Icon3D, type Icon3DName } from '@/components/ui/icon-3d';
import { RevealOnScroll, RevealText, Magnetic } from '@/motion';

/**
 * Problemas recebem uma superfície quente e discreta: o contraste sinaliza
 * atrito operacional sem transformar a seção em um alerta agressivo.
 */
const PAIN_POINTS: { icon: Icon3DName; title: string; description: string; color: string }[] = [
  {
    icon: 'clock',
    title: 'Leads sem resposta',
    description: 'Quando cada mensagem depende de alguém estar disponível, oportunidades esfriam antes da conversa começar.',
    color: 'from-rose-500/20 to-orange-400/10',
  },
  {
    icon: 'notebook',
    title: 'Follow-up manual',
    description: 'SDRs e atendimento gastam horas cobrando resposta, atualizando planilhas e repetindo o mesmo processo.',
    color: 'from-orange-500/20 to-rose-400/10',
  },
  {
    icon: 'puzzle',
    title: 'Sistemas desconectados',
    description: 'Formulários, WhatsApp, CRM, agenda e pagamentos não conversam — e sua equipe precisa fazer essa ponte.',
    color: 'from-rose-500/20 to-orange-400/10',
  },
  {
    icon: 'setting',
    title: 'Equipe sobrecarregada',
    description: 'O trabalho operacional toma o espaço de tarefas que pedem relação, decisão e conhecimento do cliente.',
    color: 'from-orange-500/20 to-rose-400/10',
  },
  {
    icon: 'chat',
    title: 'Atendimento sem contexto',
    description: 'O cliente repete informações porque o histórico ficou em outro canal ou não chegou ao CRM.',
    color: 'from-rose-500/20 to-orange-400/10',
  },
  {
    icon: 'link',
    title: 'Presença digital solta',
    description: 'Um site bonito não basta quando ele não encaminha o lead para o fluxo comercial certo.',
    color: 'from-orange-500/20 to-rose-400/10',
  },
];

const PainPointsSection = () => {
  return (
    <section id="pain-points" className="bg-sapient-dark py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <RevealText as="h2" className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Onde a operação <em className="accent">trava</em> hoje.
          </RevealText>
          <RevealOnScroll delay={0.15}>
            <p className="text-ink-secondary max-w-2xl mx-auto">
              A IA cria valor quando resolve gargalos reais do atendimento, do comercial e do backoffice.
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
                glowColor={index % 2 === 0 ? 'red' : 'orange'}
                tone="danger"
                customSize
                className="h-full p-6 !grid-rows-none !flex !flex-col transition-transform duration-300 hover:-translate-y-1 shadow-[0_18px_48px_-34px_rgba(251,113,133,0.65)]"
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

        <RevealOnScroll className="mt-20 bg-gradient-sapient rounded-lg p-8 text-white text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Sua equipe não precisa ser a ponte entre sistemas.</h3>
          <p className="mb-6 text-lg">
            Vamos mapear seu fluxo atual e identificar onde agentes de IA, integrações e um site conectado
            podem reduzir o trabalho manual.
          </p>
          <div className="flex justify-center">
            <Magnetic>
              <Button
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg transition-colors"
                onClick={() => window.open('https://bit.ly/40BtBp2', '_blank')}
              >
                Mapear minha operação
              </Button>
            </Magnetic>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default PainPointsSection;
