/**
 * Constantes de SEO do site. Tudo que é URL absoluta, nome de marca e
 * metadado por rota mora aqui, e o build (vite.config.ts) lê as mesmas rotas
 * para gerar sitemap e HTML estático.
 */
export const SITE_URL = 'https://sapientiabr.cloud';
export const SITE_NAME = 'Sapient.IA';
export const SITE_LOCALE = 'pt_BR';

/** PNG 1024x1024 já publicado. Trocar por 1200x630 melhora o cartão grande. */
export const OG_IMAGE = {
  url: `${SITE_URL}/lovable-uploads/c31755cd-4460-4a4c-9fee-bf80629fc090.png`,
  width: 1024,
  height: 1024,
  alt: 'Logo da Sapient.IA, uma coruja em linhas finas',
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
