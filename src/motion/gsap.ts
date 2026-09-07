/**
 * Ponto único de configuração do GSAP.
 *
 * Registrar ScrollTrigger em mais de um módulo é inofensivo, mas espalha a
 * configuração. Tudo que é global do motor de animação vive aqui.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Ritmo padrão do site. Vem dos tokens para bater com as transições CSS. */
export const EASE = 'power3.out';
export const REVEAL_DURATION = 0.9;

/**
 * Remede os gatilhos uma única vez, quando o layout parou de se mexer.
 *
 * O ScrollTrigger guarda início e fim em pixels, medidos na criação de cada
 * gatilho. Duas coisas invalidam essas medidas depois:
 *
 * 1. As fontes. Enquanto a webfont não chega, o texto é medido com as métricas
 *    da fonte de fallback; na troca, a altura de cada bloco de texto muda um
 *    pouco, e o acumulado ao longo da página é grande.
 * 2. O pin da seção de benefícios, que insere ~990 px de espaçador e empurra
 *    tudo que vem depois. Gatilhos criados antes dele foram medidos sem esse
 *    espaço.
 *
 * O efeito de uma medida velha é uma seção que nunca aparece: o ponto de
 * disparo dela foi parar longe de onde a seção realmente está, e a animação
 * de entrada fica parada em opacidade 0.
 *
 * Isto é deliberadamente global e único. Chamar `refresh()` dentro de cada
 * componente, como estava antes, mede o DOM no meio da montagem dos irmãos —
 * caro e, pior, errado.
 */
export function refreshScrollTriggersWhenSettled() {
  // Dois quadros: o primeiro fecha o layout da montagem, o segundo pega
  // qualquer ajuste que ele tenha provocado.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => ScrollTrigger.refresh()),
  );

  if (typeof document !== 'undefined' && 'fonts' in document) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

export { gsap, ScrollTrigger };
