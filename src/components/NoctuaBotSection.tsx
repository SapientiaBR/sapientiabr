
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { Icon3D } from '@/components/ui/icon-3d';
import otusLogo from '@/assets/otus-logo.webp';
import { RevealOnScroll, RevealText, Magnetic } from '@/motion';

const NoctuaBotSection = () => {
  // Os anéis passam da largura da coluna quando expandem; o overflow-hidden da
  // seção apara o excesso sem apagar o efeito.
  return (
    <section id="otus" className="py-24 bg-sapient-deep overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <RevealOnScroll className="order-2 md:order-1">
            <div className="flex items-center mb-4">
              <Bot className="w-8 h-8 text-sapient-purple mr-2" />
              <h3 className="text-2xl font-semibold text-ink-primary font-label tracking-widest">OTUS</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-ink-primary">
              Um agente de IA para o seu <em className="accent">atendimento</em>.
            </h2>
            <p className="text-ink-secondary mb-6">
              O <strong>Otus</strong> é um agente de IA configurado para a sua operação. Ele conversa com clientes,
              organiza dados e aciona os próximos passos que você definir.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="mt-0.5 mr-3 flex-none">
                  <Icon3D name="clock" size={38} />
                </div>
                <div>
                  <h4 className="text-ink-primary font-medium">Atendimento contínuo</h4>
                  <p className="text-ink-secondary">Responda contatos mesmo fora do horário da equipe, com limites e encaminhamentos definidos por você.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mt-0.5 mr-3 flex-none">
                  <Icon3D name="chat-text" size={38} />
                </div>
                <div>
                  <h4 className="text-ink-primary font-medium">Conversas com contexto</h4>
                  <p className="text-ink-secondary">Tira dúvidas, coleta informações e qualifica leads com base no que sua empresa precisa saber.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mt-0.5 mr-3 flex-none">
                  <Icon3D name="calender" size={38} />
                </div>
                <div>
                  <h4 className="text-ink-primary font-medium">Próximos passos acionados</h4>
                  <p className="text-ink-secondary">Integre agenda, CRM e tarefas para que a conversa certa chegue à pessoa certa.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Magnetic>
                <Button
                  className="bg-gradient-sapient hover:opacity-90 text-ink-on-brand font-medium py-6 px-6"
                  onClick={() => window.open("https://wa.me/5511920795583", "_blank")}
                >
                  <Bot className="w-5 h-5 mr-2" />
                  Conhecer o Otus
                </Button>
              </Magnetic>
            </div>
          </RevealOnScroll>
          {/* Palco do mascote.
              É um quadrado de lado fixo com a imagem no meio, e todas as
              camadas de brilho são filhas absolutas dele — assim o centro do
              halo é o centro da imagem por construção, e não por um `top: 42%`
              chutado. As camadas usam `scale` e `rotate` como propriedades
              próprias, nunca `transform`: a centralização mora no `transform`,
              e um keyframe que o reescrevesse jogaria o anel para fora do
              lugar. Era exatamente o que o `animate-ping` do Tailwind fazia. */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative flex flex-col items-center py-8">
              <div className="otus-stage relative h-56 w-56 md:h-64 md:w-64">
                <span aria-hidden="true" className="otus-aura" />
                <span aria-hidden="true" className="otus-sweep" />
                <span aria-hidden="true" className="otus-ring otus-ring--inner" />
                <span aria-hidden="true" className="otus-ring otus-ring--outer" />
                <span aria-hidden="true" className="otus-pulse" />
                <span aria-hidden="true" className="otus-pulse otus-pulse--late" />
                <img
                  src={otusLogo}
                  alt="Otus"
                  loading="lazy"
                  className="otus-avatar relative z-10 h-full w-full object-contain drop-shadow-2xl"
                />
              </div>
              <div className="relative z-10 mt-4 text-center">
                <h4 className="font-semibold text-ink-primary">Otus</h4>
                <p className="font-label text-xs tracking-widest text-cyan-300">IA ASSISTANT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoctuaBotSection;
