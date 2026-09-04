import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { RevealOnScroll } from '@/motion';

const GuaranteeSection = () => {
  return (
    <section className="py-24 bg-sapient-dark">
      <div className="container mx-auto">
        <RevealOnScroll className="glass-premium max-w-3xl mx-auto text-center p-10 rounded-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-sapient mb-6 shadow-lg shadow-purple-500/30">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Garantia <em className="accent">Sapient.IA</em>
          </h2>
          <p className="text-ink-secondary text-base md:text-lg max-w-xl mx-auto">
            Sua solução funcionando ao final da implementação ou você não paga. Essa é a nossa garantia. Sem condições ocultas.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default GuaranteeSection;