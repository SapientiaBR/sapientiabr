/**
 * Constantes de SEO do site. Tudo que é URL absoluta, nome de marca e
 * metadado por rota mora aqui, e o build (vite.config.ts) lê as mesmas rotas
 * para gerar sitemap e HTML estático.
 */
export const SITE_URL = 'https://sapientiabr.cloud';
export const SITE_NAME = 'Sapient.IA';
export const SITE_LOCALE = 'pt_BR';

/** PNG 1200x630: lockup prata e ouro sobre Azul Sideral (public/og-sapientia.png). */
export const OG_IMAGE = {
  url: `${SITE_URL}/og-sapientia.png`,
  width: 1200,
  height: 630,
  alt: 'Logo da Sapient.IA: coruja geométrica em prata e ouro sobre fundo azul-marinho',
};

export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/in/sapient-ia-automation-solutions-b397b7348',
  instagram: 'https://www.instagram.com/sapientia.br',
};

export const CONTACT = {
  /** Mesmo número exibido na seção de contato da home. */
  telephone: '+5511920795583',
};

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  /** Entra no sitemap.xml. */
  indexable: boolean;
}

/** Rotas que o build pré-renderiza. `/sequencial` e `/leobbq` são HTML estático em public/ e ficam de fora. */
export const ROUTES: Record<'home' | 'newsletter', RouteSeo> = {
  home: {
    path: '/',
    title: 'Sapient.IA | Automação com IA para atendimento e vendas',
    description:
      'Agência de automação com IA em São Paulo. Agentes de IA no WhatsApp, integração de CRM, agenda e pagamentos, e sites ligados ao funil de vendas.',
    indexable: true,
  },
  newsletter: {
    path: '/newsletter',
    title: 'Expresso IA | Newsletter da Sapient.IA',
    description:
      'Newsletter da Sapient.IA com cases de automação com IA e ferramentas testadas pelo time, direto no e-mail. Sem spam, cancele quando quiser.',
    indexable: true,
  },
};

export const NOT_FOUND_SEO = {
  title: 'Página não encontrada | Sapient.IA',
  description: 'O endereço que você abriu não existe neste site.',
};

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`;
