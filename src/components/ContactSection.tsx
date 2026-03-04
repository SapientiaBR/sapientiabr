import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, Linkedin, Instagram } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-black/40">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Pronto para <span className="text-gradient-sapient">Automatizar</span> seu Negócio?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Entre em contato com nossa equipe para uma demonstração personalizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sapient-purple/30 to-sapient-blue/20 rounded-2xl -z-10 blur-lg opacity-50"></div>
              <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 p-8 relative z-10 transform transition-all hover:scale-[1.01] duration-300">
                <h3 className="text-2xl font-bold mb-8 text-white inline-flex items-center gap-2">
                  <span className="w-2 h-8 bg-gradient-to-b from-sapient-purple to-sapient-blue rounded-full"></span>
                  <span className="text-gradient-sapient">Contato</span>
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-5 group">
                    <div className="bg-gradient-to-br from-sapient-purple to-sapient-purple/60 p-4 rounded-full h-min shadow-lg shadow-sapient-purple/20 group-hover:shadow-sapient-purple/40 transition-all duration-300">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="transform transition-all group-hover:translate-x-1 duration-300">
                      <h4 className="text-xl font-medium text-white mb-1">Otus</h4>
                      <a 
                        href="https://wa.me/5511920795583" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
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
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Clique aqui para agendar
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
                        className="text-gray-300 hover:text-white transition-colors"
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
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        @sapientia.br
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Por que escolher a <span className="text-gradient-sapient">Sapient.IA</span>?
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-sapient-purple/20 p-3 rounded-full h-min">
                    <svg className="w-6 h-6 text-sapient-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Tecnologia Avançada</h4>
                    <p className="text-gray-400">Utilizamos algoritmos de IA de última geração para oferecer soluções verdadeiramente inteligentes.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-sapient-blue/20 p-3 rounded-full h-min">
                    <svg className="w-6 h-6 text-sapient-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">ROI Comprovado</h4>
                    <p className="text-gray-400">Nossos clientes experimentam em média uma economia de 65% nos custos operacionais após implementação.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-sapient-purple/20 p-3 rounded-full h-min">
                    <svg className="w-6 h-6 text-sapient-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Suporte Personalizado</h4>
                    <p className="text-gray-400">Nossa equipe de especialistas está sempre disponível para garantir o sucesso da sua implementação.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
