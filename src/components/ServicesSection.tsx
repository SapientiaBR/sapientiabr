
import React from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Icon3D, type Icon3DName } from '@/components/ui/icon-3d';
import { RevealOnScroll, RevealText } from '@/motion';
import { services } from '@/content/services';

const ServicesSection = () => {

  return (
    <section id="services" className="py-24 px-4 bg-sapient-deep">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <RevealText as="h2" className="text-3xl md:text-4xl font-bold mb-4 text-ink-primary text-balance">
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
                <h3 className="text-lg font-semibold text-ink-primary md:text-xl">{service.title}</h3>
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
