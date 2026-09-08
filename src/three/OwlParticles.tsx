import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '@/motion/gsap';
import { prefersReducedMotion } from '@/motion/useReducedMotion';
import sapientLogo from '@/assets/sapient-logo.png';
import type { OwlSceneHandle } from './owlScene';

/** WebGL disponível de fato? Alguns ambientes expõem a API sem contexto real. */
function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Aparelho fraco: pouca CPU ou tela pequena. Não é medida exata, é um corte
 * conservador para não travar celular intermediário.
 */
function isLowPower(): boolean {
  const cores = navigator.hardwareConcurrency ?? 4;
  return cores <= 4 || window.matchMedia('(max-width: 768px)').matches;
}

/** Fallback: a própria logo, estática. */
function StaticLogo({ className }: { className?: string }) {
  return (
    <img
      src={sapientLogo}
      alt="Sapient.IA"
      className={className}
      style={{ width: 'min(280px, 60vw)', height: 'auto' }}
    />
  );
}

interface OwlParticlesProps {
  /** Elemento cujo scroll dirige a dissolução. Normalmente a própria seção hero. */
  scrollTriggerRef?: React.RefObject<HTMLElement>;
}

/**
 * A logo da Sapient.IA reconstruída em partículas WebGL.
 *
 * Reage ao cursor e se desfaz conforme a página rola. Cai para a imagem
 * estática quando não há WebGL ou quando o usuário pediu menos movimento.
 */
export function OwlParticles({ scrollTriggerRef }: OwlParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(
    () => prefersReducedMotion() || !hasWebGL(),
  );

  useEffect(() => {
    if (fallback) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let handle: OwlSceneHandle | null = null;
    let disposed = false;
    let trigger: ScrollTrigger | null = null;
    let observer: IntersectionObserver | null = null;

    // Import dinâmico: o three só é baixado depois que o resto da página já
    // pintou, e não entra no bundle inicial.
    import('./owlScene')
      .then(({ createOwlScene }) =>
        createOwlScene(canvas, sapientLogo, {
          maxParticles: isLowPower() ? 12000 : 40000,
          pointSize: isLowPower() ? 3.2 : 2.6,
        }),
      )
      .then((scene) => {
        if (disposed) {
          scene.dispose();
          return;
        }
        handle = scene;

        const target = scrollTriggerRef?.current ?? wrap;
        trigger = ScrollTrigger.create({
          trigger: target,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => scene.setProgress(self.progress),
        });

        // Fora da tela, o loop para. Sem isso a GPU segue ocupada com a
        // página inteira rolada para baixo.
        observer = new IntersectionObserver(
          ([entry]) => scene.setRunning(entry.isIntersecting),
          { threshold: 0 },
        );
        observer.observe(wrap);
      })
      .catch((err) => {
        console.error('[OwlParticles] falha ao iniciar a cena', err);
        if (!disposed) setFallback(true);
      });

    return () => {
      disposed = true;
      observer?.disconnect();
      trigger?.kill();
      handle?.dispose();
    };
  }, [fallback, scrollTriggerRef]);

  if (fallback) {
    return (
      <div ref={wrapRef} className="flex items-center justify-center">
        <StaticLogo />
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative h-[34vh] min-h-[220px] w-full max-w-[520px]">
      {/* A classe existe para o tema claro escurecer as partículas por CSS —
          ver `.owl-canvas` no index.css. */}
      <canvas ref={canvasRef} className="owl-canvas block h-full w-full" />
    </div>
  );
}

export default OwlParticles;
