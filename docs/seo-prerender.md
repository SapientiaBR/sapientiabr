# SEO e pré-render

O site é uma SPA (Vite + React). Para buscadores e assistentes de IA que não rodam JavaScript, o `vite build` grava o HTML de cada rota já com o conteúdo.

## Como funciona

- `plugins/prerender.ts` roda no `closeBundle` do build comum. Compila `src/prerender/entry.tsx` para Node, renderiza as páginas reais com `renderToString` e grava `dist/index.html`, `dist/newsletter/index.html` e `dist/404.html` (noindex). Também gera `dist/sitemap.xml` e `dist/llms-full.txt` (texto da home em Markdown, tirado do mesmo HTML).
- Se o pré-render falhar, o build não quebra: o `dist/index.html` fica como SPA e o aviso `[sapient-prerender] FALHOU` aparece no log.
- `index.html` tem dois marcadores: `<!--seo-head-start-->...<!--seo-head-end-->` (substituído pelo head da rota) e `<!--app-html-->` dentro de `#root`. Não apague nenhum.
- Head por rota: componente `<Seo />` (`src/seo/Seo.tsx`). Cada página o renderiza com title, description, canonical e JSON-LD. No navegador ele sincroniza o `<head>` quando a rota muda; tags do pré-render têm o atributo `data-seo`.
- Texto e metadados de rota: `src/seo/site.ts` (`ROUTES`). JSON-LD: `src/seo/schema.ts`. Serviços e FAQ vêm de `src/content/`, os mesmos módulos que as seções usam.

## Ao criar uma rota nova

1. Crie a página com `<Seo />`.
2. Adicione a rota em `ROUTES` (`src/seo/site.ts`), em `PAGES` (`src/prerender/entry.tsx`) e em `INDEXABLE_ROUTES` (`plugins/prerender.ts`).
3. `/sequencial` e `/leobbq` são HTML estático em `public/` e ficam fora do pré-render. `/sequencial` tem `noindex` de propósito.

## Arquivos estáticos

`public/robots.txt` (bots de IA liberados, aponta o sitemap) e `public/llms.txt` (resumo curto, escrito à mão: atualize se a oferta mudar).
