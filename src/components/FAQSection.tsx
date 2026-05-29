import React from 'react';

const faqs = [
  {
    q: 'Quanto custa a implementação da Sapient.IA?',
    a: 'Cada projeto é personalizado conforme o escopo da solução. Durante a conversa de diagnóstico (gratuita e sem compromisso), apresentamos um valor específico para o seu caso. A maioria dos clientes recupera o investimento em menos de 60 dias.',
  },
  {
    q: 'Quanto tempo leva para ter a solução funcionando?',
    a: 'A implementação padrão leva de 3 a 4 semanas a partir da assinatura do contrato. Você não precisa fazer nada. Nossa equipe cuida de tudo.',
  },
  {
    q: 'Preciso ter conhecimento técnico para usar?',
    a: 'Zero. Você não precisará configurar, programar ou entender de tecnologia. Entregamos a solução funcionando e treinamos você em menos de 1 hora. O suporte contínuo está incluído.',
  },
  {
    q: 'Meus dados e os dados dos meus clientes estão seguros?',
    a: 'Sim. A Sapient.IA opera em conformidade com a LGPD. Seus dados e os de seus clientes são protegidos por criptografia e nunca são compartilhados com terceiros.',
  },
  {
    q: 'E se eu não gostar do resultado? Tem garantia?',
    a: 'Sim. Se a solução não estiver funcionando ao final da implementação, você não paga nada. Essa é a nossa garantia de funcionamento. Sem letras miúdas.',
  },
  {
    q: 'Funciona para qualquer tipo de negócio?',
    a: 'Atendemos empresas de varejo, saúde, educação, serviços, construção civil, imobiliárias e outros setores. Se seu negócio usa WhatsApp, e-mail ou redes sociais para se comunicar com clientes, a Sapient.IA funciona para você.',
  },
  {
    q: 'Preciso trocar meu WhatsApp atual?',
    a: 'Não. A automação funciona no seu número de WhatsApp atual, seja Business ou pessoal. Nenhuma migração necessária.',
  },
  {
    q: 'Como acompanho os resultados?',
    a: 'Você terá acesso ao painel do Otus, nosso CRM inteligente, onde visualiza conversas, leads capturados, agendamentos e métricas em tempo real. Acesso via celular ou computador.',
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-sapient-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Suas dúvidas, respondidas de forma <span className="text-gradient-sapient">direta</span>.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((f) => (
              <div key={f.q} className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h3 className="text-lg font-semibold text-white mb-3">{f.q}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;