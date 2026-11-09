import { faqs } from '@/content/faq';
import { services } from '@/content/services';
import { CONTACT, ROUTES, SITE_NAME, SITE_URL, SOCIAL, OG_IMAGE, absoluteUrl } from './site';

/**
 * JSON-LD das páginas. Regras deste arquivo:
 * - só descreve o que está visível na página (serviços e FAQ vêm dos mesmos
 *   módulos que as seções renderizam);
 * - sem preço, sem avaliação, sem número de cliente: nada disso existe no site;
 * - sem fundador: o site não apresenta pessoa nenhuma hoje.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const organization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: SITE_NAME,
  alternateName: 'Sapient.IA Automation Solutions',
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height },
  image: OG_IMAGE.url,
  description:
    'A Sapient.IA é uma agência de automação com IA. Cria agentes de IA para WhatsApp, automações e integrações entre CRM, agenda, pagamentos e sistemas internos, e sites institucionais ligados ao funil de vendas.',
  slogan: 'IA que atende, vende e organiza a sua operação.',
  telephone: CONTACT.telephone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  knowsLanguage: 'pt-BR',
  knowsAbout: [
    'Automação com inteligência artificial',
    'Agentes de IA para WhatsApp',
    'Integração de CRM, agenda e pagamentos',
    'Qualificação de leads e follow-up automático',
    'Sites institucionais e landing pages',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: CONTACT.telephone,
      availableLanguage: 'pt-BR',
      url: 'https://wa.me/5511920795583',
    },
  ],
  sameAs: [SOCIAL.linkedin, SOCIAL.instagram],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'O que a Sapient.IA entrega',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'Country', name: 'Brasil' },
      },
    })),
  },
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: 'Sapient.IA Automation Solutions',
  inLanguage: 'pt-BR',
  publisher: { '@id': ORG_ID },
};

export function homeJsonLd() {
  const home = ROUTES.home;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      website,
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: absoluteUrl(home.path),
        name: home.title,
        description: home.description,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE.url },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

export function newsletterJsonLd() {
  const r = ROUTES.newsletter;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${absoluteUrl(r.path)}#webpage`,
        url: absoluteUrl(r.path),
        name: r.title,
        description: r.description,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORG_ID },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Expresso IA', item: absoluteUrl(r.path) },
          ],
        },
      },
      // O @id da organização só resolve onde o nó completo existe; repetimos o mínimo aqui.
      { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, url: `${SITE_URL}/` },
      { '@type': 'WebSite', '@id': WEBSITE_ID, url: `${SITE_URL}/`, name: SITE_NAME, inLanguage: 'pt-BR' },
    ],
  };
}
