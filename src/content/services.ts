import type { Icon3DName } from '@/components/ui/icon-3d';

/**
 * Capacidades da home. Fonte única: a seção de serviços e o JSON-LD leem daqui.
 * Os ícones 3D vêm da biblioteca 3dicons (CC0); cada item guarda só o nome.
 */
export const services: { icon: Icon3DName; title: string; description: string; color: string }[] = [
  {
    icon: 'chat-bubble',
    title: 'Agentes de IA',
    description: 'Atendem, tiram dúvidas e coletam informações no WhatsApp, site e redes sociais, dentro das regras do seu negócio.',
    color: 'from-cyan-300/15 to-cyan-300/5'
  },
  {
    icon: 'calender',
    title: 'Agenda conectada',
    description: 'Agendamentos, confirmações e lembretes integrados à sua disponibilidade e ao histórico do cliente.',
    color: 'from-purple-300/15 to-purple-300/5'
  },
  {
    icon: 'file-text',
    title: 'Propostas e contratos',
    description: 'Acione documentos, aprovações e próximas etapas a partir do que acontece no seu funil.',
    color: 'from-cyan-300/15 to-cyan-300/5'
  },
  {
    icon: 'cube',
    title: 'Operação integrada',
    description: 'Conectamos CRM, formulários, agenda, pagamentos e ferramentas internas em um fluxo que sua equipe acompanha.',
    color: 'from-purple-300/15 to-purple-300/5'
  },
  {
    icon: 'notify-heart',
    title: 'Follow-up inteligente',
    description: 'O próximo contato deixa de depender da memória do SDR: o sistema cria tarefas e mensagens no momento certo.',
    color: 'from-cyan-300/15 to-cyan-300/5'
  },
  {
    icon: 'computer',
    title: 'CRM com contexto',
    description: 'Centralize conversas, dados do lead e etapas do processo para que atendimento e comercial vejam a mesma história.',
    color: 'from-purple-300/15 to-purple-300/5'
  },
  {
    icon: 'chart',
    title: 'Captação de leads',
    description: 'Cada lead recebido é encaminhado para o CRM, qualificado e direcionado para a próxima ação.',
    color: 'from-cyan-300/15 to-cyan-300/5'
  },
  {
    icon: 'explorer',
    title: 'Sites institucionais',
    description: 'Sites e landing pages pensados para mobile, claros para quem chega e integrados ao seu funil desde o primeiro clique.',
    color: 'from-purple-300/15 to-purple-300/5'
  }
];
