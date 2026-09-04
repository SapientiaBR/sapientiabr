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

export { gsap, ScrollTrigger };
