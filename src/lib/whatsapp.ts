/** Número da Sapient.IA no WhatsApp. */
export const WHATSAPP_NUMERO = "5511920795583";

/** Frase-gatilho: a Sofia atende vários projetos no mesmo número e reconhece
 *  o assunto pela primeira mensagem. Toda mensagem pronta começa com ela. */
export const FRASE_GATILHO = "Oi! Vim pelo site da Sapient.IA";

/** Link wa.me com a frase-gatilho no começo; `resto` entra depois, se houver. */
export const waLink = (resto?: string) => {
  const msg = resto ? `${FRASE_GATILHO}. ${resto}` : FRASE_GATILHO;
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`;
};
