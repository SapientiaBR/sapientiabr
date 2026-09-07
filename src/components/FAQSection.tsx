import React from 'react';
import { RevealOnScroll, RevealText } from '@/motion';

const faqs = [
  {
    q: 'Quanto custa a implementação da Sapient.IA?',
    a: 'Cada projeto é definido conforme os fluxos, sistemas e canais envolvidos. No diagnóstico, entendemos o escopo e apresentamos uma proposta adequada ao seu caso.',
  },
  {
    q: 'Como funciona a implementação?',
    a: 'Começamos mapeando a operação atual. Depois definimos os fluxos, conectamos as ferramentas necessárias, testamos e preparamos sua equipe para acompanhar a nova rotina.',
  },
  {
    q: 'Preciso ter conhecimento técnico para usar?',
    a: 'Não. A parte técnica é conduzida pela nossa equipe. Você e seu time participam das decisões de processo e aprendem a acompanhar o que foi implementado.',
  },
  {
    q: 'Meus dados e os dados dos meus clientes estão seguros?',
    a: 'A segurança e o tratamento de dados são considerados desde o desenho do fluxo. Avaliamos os sistemas envolvidos e as necessidades específicas do seu negócio antes da implementação.',
  },
  {
    q: 'Vocês fazem só automação?',
    a: 'Não. Além de agentes de IA e integrações, criamos sites institucionais e landing pages orientados para mobile e conectados à captação de leads.',
  },
  {
    q: 'Funciona para qualquer tipo de negócio?',
    a: 'Trabalhamos bem com operações que usam WhatsApp, e-mail, redes sociais, agenda e CRM: escritórios de advocacia, clínicas, consultórios, agências, empresas de viagens, imobiliárias e serviços B2B, entre outras.',
  },
  {
    q: 'Preciso trocar meu WhatsApp atual?',
    a: 'Avaliamos como integrar o canal que sua operação já usa. A configuração depende do seu processo atual e das ferramentas que precisam conversar entre si.',
  },
  {
    q: 'Como acompanho os resultados?',
    a: 'Isso depende do escopo do projeto, mas podemos centralizar conversas, leads, agendamentos e etapas do funil para que você acompanhe a operação pelo celular ou computador.',
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-sapient-deep">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <RevealText as="h2" className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Perguntas diretas, respostas <em className="accent">claras</em>.
          </RevealText>
          <RevealOnScroll stagger="[data-faq]" staggerAmount={0.06} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((f) => (
              <div
                key={f.q}
                data-faq
                className="p-6 rounded-xl border border-white/10 bg-white/[0.04] transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{f.q}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
