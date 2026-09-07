import React from 'react';
import { ArrowRight } from 'lucide-react';
import { RevealOnScroll, RevealText, Magnetic } from '@/motion';

const FinalCTASection = () => {
  return (
    <section className="py-24 bg-sapient-deep">
      <RevealOnScroll className="container mx-auto text-center">
        <p className="text-purple-300 font-label font-semibold text-xs md:text-sm mb-4 uppercase tracking-[0.18em]">
          Diagnóstico gratuito disponível para novos clientes este mês.
        </p>
        <RevealText as="h2" className="text-3xl md:text-4xl font-bold text-white mb-8 max-w-2xl mx-auto">
          Dê o primeiro passo para <em className="accent">automatizar</em> sua empresa.
        </RevealText>
        <Magnetic>
          <a
            href="https://bit.ly/40BtBp2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-14 px-8 bg-gradient-sapient hover:opacity-90 transition-opacity text-white rounded-md font-semibold text-lg shadow-lg shadow-purple-500/30"
          >
            Quero Meu Diagnóstico Gratuito
            <ArrowRight className="w-5 h-5" />
          </a>
        </Magnetic>
        <p className="text-ink-muted text-sm mt-5">
          Sem compromisso. Sem configuração técnica da sua parte.
        </p>
      </RevealOnScroll>
    </section>
  );
};

export default FinalCTASection;