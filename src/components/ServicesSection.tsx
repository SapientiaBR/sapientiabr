
import React from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Icon3D, type Icon3DName } from '@/components/ui/icon-3d';
import { RevealOnScroll, RevealText } from '@/motion';
import { OperationsMindMap } from '@/components/OperationsMindMap';

const ServicesSection = () => {
  /**
   * Os ícones 3D vêm da biblioteca 3dicons (CC0). Cada card guarda só o nome;
   * o componente Icon3D resolve o arquivo.
   */
  const services: { icon: Icon3DName; title: string; description: string; color: string }[] = [
    {
      icon: 'chat-bubble',
      title: 'Agentes de IA',
      description: 'Atendem, tiram dúvidas e coletam informações no WhatsApp, site e redes sociais, dentro das regras do seu negócio.',
      color: 'from-emerald-400/20 to-cyan-400/10'
    },
    {
      icon: 'calender',
      title: 'Agenda conectada',
      description: 'Agendamentos, confirmações e lembretes integrados à sua disponibilidade e ao histórico do cliente.',
      color: 'from-cyan-400/20 to-emerald-400/10'
    },
    {
      icon: 'file-text',
      title: 'Propostas e contratos',
      description: 'Acione documentos, aprovações e próximas etapas a partir do que acontece no seu funil.',
      color: 'from-emerald-400/20 to-cyan-400/10'
    },
    {
      icon: 'cube',
      title: 'Operação integrada',
      description: 'Conectamos CRM, formulários, agenda, pagamentos e ferramentas internas em um fluxo que sua equipe acompanha.',
      color: 'from-cyan-400/20 to-emerald-400/10'
    },
    {
      icon: 'notify-heart',
      title: 'Follow-up inteligente',
      description: 'O próximo contato deixa de depender da memória do SDR: o sistema cria tarefas e mensagens no momento certo.',
      color: 'from-emerald-400/20 to-cyan-400/10'
    },
    {
      icon: 'computer',
      title: 'CRM com contexto',
      description: 'Centralize conversas, dados do lead e etapas do processo para que atendimento e comercial vejam a mesma história.',
      color: 'from-cyan-400/20 to-emerald-400/10'
    },
    {
      icon: 'chart',
      title: 'Captação de leads',
      description: 'Cada lead recebido é encaminhado para o CRM, qualificado e direcionado para a próxima ação.',
      color: 'from-emerald-400/20 to-cyan-400/10'
    },
    {
      icon: 'explorer',
      title: 'Sites institucionais',
      description: 'Sites e landing pages pensados para mobile, claros para quem chega e integrados ao seu funil desde o primeiro clique.',
      color: 'from-cyan-400/20 to-emerald-400/10'
    }
  ];

  return (
    <section id="services" className="relative overflow-hidden py-24 px-4 bg-sapient-deep">
      <div aria-hidden="true" className="services-aurora" />
      <div className="container mx-auto">
        <div className="relative mb-16 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="text-center lg:text-left">
            <RevealText as="h2" className="text-3xl md:text-4xl font-bold mb-4 text-white text-balance">
              Uma operação <em className="accent">conectada</em>, ponta a ponta.
            </RevealText>
            <RevealOnScroll delay={0.15}>
              <p className="text-ink-secondary max-w-2xl mx-auto lg:mx-0">
                Começamos pelo gargalo da sua equipe e conectamos os sistemas, canais e agentes de IA que o processo pede.
              </p>
            </RevealOnScroll>
          </div>
          <div className="w-full lg:justify-self-end">
            <OperationsMindMap />
          </div>
        </div>

        <RevealOnScroll
          stagger="[data-service]"
          staggerAmount={0.07}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <div key={index} data-service className="h-full">
            <GlowCard
              glowColor={index % 2 === 0 ? 'green' : 'blue'}
              tone="success"
              customSize
              className="h-full p-6 !grid-rows-none !flex !flex-col transition-transform duration-300 hover:-translate-y-1 shadow-[0_18px_48px_-34px_rgba(52,211,153,0.55)]"
            >
              <div className={`mb-4 bg-gradient-to-br ${service.color} flex items-center justify-center gap-3 px-4 py-3 rounded-xl`}>
                <Icon3D name={service.icon} size={40} className="flex-none drop-shadow-lg" />
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              </div>
              <p className="text-ink-secondary">{service.description}</p>
            </GlowCard>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ServicesSection;
