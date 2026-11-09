/**
 * Entrada do pré-render (lado servidor). Só o plugin do Vite importa este
 * arquivo, durante `vite build`; o navegador nunca o carrega.
 *
 * Renderiza a página de cada rota com as mesmas componentes do app. Fica de
 * fora o que só existe no navegador (máscara de entrada, rolagem suave,
 * toasts), porque nada disso é conteúdo.
 */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HeadCollectorContext, serializeHead, type HeadCollector } from '@/seo/Seo';
import Index from '@/pages/Index';
import Newsletter from '@/pages/Newsletter';
import NotFound from '@/pages/NotFound';

const PAGES: Record<string, () => JSX.Element> = {
  '/': () => <Index />,
  '/newsletter': () => <Newsletter />,
  '/404': () => <NotFound />,
};

export function render(url: string): { html: string; head: string } {
  const Page = PAGES[url];
  if (!Page) throw new Error(`Rota sem pré-render: ${url}`);

  const collector: HeadCollector = { title: '', tags: [] };

  // Componentes com useLayoutEffect avisam no servidor. O efeito não roda
  // aqui de qualquer forma, então o aviso é ruído.
  const original = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('useLayoutEffect')) return;
    original(...args);
  };
  try {
    const html = renderToString(
      <HeadCollectorContext.Provider value={collector}>
        <StaticRouter location={url === '/404' ? '/pagina-nao-encontrada' : url}>
          {Page()}
        </StaticRouter>
      </HeadCollectorContext.Provider>,
    );
    return { html, head: serializeHead(collector.title, collector.tags) };
  } finally {
    console.error = original;
  }
}
