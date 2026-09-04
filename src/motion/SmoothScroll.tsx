import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Scroll suave global.
 *
 * O ponto delicado é que Lenis e ScrollTrigger precisam compartilhar o mesmo
 * relógio. Se cada um roda no seu próprio requestAnimationFrame, os gatilhos
 * de scroll disparam com um frame de atraso e a animação treme. Por isso o
 * ticker do GSAP dirige o Lenis, e não o contrário.
 *
 * Desligado por completo quando o usuário pede menos movimento — nesse caso o
 * navegador cuida do scroll sozinho.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      // Curva exponencial: rápido no início, assentando devagar no fim.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch mantém o scroll nativo: interceptar atrapalha o gesto no celular.
      syncTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}

export default SmoothScroll;
