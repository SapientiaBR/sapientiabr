
import React from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Icon3D, type Icon3DName } from '@/components/ui/icon-3d';
import { RevealOnScroll, RevealText } from '@/motion';

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
    <section id="services" className="py-24 px-4 bg-sapient-deep">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <RevealText as="h2" className="text-3xl md:text-4xl font-bold mb-4 text-white text-balance">
            Uma operação <em className="accent">conectada</em> de ponta a ponta.
          </RevealText>
          <RevealOnScroll delay={0.15}>
            <p className="text-ink-secondary max-w-2xl mx-auto">
              Começamos pelo gargalo da sua equipe e conectamos os sistemas, canais e agentes de IA que o processo pede.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll
          stagger="[data-service]"
          staggerAmount={0.07}
          className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-8 lg:grid-cols-4"
        >
          {services.map((service, index) => (
            <div
              key={index}
              data-service
              className="h-full"
            >
            <GlowCard
              glowColor={index % 2 === 0 ? 'green' : 'blue'}
              tone="success"
              customSize
              className="feature-flat h-full !flex !flex-col !grid-rows-none p-0 transition-transform duration-300 md:p-6 md:hover:-translate-y-1 md:shadow-[0_18px_48px_-34px_rgba(52,211,153,0.55)]"
            >
              <div
                className={`mb-2 flex items-center gap-3 md:mb-4 md:justify-center md:rounded-xl md:bg-gradient-to-br md:px-4 md:py-3 ${service.color}`}
              >
                {/* O `!` vence o width/height inline que o Icon3D aplica. */}
                <Icon3D
                  name={service.icon}
                  size={40}
                  className="!h-9 !w-9 flex-none drop-shadow-lg md:!h-10 md:!w-10"
                />
                <h3 className="text-lg font-semibold text-white md:text-xl">{service.title}</h3>
              </div>
              <p className="pl-12 text-sm text-ink-secondary md:pl-0 md:text-base">
                {service.description}
              </p>
            </GlowCard>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ServicesSection;
