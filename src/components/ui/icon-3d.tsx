import chart from '@/assets/icons3d/chart.webp';
import chatBubble from '@/assets/icons3d/chat-bubble.webp';
import chatText from '@/assets/icons3d/chat-text.webp';
import clock from '@/assets/icons3d/clock.webp';
import colorPalette from '@/assets/icons3d/color-palette.webp';
import computer from '@/assets/icons3d/computer.webp';
import explorer from '@/assets/icons3d/explorer.webp';
import fileText from '@/assets/icons3d/file-text.webp';
import calender from '@/assets/icons3d/calender.webp';
import medal from '@/assets/icons3d/medal.webp';
import megaphone from '@/assets/icons3d/megaphone.webp';

/**
 * Ícones 3D da biblioteca 3dicons (CC0 — domínio público, sem atribuição
 * exigida). Ver src/assets/icons3d/LICENSE.md.
 *
 * Os arquivos são renders com transparência, reduzidos para 192 px e
 * convertidos para WebP: cerca de 5 KB cada, contra ~75 KB do PNG original.
 * 192 px cobre exibição até 96 px em tela 2x, que é o maior uso no site.
 *
 * `calender` mantém a grafia do pacote original, não é erro de digitação daqui.
 */
const ICONS = {
  chart,
  'chat-bubble': chatBubble,
  'chat-text': chatText,
  clock,
  'color-palette': colorPalette,
  computer,
  explorer,
  'file-text': fileText,
  calender,
  medal,
  megaphone,
} as const;

export type Icon3DName = keyof typeof ICONS;

interface Icon3DProps {
  name: Icon3DName;
  /** Lado do quadrado em pixels. */
  size?: number;
  className?: string;
}

/**
 * Os ícones são decorativos: cada um acompanha um título que já diz a mesma
 * coisa. Ficam fora da árvore de acessibilidade para o leitor de tela não
 * repetir a informação.
 */
export function Icon3D({ name, size = 44, className }: Icon3DProps) {
  return (
    <img
      src={ICONS[name]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
}

export default Icon3D;
