
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';

const BenefitsSection = () => {
  const benefits = [
    'Reduza custos operacionais em até 70%',
    'Atendimento 24/7 sem custos adicionais',
    'Aumente sua taxa de conversão em até 40%',
    'Elimine erros humanos e padronize processos',
    'Libere tempo para focar no crescimento do negócio',
    'Escale suas operações sem aumentar a equipe'
  ];

  return (
    <section id="benefits" className="py-20 bg-sapient-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-sapient-purple/20 to-sapient-blue/20 p-10 rounded-2xl border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">
              Transforme Seu Negócio Com <span className="text-gradient-sapient block mt-2">Automação Inteligente</span>
            </h2>
            
            <p className="text-gray-300 text-lg md:text-xl mb-10 text-center">
              A Sapient.IA oferece soluções que vão muito além da simples automação. Nossa tecnologia 
              aprende com seu negócio e se adapta continuamente para maximizar resultados.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <GlowCard
                  key={index}
                  glowColor={index % 2 === 0 ? 'purple' : 'blue'}
                  customSize
                  className="!grid-rows-none !flex items-start gap-4 p-5"
                >
                  <CheckCircle className="text-sapient-purple mt-1 flex-shrink-0 h-6 w-6" />
                  <p className="text-gray-200 font-medium text-lg">{benefit}</p>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
