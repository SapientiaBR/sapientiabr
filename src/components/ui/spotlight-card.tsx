import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  tone?: 'neutral' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 }
};

/**
 * As três superfícies saem dos tokens, não de hex fixo: o mesmo véu que dá peso
 * a um card sobre o navy some sobre o branco, e o vermelho que sugere problema
 * no escuro vira um rosa berrante no claro se a opacidade não descer junto.
 */
const toneMap = {
  neutral: {
    backdrop: 'var(--tone-neutral-bg)',
    border: 'var(--tone-neutral-line)',
  },
  danger: {
    backdrop: 'var(--tone-danger-bg)',
    border: 'var(--tone-danger-line)',
  },
  success: {
    backdrop: 'var(--tone-success-bg)',
    border: 'var(--tone-success-line)',
  },
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

/**
 * A posição do cursor é a mesma para todos os cards, então vale uma leitura só.
 *
 * Antes cada card registrava o seu próprio listener em `document` e escrevia
 * quatro custom properties em si mesmo. Com vinte cards na página isso virava
 * vinte listeners e oitenta escritas de estilo a cada movimento do mouse.
 * Escrevendo no elemento raiz, o valor é herdado por todos os cards de uma vez.
 */
let pointerSubscribers = 0;
let detachPointer: (() => void) | null = null;

function subscribePointer() {
  pointerSubscribers += 1;
  if (detachPointer) return;

  let frame = 0;
  let lastX = 0;
  let lastY = 0;

  const write = () => {
    frame = 0;
    const root = document.documentElement.style;
    root.setProperty('--x', lastX.toFixed(2));
    root.setProperty('--xp', (lastX / window.innerWidth).toFixed(2));
    root.setProperty('--y', lastY.toFixed(2));
    root.setProperty('--yp', (lastY / window.innerHeight).toFixed(2));
  };

  const onMove = (e: PointerEvent) => {
    lastX = e.clientX;
    lastY = e.clientY;
    // Uma escrita por frame: o pointermove dispara mais rápido que o repaint.
    if (!frame) frame = requestAnimationFrame(write);
  };

  document.addEventListener('pointermove', onMove, { passive: true });
  detachPointer = () => {
    document.removeEventListener('pointermove', onMove);
    if (frame) cancelAnimationFrame(frame);
  };
}

function unsubscribePointer() {
  pointerSubscribers -= 1;
  if (pointerSubscribers <= 0) {
    pointerSubscribers = 0;
    detachPointer?.();
    detachPointer = null;
  }
}

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'blue',
  tone = 'neutral',
  size = 'md',
  width,
  height,
  customSize = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    subscribePointer();
    return unsubscribePointer;
  }, []);

  const { base, spread } = glowColorMap[glowColor];
  const surface = toneMap[tone];

  const getSizeClasses = () => {
    if (customSize) return '';
    return sizeMap[size];
  };

  const getInlineStyles = (): React.CSSProperties & Record<string, string | number> => {
    const baseStyles: Record<string, any> = {
      '--base': base,
      '--spread': spread,
      '--radius': '14',
      '--border': '3',
      '--backdrop': surface.backdrop,
      '--backup-border': surface.border,
      '--size': '200',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'fixed',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative' as const,
      // `touch-action: none` vinha no componente e travava a rolagem: com ele,
      // um toque que comece em cima do card nunca vira scroll, e no celular a
      // seção inteira fica presa. O brilho não precisa disso — ele lê o
      // ponteiro por um listener em document, não por gesto no card.
    };

    if (width !== undefined) {
      baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    }

    return baseStyles;
  };

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }
    
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }
    
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  // Regra global e idêntica em todas as instâncias — injetada uma única vez.
  useEffect(() => {
    const ID = 'glow-card-styles';
    if (document.getElementById(ID)) return;
    const tag = document.createElement('style');
    tag.id = ID;
    tag.textContent = beforeAfterStyles;
    document.head.appendChild(tag);
  }, [beforeAfterStyles]);

  return (
    <>
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? 'aspect-[3/4]' : ''}
          rounded-2xl 
          relative 
          grid 
          grid-rows-[1fr_auto] 
          shadow-[0_1rem_2rem_-1rem_black] 
          p-4 
          gap-4 
          backdrop-blur-[5px]
          ${className}
        `}
      >
        <div ref={innerRef} data-glow></div>
        {children}
      </div>
    </>
  );
};

export { GlowCard };
