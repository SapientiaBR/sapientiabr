/**
 * Raio-X da Operação e a escada de produto da Sapient.IA.
 *
 * Fonte única dos pacotes no site. A fonte de verdade fora do código é
 * `contexto/04-escada-de-produto.md`, no workspace da Sapient.IA: mudar um
 * valor aqui sem mudar lá faz os dois divergirem sem ninguém perceber.
 *
 * Este arquivo não importa nada de propósito. Assim o teste roda com o Node
 * puro (`node --test tests/`), sem precisar de bundler nem de dependência nova.
 */

export const GARGALOS = [
  'leads-sem-resposta',
  'follow-up-manual',
  'sistemas-desconectados',
  'equipe-sobrecarregada',
  'atendimento-sem-contexto',
  'presenca-digital-solta',
] as const;

export type Gargalo = (typeof GARGALOS)[number];

export const ROTULOS: Record<Gargalo, string> = {
  'leads-sem-resposta': 'Oportunidade esfria antes da conversa começar',
  'follow-up-manual': 'O próximo contato depende da memória de alguém',
  'sistemas-desconectados': 'Formulário, WhatsApp, CRM, agenda e pagamento não conversam',
  'equipe-sobrecarregada': 'O trabalho operacional ocupa o tempo de quem deveria decidir',
  'atendimento-sem-contexto': 'O cliente repete informação porque o histórico ficou em outro canal',
  'presenca-digital-solta': 'A página existe mas não encaminha o lead para o fluxo comercial',
};

const COMERCIAIS: readonly Gargalo[] = ['leads-sem-resposta', 'follow-up-manual'];
const BACKOFFICE: readonly Gargalo[] = [
  'sistemas-desconectados',
  'equipe-sobrecarregada',
  'atendimento-sem-contexto',
];

export type NumeroDegrau = 1 | 2 | 3 | 4;

export interface Degrau {
  numero: NumeroDegrau;
  nome: string;
  setup: number;
  recorrencia: number;
  prazo: string;
  paraQuem: string;
  resumo: string;
  inclui: string[];
  naoInclui: string[];
}

export const DEGRAUS: Record<NumeroDegrau, Degrau> = {
  1: {
    numero: 1,
    nome: 'Fluxo Único',
    setup: 2400,
    recorrencia: 590,
    prazo: '2 semanas',
    paraQuem: 'Para operação que tem um gargalo só, bem delimitado, e sistemas que já existem.',
    resumo: 'Uma automação, até 3 integrações.',
    inclui: [
      'Uma automação, do gatilho ao registro final',
      'Até 3 integrações entre sistemas que você já usa',
      'Tratamento de erro e notificação de falha',
      'Testes com dado real antes de subir',
      'Acompanhamento na primeira semana',
    ],
    naoInclui: [
      'Agente de IA conversacional',
      'CRM novo ou migração de CRM',
      'Painel de métricas',
      'Site ou landing page',
      'Segundo fluxo, orçado à parte',
    ],
  },
  2: {
    numero: 2,
    nome: 'Agente Comercial',
    setup: 3900,
    recorrencia: 690,
    prazo: '3 a 4 semanas',
    paraQuem: 'Para operação que perde lead por demora de resposta e não tem funil organizado.',
    resumo: 'Agente no WhatsApp, CRM, funil e painel.',
    inclui: [
      'Agente no WhatsApp com script comercial estruturado',
      'Classificação de lead, separando contato, oportunidade e lead qualificado',
      'Funil comercial com etapas, do primeiro contato ao fechamento',
      'Integração com CRM, sem digitação manual',
      'Handoff para atendimento humano com contexto completo',
      'Painel de métricas lendo dado direto do sistema',
      'Ambiente dedicado e isolado, com o dado sendo seu',
      'Painel de atendimento com etiqueta, fila e filtro',
      'Testes com dado real e acompanhamento na primeira semana',
    ],
    naoInclui: [
      'Fluxo de backoffice',
      'Base de conhecimento indexada',
      'Site ou landing page',
      'Segundo canal além do WhatsApp',
      'Segundo setor de atendimento',
    ],
  },
  3: {
    numero: 3,
    nome: 'Operação Assistida',
    setup: 7200,
    recorrencia: 1190,
    prazo: '4 a 5 semanas',
    paraQuem:
      'Para operação que já resolveu o comercial e trava no que vem depois, entre o fechamento e a entrega.',
    resumo: 'O comercial mais 2 fluxos de backoffice e página conectada.',
    inclui: [
      'Tudo do Agente Comercial',
      '2 fluxos de backoffice, como onboarding, cobrança, aprovação interna ou coleta de documento',
      'Painel de operação com métricas dos dois lados, comercial e entrega',
      'Uma landing page conectada ao funil, com captura no mesmo CRM',
      'Revisão de roteamento entre os fluxos',
    ],
    naoInclui: [
      'Múltiplos canais de atendimento',
      'Múltiplos setores com roteamento entre eles',
      'Base de conhecimento indexada',
      'Site institucional completo',
      'Disparo programado em massa',
    ],
  },
  4: {
    numero: 4,
    nome: 'Operação Conectada',
    setup: 12800,
    recorrencia: 2200,
    prazo: '5 a 7 semanas',
    paraQuem:
      'Para operação com mais de um canal, mais de um setor, ou volume de informação que o agente precisa consultar.',
    resumo: 'Multicanal, roteamento por setor, base de conhecimento e site.',
    inclui: [
      'Tudo da Operação Assistida',
      'Atendimento multicanal',
      'Roteamento por setor, com triagem automática e handoff por área',
      'Base de conhecimento indexada com o seu conteúdo',
      'Disparos programados, lembretes e informes',
      'Site institucional conectado ao atendimento',
      'Atendimento por áudio, com compreensão e resposta em áudio',
    ],
    naoInclui: [
      'Desenvolvimento de sistema próprio seu',
      'Migração de base de dado legada',
      'Integração com sistema sem API pública ou documentada',
      'Operação de mídia paga',
    ],
  },
};

export const LISTA_DEGRAUS: Degrau[] = [DEGRAUS[1], DEGRAUS[2], DEGRAUS[3], DEGRAUS[4]];

export interface EntradaRaioX {
  gargalos?: string[];
  integracoes?: number;
  canais?: number;
  setores?: number;
  baseConhecimento?: boolean;
  canalDigitalAtivo?: boolean;
  decisor?: boolean;
}

export interface ResultadoRaioX {
  degrau: NumeroDegrau;
  nomeDegrau: string;
  setup: number;
  recorrencia: number;
  qualificado: boolean;
  motivo: string;
  gargalosSelecionados: Gargalo[];
}

const ehGargalo = (g: string): g is Gargalo => (GARGALOS as readonly string[]).includes(g);

export function diagnosticarOperacao({
  gargalos = [],
  integracoes = 1,
  canais = 1,
  setores = 1,
  baseConhecimento = false,
  canalDigitalAtivo = true,
  decisor = true,
}: EntradaRaioX): ResultadoRaioX {
  const selecionados = gargalos.filter(ehGargalo);

  // Precedência deliberada: multicanal é o que mais move o preço, então é avaliado primeiro.
  let degrau: NumeroDegrau;
  if (canais > 1 || setores > 1 || baseConhecimento) {
    degrau = 4;
  } else if (selecionados.length >= 2 && selecionados.some((g) => BACKOFFICE.includes(g))) {
    degrau = 3;
  } else if (selecionados.some((g) => COMERCIAIS.includes(g))) {
    degrau = 2;
  } else {
    degrau = 1;
  }

  // Acima de 3 integrações o escopo do Fluxo Único já estourou.
  if (degrau === 1 && integracoes > 3) degrau = 2;

  let qualificado = true;
  let motivo = `Operação com ${selecionados.length} gargalo(s) mapeado(s) e ${integracoes} integração(ões).`;
  if (!canalDigitalAtivo) {
    qualificado = false;
    motivo = 'Não existe canal digital de atendimento ativo hoje.';
  } else if (!decisor) {
    qualificado = false;
    motivo = 'Quem respondeu não participa da decisão de contratação.';
  }

  return {
    degrau,
    nomeDegrau: DEGRAUS[degrau].nome,
    setup: DEGRAUS[degrau].setup,
    recorrencia: DEGRAUS[degrau].recorrencia,
    qualificado,
    motivo,
    gargalosSelecionados: selecionados,
  };
}

/** "R$ 2.400". Com espaço depois do símbolo, que é como o site escreve preço. */
export function brl(n: number): string {
  return 'R$ ' + n.toLocaleString('pt-BR');
}

/**
 * Como o investimento aparece no resultado do Raio-X.
 *
 * Decisão do Leo em 2026-10-05: valor exato nos dois pacotes menores, faixa
 * nos dois maiores. A faixa é a mesma para os dois de propósito: para quem cai
 * na Operação Conectada, "a partir de R$ 7.200" esconderia um preço que nunca é
 * esse, e "a partir de R$ 12.800" não suavizaria nada. "Entre R$ 7.200 e
 * R$ 12.800" é verdade para os dois, porque o escopo final é que decide entre
 * eles. O valor exato continua na página de preços.
 */
export function investimentoExibido(numero: NumeroDegrau): { setup: string; recorrencia: string; exato: boolean } {
  if (numero <= 2) {
    const d = DEGRAUS[numero];
    return { setup: brl(d.setup), recorrencia: brl(d.recorrencia), exato: true };
  }
  return {
    setup: `entre ${brl(DEGRAUS[3].setup)} e ${brl(DEGRAUS[4].setup)}`,
    recorrencia: `entre ${brl(DEGRAUS[3].recorrencia)} e ${brl(DEGRAUS[4].recorrencia)}`,
    exato: false,
  };
}
