import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from './gsap';
import { useReducedMotion } from './useReducedMotion';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Quanto o elemento acompanha o cursor. 0.3 = 30% da distância. */
  strength?: number;
}

/**
 * Envolve um CTA e faz ele acompanhar o cursor de leve, voltando ao lugar
 * quando o ponteiro sai.
 *
 * Só se ativa em ponteiro fino (mouse). Em touch não existe hover, e ligar
 * isso no celular faria o botão fugir do dedo no momento do toque.
 */
export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const ctx = gsap.context(() => {
      const move = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
      const moveY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        move((e.clientX - (r.left + r.width / 2)) * strength);
        moveY((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const onLeave = () => {
        move(0);
        moveY(0);
      };

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    }, el);

    return () => ctx.revert();
  }, [reduced, strength]);

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      {children}
    </span>
  );
}

export default Magnetic;
