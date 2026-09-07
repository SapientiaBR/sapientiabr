
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { Icon3D } from '@/components/ui/icon-3d';
import otusLogo from '@/assets/otus-logo.webp';
import { RevealOnScroll, RevealText, Magnetic } from '@/motion';

const NoctuaBotSection = () => {
  // O anel decorativo com animate-ping escala para 2x e estourava a largura da
  // viewport no celular; o overflow-hidden da seção corta o excesso sem apagar
  // o efeito.
  return (
    <section id="otus" className="py-24 bg-sapient-deep overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <RevealOnScroll className="order-2 md:order-1">
            <div className="flex items-center mb-4">
              <Bot className="w-8 h-8 text-sapient-purple mr-2" />
              <h3 className="text-2xl font-semibold text-white font-label tracking-widest">OTUS</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
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
                  <h4 className="text-white font-medium">Atendimento contínuo</h4>
                  <p className="text-ink-secondary">Responda contatos mesmo fora do horário da equipe, com limites e encaminhamentos definidos por você.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mt-0.5 mr-3 flex-none">
                  <Icon3D name="chat-text" size={38} />
                </div>
                <div>
                  <h4 className="text-white font-medium">Conversas com contexto</h4>
                  <p className="text-ink-secondary">Tira dúvidas, coleta informações e qualifica leads com base no que sua empresa precisa saber.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mt-0.5 mr-3 flex-none">
                  <Icon3D name="calender" size={38} />
                </div>
                <div>
                  <h4 className="text-white font-medium">Próximos passos acionados</h4>
                  <p className="text-ink-secondary">Integre agenda, CRM e tarefas para que a conversa certa chegue à pessoa certa.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Magnetic>
                <Button
                  className="bg-gradient-sapient hover:opacity-90 text-white font-medium py-6 px-6"
                  onClick={() => window.open("https://wa.me/5511920795583", "_blank")}
                >
                  <Bot className="w-5 h-5 mr-2" />
                  Conhecer o Otus
                </Button>
              </Magnetic>
            </div>
          </RevealOnScroll>
          {/* O painel de vidro ficava dentro de um círculo de tamanho fixo
              (w-64 h-64), mas era bem mais alto que ele: transbordava mais de
              200 px para fora da caixa reservada no layout e, no celular,
              caía por cima do rótulo "OTUS" da coluna de texto.
              Agora o container cresce com o conteúdo, o halo é uma camada de
              fundo posicionada atrás, e o mascote transparente fica direto no
              meio dele — que é onde os anéis finalmente aparecem. */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative flex w-full max-w-[300px] flex-col items-center py-6 md:max-w-[340px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[42%] h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sapient-purple/25 to-sapient-blue/25 md:h-72 md:w-72"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[42%] h-60 w-60 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2 border-sapient-purple/40 md:h-72 md:w-72"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[42%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sapient-blue/25 md:h-80 md:w-80"
              />
              <img
                src={otusLogo}
                alt="Otus"
                loading="lazy"
                className="relative h-56 w-auto object-contain drop-shadow-2xl md:h-64"
              />
              <div className="relative mt-3 text-center">
                <h4 className="text-white font-semibold">Otus</h4>
                <p className="text-xs text-cyan-300 font-label tracking-widest">IA ASSISTANT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoctuaBotSection;
