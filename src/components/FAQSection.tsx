import React from 'react';
import { RevealOnScroll, RevealText } from '@/motion';
import { faqs } from '@/content/faq';


const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-sapient-deep">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <RevealText as="h2" className="text-3xl md:text-4xl font-bold text-center text-ink-primary mb-12">
            Perguntas diretas, respostas <em className="accent">claras</em>.
          </RevealText>
          <RevealOnScroll stagger="[data-faq]" staggerAmount={0.06} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((f) => (
              <div
                key={f.q}
                data-faq
                className="p-6 rounded-xl border border-ink-primary/10 bg-ink-primary/[0.04] transition-colors hover:border-ink-primary/20 hover:bg-ink-primary/[0.06]"
              >
                <h3 className="text-lg font-semibold text-ink-primary mb-3">{f.q}</h3>
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
