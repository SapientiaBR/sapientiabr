/**
 * Plugin do Vite: pré-renderiza as rotas indexáveis em HTML estático.
 *
 * Roda dentro do `vite build` comum (nenhum script extra no package.json, nada
 * de navegador headless). Depois que o build do cliente termina:
 *
 * 1. compila `src/prerender/entry.tsx` para Node (build SSR do próprio Vite);
 * 2. renderiza cada rota com as componentes reais do app (`renderToString`);
 * 3. grava `dist/<rota>/index.html` a partir do `dist/index.html` do cliente,
 *    trocando os marcadores de head e de conteúdo;
 * 4. gera `dist/sitemap.xml` e `dist/404.html` (noindex).
 *
 * Se algo falhar, o build NÃO quebra: o `dist/index.html` original (SPA) fica
 * como está e o aviso aparece no log. Página no ar sem pré-render é pior que
 * nada de SEO, mas melhor que site fora do ar.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import type { Plugin, ResolvedConfig } from 'vite';

const HEAD_MARK = /<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/;
const BODY_MARK = '<!--app-html-->';

// Espelha src/seo/site.ts sem importá-lo (este arquivo roda antes do build SSR).
const SITE_URL = 'https://sapientiabr.cloud';
const INDEXABLE_ROUTES = ['/', '/newsletter'];

function lastModified(root: string): string {
  try {
    const out = execSync('git log -1 --format=%cs -- src public/llms.txt public/llms-full.txt', {
      cwd: root,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out;
  } catch {
    /* sem git no ambiente de build: cai na data do build */
  }
  return new Date().toISOString().slice(0, 10);
}


const decode = (t: string) =>
  t
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const plain = (html: string) => decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

/**
 * Converte o HTML pré-renderizado da home em Markdown para o llms-full.txt.
 * Sai do mesmo HTML que o visitante vê, então o texto nunca diverge da página.
 */
function htmlToMarkdown(html: string): string {
  let s = html.slice(html.indexOf('<body'));
  s = s.replace(/<(script|style|svg|noscript|nav|button|canvas|form)[\s\S]*?<\/\1>/gi, '');
  s = s.replace(
    /<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi,
    (_m, n, t) => `\n\n${'#'.repeat(Number(n))} ${plain(t)}\n\n`,
  );
  s = s.replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href, t) => {
    const label = plain(t);
    if (!label || href === '#') return label;
    const url = href.startsWith('/')
      ? `${SITE_URL}${href}`
      : href.startsWith('#')
        ? `${SITE_URL}/${href}`
        : href;
    return `[${label}](${decode(url)})`;
  });
  s = s.replace(/<li[^>]*>/gi, '\n- ').replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/(p|div|section|footer|header|li|ul|main|span)>/gi, (m) =>
    m === '</span>' ? ' ' : '\n',
  );
  s = decode(s.replace(/<[^>]+>/g, ''));
  const lines = s.split('\n').map((l) => l.replace(/\s+/g, ' ').trim());
  const out: string[] = [];
  for (const l of lines) {
    if (l === '' && out[out.length - 1] === '') continue;
    out.push(l);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function sitemap(lastmod: string): string {
  const urls = INDEXABLE_ROUTES.map((r) => {
    const loc = r === '/' ? `${SITE_URL}/` : `${SITE_URL}${r}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function prerender(): Plugin {
  let config: ResolvedConfig;

  return {
    name: 'sapient-prerender',
    apply: 'build',
    enforce: 'post',

    configResolved(resolved) {
      config = resolved;
    },

    async closeBundle() {
      // O build SSR interno também dispara closeBundle; só o do cliente segue.
      if (config.build.ssr) return;

      const root = config.root;
      const outDir = path.resolve(root, config.build.outDir);
      const templatePath = path.join(outDir, 'index.html');
      const tmpDir = path.join(root, 'node_modules', '.prerender');

      try {
        const template = fs.readFileSync(templatePath, 'utf-8');
        if (!HEAD_MARK.test(template) || !template.includes(BODY_MARK)) {
          throw new Error('index.html sem os marcadores seo-head e app-html');
        }

        const { build } = await import('vite');
        const reactPlugin = config.plugins.find((p) => p.name.startsWith('vite:react'));

        fs.rmSync(tmpDir, { recursive: true, force: true });
        await build({
          configFile: false,
          root,
          mode: config.mode,
          logLevel: 'warn',
          publicDir: false,
          plugins: reactPlugin ? [reactPlugin] : [],
          resolve: config.resolve as never,
          ssr: { noExternal: true },
          build: {
            ssr: path.join(root, 'src/prerender/entry.tsx'),
            outDir: tmpDir,
            emptyOutDir: true,
            minify: false,
            sourcemap: false,
            rollupOptions: { output: { format: 'esm', entryFileNames: 'entry.mjs' } },
          },
        });

        const mod = await import(pathToFileURL(path.join(tmpDir, 'entry.mjs')).href);
        const render = mod.render as (url: string) => { html: string; head: string };

        const write = (file: string, html: string) => {
          fs.mkdirSync(path.dirname(file), { recursive: true });
          fs.writeFileSync(file, html);
        };

        const compose = (url: string) => {
          const { html, head } = render(url);
          if (html.length < 500) throw new Error(`Pré-render de ${url} saiu vazio`);
          return template
            .replace(HEAD_MARK, () => head)
            .replace(BODY_MARK, () => html);
        };

        for (const route of INDEXABLE_ROUTES) {
          const file = route === '/' ? templatePath : path.join(outDir, route, 'index.html');
          write(file, compose(route));
        }
        write(path.join(outDir, '404.html'), compose('/404'));
        const homeHtml = fs.readFileSync(templatePath, 'utf-8');
        write(
          path.join(outDir, 'llms-full.txt'),
          `# Sapient.IA: texto completo da página inicial

> Gerado a partir do HTML de ${SITE_URL}/ a cada publicação. Resumo curto em ${SITE_URL}/llms.txt

${htmlToMarkdown(homeHtml)}
`,
        );
        write(path.join(outDir, 'sitemap.xml'), sitemap(lastModified(root)));

        config.logger.info(`\n  pré-render: ${INDEXABLE_ROUTES.join(', ')} + 404.html + sitemap.xml`);
      } catch (err) {
        config.logger.warn(
          `\n  [sapient-prerender] FALHOU, o site sai como SPA sem HTML estático:\n  ${
            err instanceof Error ? err.stack ?? err.message : String(err)
          }\n`,
        );
      } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    },
  };
}
