import React from 'react';
import { ShieldCheck } from 'lucide-react';

const GuaranteeSection = () => {
  return (
    <section className="py-20 bg-black/40">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center p-10 rounded-2xl border border-sapient-purple/30 bg-gradient-to-br from-sapient-purple/10 to-sapient-blue/10 backdrop-blur-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-sapient mb-6 shadow-lg shadow-sapient-purple/30">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Garantia <span className="text-gradient-sapient">Sapient.IA</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto">
            Sua solução funcionando ao final da implementação ou você não paga. Essa é a nossa garantia. Sem condições ocultas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;