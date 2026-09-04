import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from './gsap';
import { useReducedMotion } from './useReducedMotion';

interface RevealTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** `true` anima assim que monta, sem esperar o scroll. Use no hero. */
  immediate?: boolean;
}

/**
 * Heading que aparece palavra a palavra.
 *
 * Quebrar por palavra e não por caractere é deliberado: o leitor de tela lê o
 * texto inteiro (nenhum nó é dividido no meio de uma palavra), a quebra de
 * linha continua natural, e em headings longos o efeito por caractere fica
 * lento demais para ler.
 *
 * O conteúdo original fica intacto no DOM até o efeito rodar, então o texto
 * existe para o buscador e para quem tem JS desligado.
 */
export function RevealText({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      // Envolve cada palavra num span com overflow hidden, para a palavra
      // subir "de dentro" da linha em vez de aparecer solta na tela.
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let node = walker.nextNode();
      while (node) {
        if (node.textContent?.trim()) textNodes.push(node as Text);
        node = walker.nextNode();
      }

      const words: HTMLElement[] = [];
      for (const text of textNodes) {
        const frag = document.createDocumentFragment();
        const parts = text.textContent!.split(/(\s+)/);
        for (const part of parts) {
          if (!part.trim()) {
            frag.appendChild(document.createTextNode(part));
            continue;
          }
          const outer = document.createElement('span');
          outer.style.display = 'inline-block';
          outer.style.overflow = 'hidden';
          outer.style.verticalAlign = 'top';
          const inner = document.createElement('span');
          inner.style.display = 'inline-block';
          inner.textContent = part;
          outer.appendChild(inner);
          frag.appendChild(outer);
          words.push(inner);
        }
        text.replaceWith(frag);
      }

      if (words.length === 0) return;

      gsap.from(words, {
        yPercent: 115,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.035,
        delay,
        // O transform residual criaria um contexto de empilhamento em cada
        // palavra, e isso descola o `background-clip: text` do heading em
        // itálico com gradiente. Limpar no fim devolve o texto ao fluxo normal.
        onComplete: () => gsap.set(words, { clearProps: 'transform,opacity' }),
        ...(immediate
          ? {}
          : { scrollTrigger: { trigger: el, start: 'top 85%', once: true } }),
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced, delay, immediate]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

export default RevealText;
