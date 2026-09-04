import { useEffect, useState } from 'react';
import { ScrollTrigger } from './gsap';

export interface RailSection {
  id: string;
  label: string;
}

/**
 * Rail vertical fixo com a seção atual destacada.
 *
 * Usa um ScrollTrigger por seção em vez de um IntersectionObserver porque o
 * Lenis já alimenta o ScrollTrigger — assim o destaque muda no mesmo frame do
 * scroll, sem o atraso de um observer separado.
 *
 * Fica colapsado em traços. O rótulo por extenso ocuparia a mesma faixa
 * horizontal do conteúdo e cobriria os cards, então ele só aparece no hover ou
 * no foco, sobreposto e com fundo próprio. Escondido abaixo de `xl`, onde não
 * existe margem lateral nenhuma para ceder.
 */
export function SectionRail({ sections }: { sections: RailSection[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const triggers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => self.isActive && setActive(id),
      });
    });

    return () => triggers.forEach((t) => t?.kill());
  }, [sections]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Seções da página"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col gap-4">
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id} className="group relative">
              <button
                type="button"
                onClick={() => go(id)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={label}
                className="flex h-4 w-7 items-center outline-none"
              >
                <span
                  aria-hidden="true"
                  className={`block h-px transition-all duration-300 ${
                    isActive
                      ? 'w-7 bg-purple-300'
                      : 'w-4 bg-ink-hint group-hover:w-6 group-hover:bg-ink-secondary group-focus-within:w-6'
                  }`}
                />
              </button>

              {/* Sobreposto e não no fluxo: nunca empurra nem cobre o conteúdo
                  em repouso. */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute left-9 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-sapient-card/95 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] shadow-lg backdrop-blur transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:opacity-100 ${
                  isActive ? 'text-purple-300' : 'text-ink-secondary'
                } -translate-x-1 opacity-0`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SectionRail;
