import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RevealOnScroll, RevealText, Magnetic } from '@/motion';
import { ShaderBackground } from '@/components/ui/neuro-noise';

/**
 * Fechamento da página, com o campo animado do shader por trás.
 *
 * É a única seção com esse fundo, e é de propósito. O shader abre um segundo
 * contexto WebGL além do da coruja no hero; como os dois pausam sozinhos ao sair
 * da viewport e ficam nas pontas opostas da página, nunca desenham ao mesmo
 * tempo. Espalhar o efeito por mais seções acabaria com essa garantia.
 */
const FinalCTASection = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-sapient-deep">
      <ShaderBackground className="pointer-events-none absolute inset-0" />

      {/* Duas camadas de véu, cada uma com um trabalho.
          A vertical funde o topo e a base no fundo das seções vizinhas, para o
          campo não começar nem terminar num corte reto. A radial escurece só o
          miolo, onde o texto fica — o shader chega até o ciano, claro demais
          para leitura por cima. Nas laterais o véu é fraco de propósito: é ali
          que o efeito aparece. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, var(--bg-deep) 0%, rgb(var(--bg-deep-rgb) / 0.3) 26%, rgb(var(--bg-deep-rgb) / 0.3) 74%, var(--bg-deep) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 52% 68% at 50% 50%, rgb(var(--bg-deep-rgb) / 0.7) 0%, rgb(var(--bg-deep-rgb) / 0.35) 60%, transparent 100%)',
        }}
      />

      <RevealOnScroll className="container relative z-10 mx-auto text-center">
        <p className="text-purple-300 font-label font-semibold text-xs md:text-sm mb-4 uppercase tracking-[0.18em]">
          Vamos entender antes de automatizar.
        </p>
        <RevealText as="h2" className="text-3xl md:text-4xl font-bold text-ink-primary mb-8 max-w-2xl mx-auto">
          Comece pelo gargalo, não pela <em className="accent">ferramenta</em>.
        </RevealText>
        <Magnetic>
          <Link
            to="/raio-x"
            className="inline-flex items-center gap-2 h-14 px-8 bg-gradient-sapient hover:opacity-90 transition-opacity text-ink-on-brand rounded-md font-semibold text-lg shadow-lg shadow-purple-500/30"
          >
            Fazer o Raio-X da minha operação
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Magnetic>
        <p className="text-ink-muted text-sm mt-5">
          6 perguntas. No fim você vê onde a operação vaza, qual pacote resolve e quanto custa.
        </p>
      </RevealOnScroll>
    </section>
  );
};

export default FinalCTASection;
