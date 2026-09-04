import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap, ScrollTrigger, EASE, REVEAL_DURATION } from './gsap';
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
  /** Intervalo entre filhos, em segundos. */
  staggerAmount?: number;
  id?: string;
}

/**
 * Entrada por scroll: sobe e revela quando entra no viewport.
 *
 * Com `stagger`, os filhos que casam com o seletor entram em cascata em vez do
 * container inteiro de uma vez — é o que dá ritmo às grades de card.
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
      const targets = stagger
        ? Array.from(el.querySelectorAll<HTMLElement>(stagger))
        : [el];
      if (targets.length === 0) return;

      gsap.from(targets, {
        opacity: 0,
        y: 28,
        duration: REVEAL_DURATION,
        ease: EASE,
        delay,
        stagger: stagger ? staggerAmount : 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced, delay, stagger, staggerAmount]);

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

export default RevealOnScroll;
