import { useLocation } from 'react-router-dom';

/**
 * Link para uma seção da home que funciona de qualquer rota.
 *
 * Na home devolve "#services", e a rolagem suave continua igual. Fora dela,
 * como em /precos ou /raio-x, devolve "/#services": sem isso a navbar
 * apontaria para seções que não existem na página atual.
 */
export function useAncora() {
  const { pathname } = useLocation();
  const naHome = pathname === '/';
  const ancora = (id: string) => (naHome ? `#${id}` : `/#${id}`);
  return { ancora, naHome };
}
