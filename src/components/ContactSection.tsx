import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, Linkedin, Instagram } from 'lucide-react';
import { RevealOnScroll, RevealText } from '@/motion';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-sapient-dark">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <RevealText as="h2" className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Vamos conectar sua <em className="accent">operação</em>?
            </RevealText>
            <RevealOnScroll delay={0.15}>
              <p className="text-ink-secondary max-w-2xl mx-auto">
                Conte como sua equipe atende, vende e acompanha clientes. Nós mapeamos o fluxo e as integrações possíveis.
              </p>
            </RevealOnScroll>
          </div>

          <RevealOnScroll stagger="[data-contact-col]" staggerAmount={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div data-contact-col className="flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sapient-purple/30 to-sapient-blue/20 rounded-2xl -z-10 blur-lg opacity-50"></div>
              <div className="bg-sapient-surface/70 backdrop-blur-md rounded-2xl border border-white/10 p-8 relative z-10 transform transition-all hover:scale-[1.01] duration-300">
                <h3 className="text-2xl font-bold mb-8 text-white inline-flex items-center gap-2">
                  <span className="w-2 h-8 bg-gradient-to-b from-sapient-purple to-sapient-blue rounded-full"></span>
                  <em className="accent">Contato</em>
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-5 group">
                    <div className="bg-gradient-to-br from-sapient-purple to-sapient-purple/60 p-4 rounded-full h-min shadow-lg shadow-sapient-purple/20 group-hover:shadow-sapient-purple/40 transition-all duration-300">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="transform transition-all group-hover:translate-x-1 duration-300">
                      <h4 className="text-xl font-medium text-white mb-1">Falar no WhatsApp</h4>
                      <a
                        href="https://wa.me/5511920795583"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink-secondary hover:text-white transition-colors"
                      >
                        (11) 92079-5583
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 group">
                    <div className="bg-gradient-to-br from-sapient-blue to-sapient-blue/60 p-4 rounded-full h-min shadow-lg shadow-sapient-blue/20 group-hover:shadow-sapient-blue/40 transition-all duration-300">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="transform transition-all group-hover:translate-x-1 duration-300">
                      <h4 className="text-xl font-medium text-white mb-1">Agendar uma Reunião</h4>
                      <a
                        href="https://bit.ly/40BtBp2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink-secondary hover:text-white transition-colors"
                      >
                        Escolher um horário
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 group">
                    <div className="bg-gradient-to-br from-sapient-purple to-sapient-purple/60 p-4 rounded-full h-min shadow-lg shadow-sapient-purple/20 group-hover:shadow-sapient-purple/40 transition-all duration-300">
                      <Linkedin className="w-6 h-6 text-white" />
                    </div>
                    <div className="transform transition-all group-hover:translate-x-1 duration-300">
                      <h4 className="text-xl font-medium text-white mb-1">LinkedIn</h4>
                      <a
                        href="https://www.linkedin.com/in/sapient-ia-automation-solutions-b397b7348/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink-secondary hover:text-white transition-colors"
                      >
                        Sapient.IA Automation Solutions
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 group">
                    <div className="bg-gradient-to-br from-sapient-blue to-sapient-blue/60 p-4 rounded-full h-min shadow-lg shadow-sapient-blue/20 group-hover:shadow-sapient-blue/40 transition-all duration-300">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div className="transform transition-all group-hover:translate-x-1 duration-300">
                      <h4 className="text-xl font-medium text-white mb-1">Instagram</h4>
                      <a
                        href="https://www.instagram.com/sapientia.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink-secondary hover:text-white transition-colors"
                      >
                        @sapientia.br
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div data-contact-col className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Por que uma <span className="text-gradient-sapient">operação conectada</span>?
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-sapient-purple/20 p-3 rounded-full h-min">
                    <svg className="w-6 h-6 text-sapient-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">IA no fluxo real</h4>
                    <p className="text-ink-secondary">Agentes de IA entram onde existem conversas, decisões repetitivas e dados que precisam circular.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-sapient-blue/20 p-3 rounded-full h-min">
                    <svg className="w-6 h-6 text-sapient-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Sistemas que conversam</h4>
                    <p className="text-ink-secondary">CRM, WhatsApp, agenda, pagamentos e ferramentas internas podem operar como um único fluxo.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-sapient-purple/20 p-3 rounded-full h-min">
                    <svg className="w-6 h-6 text-sapient-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Site que faz parte da operação</h4>
                    <p className="text-ink-secondary">Criamos presença digital com clareza no mobile e caminhos diretos para captar e encaminhar leads.</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
