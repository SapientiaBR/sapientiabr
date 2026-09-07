
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
      title: 'Atendimento 24/7',
      description: 'Atendimento automatizado via WhatsApp, site ou redes sociais que funciona 24 horas por dia, sem descanso.',
      color: 'from-sapient-purple/20 to-sapient-blue/20'
    },
    {
      icon: 'calender',
      title: 'Agendamentos Automáticos',
      description: 'Sistema inteligente que gerencia sua agenda, confirmações e lembretes para clientes.',
      color: 'from-sapient-blue/20 to-sapient-purple/20'
    },
    {
      icon: 'file-text',
      title: 'Propostas e Contratos',
      description: 'Geração automática de propostas personalizadas e contratos baseados no perfil do cliente.',
      color: 'from-sapient-purple/20 to-sapient-blue/20'
    },
    {
      icon: 'color-palette',
      title: 'Rebranding (Logos)',
      description: 'Criação e renovação de identidade visual, desenvolvimento de logos modernos e profissionais.',
      color: 'from-sapient-blue/20 to-sapient-purple/20'
    },
    {
      icon: 'megaphone',
      title: 'Automação de Posts',
      description: 'Criação e programação automática de posts para Instagram, LinkedIn, Facebook e outras redes sociais.',
      color: 'from-sapient-purple/20 to-sapient-blue/20'
    },
    {
      icon: 'computer',
      title: 'CRM Inteligente',
      description: 'CRM com IA que entende o comportamento do cliente e sugere as melhores ações de relacionamento.',
      color: 'from-sapient-blue/20 to-sapient-purple/20'
    },
    {
      icon: 'chart',
      title: 'Captação de Leads',
      description: 'Automação completa do funil de vendas, da captação à conversão de novos clientes.',
      color: 'from-sapient-purple/20 to-sapient-blue/20'
    },
    {
      icon: 'explorer',
      title: 'Criação de Sites',
      description: 'Desenvolvimento de sites profissionais e landing pages otimizadas para conversão, com design moderno e responsivo.',
      color: 'from-sapient-blue/20 to-sapient-purple/20'
    }
  ];

  return (
    <section id="services" className="py-24 px-4 bg-sapient-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <RevealText as="h2" className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Nossas <em className="accent">Soluções</em> de Automação
          </RevealText>
          <RevealOnScroll delay={0.15}>
            <p className="text-ink-secondary max-w-2xl mx-auto">
              Soluções completas de automação com IA, rebranding e gestão de redes sociais para fazer seu negócio crescer enquanto você foca no que realmente importa.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll
          stagger="[data-service]"
          staggerAmount={0.07}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <div key={index} data-service className="h-full">
            <GlowCard
              glowColor={index % 2 === 0 ? 'purple' : 'blue'}
              customSize
              className="h-full p-6 !grid-rows-none !flex !flex-col transition-transform duration-300 hover:-translate-y-1"
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
