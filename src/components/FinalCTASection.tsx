import React from 'react';
import { ArrowRight } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <section className="py-20 bg-sapient-dark">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sapient-purple font-semibold text-sm md:text-base mb-4 uppercase tracking-wide">
          Diagnóstico gratuito disponível para novos clientes este mês.
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 max-w-2xl mx-auto">
          Dê o primeiro passo para <span className="text-gradient-sapient">automatizar</span> sua empresa.
        </h2>
        <a
          href="https://bit.ly/40BtBp2"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 h-14 px-8 bg-gradient-sapient hover:opacity-90 transition-opacity text-white rounded-md font-semibold text-lg shadow-lg shadow-sapient-purple/30"
        >
          Quero Meu Diagnóstico Gratuito
          <ArrowRight className="w-5 h-5" />
        </a>
        <p className="text-gray-400 text-sm mt-5">
          Sem compromisso. Sem configuração técnica da sua parte.
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;