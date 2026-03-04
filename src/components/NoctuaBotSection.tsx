
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Clock, MessageSquare, Calendar } from 'lucide-react';
import otusLogo from '@/assets/otus-logo.png';

const NoctuaBotSection = () => {
  return (
    <section id="otus" className="py-20 bg-gradient-to-br from-sapient-dark to-[#242A3D]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <div className="flex items-center mb-4">
              <Bot className="w-8 h-8 text-sapient-purple mr-2" />
              <h3 className="text-2xl font-semibold text-white">Otus</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Atendimento <span className="text-gradient-sapient">24/7</span> com IA Personalizada
            </h2>
            <p className="text-gray-300 mb-6">
              O <strong>Otus</strong> ("Otus" é um gênero de corujas, símbolo de sabedoria) é nosso assistente de IA completamente personalizado 
              que trabalha incansavelmente para o seu negócio, oferecendo:
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-sapient-purple/20 p-2 rounded-full mt-1 mr-3">
                  <Clock className="w-5 h-5 text-sapient-purple" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Disponibilidade Total</h4>
                  <p className="text-gray-400">Atendimento automático 24 horas por dia, 7 dias por semana, sem pausas ou férias.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-sapient-blue/20 p-2 rounded-full mt-1 mr-3">
                  <MessageSquare className="w-5 h-5 text-sapient-blue" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Respostas Inteligentes</h4>
                  <p className="text-gray-400">Responde dúvidas, coleta informações e qualifica leads com naturalidade.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-sapient-purple/20 p-2 rounded-full mt-1 mr-3">
                  <Calendar className="w-5 h-5 text-sapient-purple" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Agendamentos Automáticos</h4>
                  <p className="text-gray-400">Integração com sua agenda para marcar reuniões e compromissos sem intervenção humana.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button 
                className="bg-gradient-sapient hover:opacity-90 text-white font-medium py-6 px-6"
                onClick={() => window.open("https://wa.me/5511920795583", "_blank")}
              >
                <Bot className="w-5 h-5 mr-2" />
                Fale com o Otus
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-sapient-purple/30 to-sapient-blue/30 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-sapient-purple/50 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border border-sapient-blue/30"></div>
              <div className="bg-sapient-dark/90 backdrop-blur-md p-8 rounded-2xl border border-sapient-purple/30 shadow-2xl">
                <img 
                  src={otusLogo} 
                  alt="Otus"
                  className="w-64 h-64 mx-auto"
                />
                <div className="text-center mt-4">
                  <h4 className="text-white font-semibold">Otus</h4>
                  <p className="text-xs text-sapient-blue">IA Assistant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoctuaBotSection;
