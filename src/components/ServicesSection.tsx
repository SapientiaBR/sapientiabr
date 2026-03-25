
import React from 'react';
import { MessageCircle, Calendar, FileText, Bot, Layers, TrendingUp, Palette, Share2 } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';

const ServicesSection = () => {
  const services = [
    {
      icon: <MessageCircle className="w-12 h-12 text-sapient-purple" />,
      title: 'Atendimento 24/7',
      description: 'Atendimento automatizado via WhatsApp, site ou redes sociais que funciona 24 horas por dia, sem descanso.',
      color: 'from-sapient-purple/20 to-sapient-blue/20'
    },
    {
      icon: <Calendar className="w-12 h-12 text-sapient-blue" />,
      title: 'Agendamentos Automáticos',
      description: 'Sistema inteligente que gerencia sua agenda, confirmações e lembretes para clientes.',
      color: 'from-sapient-blue/20 to-sapient-purple/20'
    },
    {
      icon: <FileText className="w-12 h-12 text-sapient-purple" />,
      title: 'Propostas e Contratos',
      description: 'Geração automática de propostas personalizadas e contratos baseados no perfil do cliente.',
      color: 'from-sapient-purple/20 to-sapient-blue/20'
    },
    {
      icon: <Palette className="w-12 h-12 text-sapient-blue" />,
      title: 'Rebranding (Logos)',
      description: 'Criação e renovação de identidade visual, desenvolvimento de logos modernos e profissionais.',
      color: 'from-sapient-blue/20 to-sapient-purple/20'
    },
    {
      icon: <Share2 className="w-12 h-12 text-sapient-purple" />,
      title: 'Automação de Posts',
      description: 'Criação e programação automática de posts para Instagram, LinkedIn, Facebook e outras redes sociais.',
      color: 'from-sapient-purple/20 to-sapient-blue/20'
    },
    {
      icon: <Bot className="w-12 h-12 text-sapient-blue" />,
      title: 'CRM Inteligente',
      description: 'CRM com IA que entende o comportamento do cliente e sugere as melhores ações de relacionamento.',
      color: 'from-sapient-blue/20 to-sapient-purple/20'
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-sapient-purple" />,
      title: 'Captação de Leads',
      description: 'Automação completa do funil de vendas, da captação à conversão de novos clientes.',
      color: 'from-sapient-purple/20 to-sapient-blue/20'
    },
    {
      icon: <Layers className="w-12 h-12 text-sapient-blue" />,
      title: 'Gestão de Redes Sociais',
      description: 'Gestão completa das suas redes sociais com estratégias personalizadas e análise de resultados.',
      color: 'from-sapient-blue/20 to-sapient-purple/20'
    }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-black/40">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Nossas <span className="text-gradient-sapient">Soluções</span> de Automação
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Soluções completas de automação com IA, rebranding e gestão de redes sociais para fazer seu negócio crescer enquanto você foca no que realmente importa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <GlowCard
              key={index}
              glowColor={index % 2 === 0 ? 'purple' : 'blue'}
              customSize
              className="p-6 !grid-rows-none !flex !flex-col"
            >
              <div className={`p-4 rounded-full bg-gradient-to-br ${service.color} inline-block mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
