import React from 'react';
import { Icon3D } from '@/components/ui/icon-3d';
import { RevealOnScroll } from '@/motion';

const GuaranteeSection = () => {
  return (
    <section className="py-24 bg-sapient-dark">
      <div className="container mx-auto">
        <RevealOnScroll className="glass-premium max-w-3xl mx-auto text-center p-10 rounded-2xl">
          <div className="mb-6 flex justify-center">
            <Icon3D name="medal" size={76} className="drop-shadow-2xl" />
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