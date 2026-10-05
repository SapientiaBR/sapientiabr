import { useEffect } from 'react';

/**
 * Título e descrição por rota.
 *
 * O site não usa react-helmet: a página de newsletter já resolvia isso com um
 * useEffect escrito à mão. Isto é o mesmo gesto, extraído para as páginas do
 * funil não repetirem o bloco três vezes. Ao sair da rota, volta o que estava,
 * para a home não herdar o título da última página visitada.
 */
export function usePageMeta(titulo: string, descricao: string) {
  useEffect(() => {
    const tituloAnterior = document.title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    const descricaoAnterior = meta.getAttribute('content') ?? '';

    document.title = titulo;
    meta.setAttribute('content', descricao);

    return () => {
      document.title = tituloAnterior;
      meta?.setAttribute('content', descricaoAnterior);
    };
  }, [titulo, descricao]);
}
