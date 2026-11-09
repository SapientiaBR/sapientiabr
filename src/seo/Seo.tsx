import { createContext, useContext, useEffect, useLayoutEffect } from 'react';
import { NOT_FOUND_SEO, OG_IMAGE, SITE_LOCALE, SITE_NAME, absoluteUrl } from './site';

/** Uma tag de <head> em forma de dado, para servir tanto ao servidor quanto ao navegador. */
export interface HeadTag {
  tag: 'meta' | 'link' | 'script';
  attrs: Record<string, string>;
  /** Conteúdo de <script type="application/ld+json">. */
  text?: string;
}

export interface SeoProps {
  title: string;
  description: string;
  /** Caminho da rota, ex.: `/newsletter`. Gera canonical e og:url absolutos. */
  path?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

export interface HeadCollector {
  title: string;
  tags: HeadTag[];
}

/** `useLayoutEffect` avisa no servidor; lá o efeito não roda de qualquer forma. */
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Durante o pré-render o servidor fornece um coletor; no navegador o contexto é nulo. */
export const HeadCollectorContext = createContext<HeadCollector | null>(null);

export function buildHeadTags({ title, description, path, noindex, jsonLd }: SeoProps): HeadTag[] {
  const url = path ? absoluteUrl(path) : undefined;
  const meta = (key: 'name' | 'property', name: string, content: string): HeadTag => ({
    tag: 'meta',
    attrs: { [key]: name, content },
  });
  const tags: HeadTag[] = [
    meta('name', 'description', description),
    meta('name', 'author', SITE_NAME),
    meta(
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1',
    ),
  ];
  if (!noindex) {
    if (url) tags.push({ tag: 'link', attrs: { rel: 'canonical', href: url } });
    tags.push(
      meta('property', 'og:type', 'website'),
      meta('property', 'og:site_name', SITE_NAME),
      meta('property', 'og:locale', SITE_LOCALE),
      meta('property', 'og:title', title),
      meta('property', 'og:description', description),
      meta('property', 'og:image', OG_IMAGE.url),
      meta('property', 'og:image:width', String(OG_IMAGE.width)),
      meta('property', 'og:image:height', String(OG_IMAGE.height)),
      meta('property', 'og:image:alt', OG_IMAGE.alt),
      meta('name', 'twitter:card', 'summary'),
      meta('name', 'twitter:site', '@sapient_ia'),
      meta('name', 'twitter:title', title),
      meta('name', 'twitter:description', description),
      meta('name', 'twitter:image', OG_IMAGE.url),
      meta('name', 'twitter:image:alt', OG_IMAGE.alt),
    );
    if (url) tags.push(meta('property', 'og:url', url));
  }
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  for (const block of blocks) {
    tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, text: JSON.stringify(block) });
  }
  return tags;
}

const escapeAttr = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeText = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Serializa as tags com `data-seo`, a marca que o navegador usa para reconhecê-las. */
export function serializeHead(title: string, tags: HeadTag[]): string {
  const out = [`<title data-seo>${escapeText(title)}</title>`];
  for (const t of tags) {
    const attrs = Object.entries(t.attrs)
      .map(([k, v]) => ` ${k}="${escapeAttr(v)}"`)
      .join('');
    if (t.tag === 'script') {
      // `<` escapado como \u003c para o JSON nunca fechar o <script> por acidente.
      out.push(`<script data-seo${attrs}>${(t.text ?? '').replace(/</g, '\\u003c')}</script>`);
    } else {
      out.push(`<${t.tag} data-seo${attrs}>`);
    }
  }
  return out.join('\n    ');
}

const attrKey = (pairs: [string, string][]) =>
  pairs
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

const keyOf = (t: HeadTag) => `${t.tag}|${attrKey(Object.entries(t.attrs))}|${t.text ?? ''}`;

const keyOfElement = (el: Element) =>
  `${el.tagName.toLowerCase()}|${attrKey(
    Array.from(el.attributes)
      .filter((a) => a.name !== 'data-seo')
      .map((a) => [a.name, a.value] as [string, string]),
  )}|${el.tagName === 'SCRIPT' ? (el.textContent ?? '').replace(/\\u003c/g, '<') : ''}`;

/** Aplica o head da rota no documento: troca só o que mudou, sem piscar. */
function syncHead(title: string, tags: HeadTag[]) {
  if (document.title !== title) document.title = title;
  const wanted = new Map(tags.map((t) => [keyOf(t), t]));
  const existing = Array.from(document.head.querySelectorAll('[data-seo]')).filter(
    (el) => el.tagName !== 'TITLE',
  );
  for (const el of existing) {
    const k = keyOfElement(el);
    if (wanted.has(k)) wanted.delete(k);
    else el.remove();
  }
  for (const t of wanted.values()) {
    const el = document.createElement(t.tag);
    el.setAttribute('data-seo', '');
    for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
    if (t.text) el.textContent = t.text;
    document.head.appendChild(el);
  }
}

/**
 * Head por rota, sem dependência externa.
 *
 * No pré-render grava no coletor (o plugin do Vite escreve no HTML estático).
 * No navegador sincroniza o `<head>` quando a rota muda.
 */
export function Seo(props: SeoProps) {
  const collector = useContext(HeadCollectorContext);
  const tags = buildHeadTags(props);

  if (collector) {
    collector.title = props.title;
    collector.tags = tags;
  }

  const signature = props.title + tags.map(keyOf).join('\n');
  useIsoLayoutEffect(() => {
    syncHead(props.title, tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  return null;
}

export function NotFoundSeo() {
  return <Seo title={NOT_FOUND_SEO.title} description={NOT_FOUND_SEO.description} noindex />;
}
