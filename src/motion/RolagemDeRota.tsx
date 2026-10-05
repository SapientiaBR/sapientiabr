import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Posição de rolagem ao trocar de página.
 *
 * O React Router não mexe na rolagem: quem clica em "Ver preços" no fim da
 * home cairia no fim da página de preços. E a navbar, fora da home, aponta
 * para "/#services", que recarrega a home antes de a seção existir no DOM,
 * então o salto nativo do navegador para a âncora não encontra o alvo.
 *
 * Só age quando a ROTA muda. Clique em âncora dentro da mesma página segue o
 * comportamento de antes, sem interferência.
 */
export function RolagemDeRota() {
  const { pathname, hash } = useLocation();
  const rotaAnterior = useRef<string | null>(null);

  useEffect(() => {
    const mudouDeRota = rotaAnterior.current !== pathname;
    rotaAnterior.current = pathname;
    if (!mudouDeRota) return;

    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // A seção pode montar alguns quadros depois da rota: tenta por até 1s.
    const id = decodeURIComponent(hash.slice(1));
    let tentativas = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const rola = () => document.getElementById(id)?.scrollIntoView({ block: 'start' });

    /*
     * O site remede os gatilhos de animação quando as fontes assentam
     * (`refreshScrollTriggersWhenSettled`), e essa remedição devolve a página
     * ao topo, depois do salto. Por isso, quando tudo assenta, confere: se a
     * rolagem foi zerada, rola de novo. Se a pessoa já rolou por conta própria,
     * a rolagem não está em zero e ninguém é puxado de volta.
     */
    const reconfere = () => {
      if (window.scrollY < 10) rola();
    };

    const tenta = () => {
      if (document.getElementById(id)) {
        rola();
        timers.push(setTimeout(reconfere, 400), setTimeout(reconfere, 1200));
        document.fonts?.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(reconfere)));
        return;
      }
      if (tentativas++ < 20) timers.push(setTimeout(tenta, 50));
    };
    tenta();
    return () => timers.forEach(clearTimeout);
  }, [pathname, hash]);

  return null;
}

export default RolagemDeRota;
