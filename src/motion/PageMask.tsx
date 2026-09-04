import { useEffect, useRef, useState } from 'react';
import { gsap } from './gsap';
import { prefersReducedMotion } from './useReducedMotion';
import sapientLogo from '@/assets/sapient-logo.png';

/** Amplitude do canal alfa na matriz. Define o contraste do ruído. */
const AMPLITUDE = 300;
const SESSION_KEY = 'sapient:intro-played';

/**
 * Dissolve de entrada.
 *
 * Uma camada navy cobre a tela e se desfaz em ruído, revelando a página e o
 * logo por baixo. O efeito é um filtro SVG: `feTurbulence` gera ruído e o
 * `feColorMatrix` transforma esse ruído em alfa. Animando o termo constante da
 * linha do alfa de +AMPLITUDE a -AMPLITUDE, o limiar varre o ruído inteiro —
 * opaco no começo, transparente no fim.
 *
 * Roda uma vez por sessão. Some por completo se o usuário pediu menos movimento.
 */
export function PageMask() {
  const [done, setDone] = useState(
    () => prefersReducedMotion() || sessionStorage.getItem(SESSION_KEY) === '1',
  );

  const coverRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<SVGSVGElement>(null);
  const logoRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (done) return;

    const bias = { value: AMPLITUDE };
    const matrices = Array.from(
      document.querySelectorAll<SVGFEColorMatrixElement>('.js-mask-matrix'),
    );

    const applyBias = () => {
      const v = `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${AMPLITUDE} 0 0 0 ${bias.value}`;
      matrices.forEach((m) => m.setAttribute('values', v));
    };
    applyBias();

    let tl: gsap.core.Timeline | null = null;

    const start = () => {
      tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(SESSION_KEY, '1');
          setDone(true);
        },
      });

      tl
        // A camada sólida existe só para cobrir o flash antes do JS subir.
        // A partir daqui quem cobre é o filtro, então ela sai.
        .add(() => coverRef.current?.remove())
        .to(logoRef.current, { opacity: 1, duration: 0.35, ease: 'power1.out' }, 0)
        .to(bias, {
          value: -AMPLITUDE,
          duration: 1.5,
          ease: 'none',
          onUpdate: applyBias,
        }, 0.25);
    };

    // As fontes entrando no meio do dissolve causam reflow visível atrás da
    // máscara. Esperar por elas custa pouco e evita o salto.
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) start();
    });

    return () => {
      cancelled = true;
      tl?.kill();
    };
  }, [done]);

  if (done) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <div
        ref={coverRef}
        className="pointer-events-none fixed inset-0"
        style={{ backgroundColor: 'var(--bg-deep)' }}
      />
      <svg
        ref={maskRef}
        className="pointer-events-none fixed inset-0 h-full w-full"
        style={{ color: 'var(--bg-deep)' }}
      >
        <defs>
          <filter
            id="sapient-page-mask"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.02"
              numOctaves={3}
              seed={8}
              result="noise"
            />
            <feColorMatrix
              className="js-mask-matrix"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  300 0 0 0 300"
              in="noise"
              result="mask"
            />
            <feFlood floodColor="currentColor" result="color" />
            <feComposite in="color" in2="mask" operator="in" />
          </filter>

          <filter
            id="sapient-logo-mask"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.02"
              numOctaves={3}
              seed={8}
              result="noise"
            />
            <feColorMatrix
              className="js-mask-matrix"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  300 0 0 0 300"
              in="noise"
              result="mask"
            />
            <feComposite in="SourceGraphic" in2="mask" operator="in" />
          </filter>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" filter="url(#sapient-page-mask)" />

        <g ref={logoRef} opacity="0" filter="url(#sapient-logo-mask)">
          <image
            href={sapientLogo}
            x="50%"
            y="50%"
            width="180"
            height="225"
            transform="translate(-90 -112)"
          />
        </g>
      </svg>
    </div>
  );
}

export default PageMask;
