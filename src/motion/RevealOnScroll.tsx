import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap, ScrollTrigger, EASE } from './gsap';
import { useReducedMotion } from './useReducedMotion';

interface RevealOnScrollProps {
  children: ReactNode;
  /** Elemento renderizado. `div` por padrão. */
  as?: ElementType;
  className?: string;
  /** Atraso antes de começar, em segundos. */
  delay?: number;
  /**
   * Seletor dos filhos que entram em cascata. Sem isso, o próprio container
   * é que anima como um bloco só.
   */
  stagger?: string;
  /** Intervalo entre filhos que entram juntos, em segundos. */
  staggerAmount?: number;
  id?: string;
}

/**
 * Ponto de disparo: o elemento começa a animar quando o topo dele cruza 92% da
 * altura da janela, ou seja, assim que encosta na borda de baixo.
 *
 * Antes era 85%, e no celular isso chegava tarde demais: o título entrava na
 * tela ainda invisível e só completava a animação 400 a 500 px de rolagem
 * depois, já perto de sair por cima. O efeito era o oposto do pretendido — um
 * buraco onde deveria ter texto, seguido de um estalo.
 */
const START = 'top 92%';
const DURATION = 0.7;

/**
 * Entrada por scroll: sobe e revela quando entra no viewport.
 *
 * Com `stagger`, cada filho ganha o próprio gatilho através do
 * `ScrollTrigger.batch`: quem entra na tela junto anima em cascata, quem está
 * longe espera a própria vez. Isso importa no celular, onde a grade vira uma
 * coluna de 2.500 px — com um gatilho único no container, os últimos cards
 * animavam a 1.500 px abaixo da dobra e chegavam prontos, sem movimento nenhum
 * para o usuário ver.
 */
export function RevealOnScroll({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  stagger,
  staggerAmount = 0.09,
  id,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    // gsap.context recolhe tudo que for criado aqui dentro; o revert() no
    // cleanup desfaz inclusive os estilos inline, o que mantém o HMR honesto.
    const ctx = gsap.context(() => {
      if (!stagger) {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: DURATION,
          ease: EASE,
          delay,
          scrollTrigger: { trigger: el, start: START, once: true },
        });
        return;
      }

      const targets = gsap.utils.toArray<HTMLElement>(stagger, el);
      if (targets.length === 0) return;

      // O batch precisa do estado inicial posto à mão: ele dispara `onEnter`
      // com os elementos que cruzaram a linha juntos, e quem anima é o `to`.
      gsap.set(targets, { opacity: 0, y: 28 });
      ScrollTrigger.batch(targets, {
        start: START,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: DURATION,
            ease: EASE,
            delay,
            stagger: staggerAmount,
            overwrite: true,
          }),
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, delay, stagger, staggerAmount]);

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

export default RevealOnScroll;
