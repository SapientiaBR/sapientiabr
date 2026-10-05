import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RevealOnScroll, RevealText } from '@/motion';
import { usePageMeta } from '@/lib/meta';
import { DEGRAUS, LISTA_DEGRAUS, investimentoExibido, type NumeroDegrau } from '@/lib/raio-x';

/** Agenda do diagnóstico. É o mesmo link que o contato e o rodapé já usam. */
const AGENDA = 'https://bit.ly/40BtBp2';
const WHATSAPP_MATERIAL =
  'https://wa.me/5511920795583?text=' +
  encodeURIComponent('Oi! Fiz o Raio-X da operação e quero receber o material de preparação.');

const BOTAO =
  'inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-gradient-sapient px-8 text-lg font-semibold text-ink-on-brand shadow-lg shadow-purple-500/30 transition-opacity hover:opacity-90 sm:w-auto';

/** Aceita só 1 a 4. Qualquer outra coisa na URL cai no degrau de entrada. */
const lerDegrau = (valor: string | null): NumeroDegrau => {
  const n = Number(valor);
  return n === 1 || n === 2 || n === 3 || n === 4 ? n : 1;
};

const Obrigado = () => {
  usePageMeta('Próximo passo | Sapient.IA', 'Seu diagnóstico está pronto. Veja qual é o próximo passo para a sua operação.');

  const [params] = useSearchParams();
  const qualificado = params.get('faixa') === 'qualificado';
  const numero = lerDegrau(params.get('degrau'));
  const degrau = DEGRAUS[numero];
  const investimento = investimentoExibido(numero);
  const textoInvestimento = investimento.exato
    ? `${investimento.setup} de implantação e ${investimento.recorrencia} por mês`
    : `${investimento.setup} de implantação, conforme o escopo final`;

  return (
    <div className="bg-sapient-deep min-h-screen">
      <Navbar />

      <main className="px-4 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container mx-auto max-w-2xl">
          <RevealText as="h1" className="mb-4 text-3xl font-bold text-ink-primary md:text-5xl">
            {qualificado ? (
              <>
                Seu diagnóstico está <em className="accent">pronto</em>.
              </>
            ) : (
              <>
                Guarde este <em className="accent">diagnóstico</em>.
              </>
            )}
          </RevealText>
          <RevealOnScroll delay={0.1}>
            <p className="mb-8 text-ink-secondary md:text-lg">
              {qualificado
                ? `Pelo que você respondeu, o pacote ${degrau.nome} é o que resolve: ${textoInvestimento}.`
                : `Pelo que você respondeu, ainda não é o momento de contratar. O diagnóstico continua valendo: quando fizer sentido, o pacote ${degrau.nome} é o ponto de partida.`}
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="rounded-xl border-t-[3px] border-cyan-400 bg-ink-primary/[0.04] p-6 md:p-8">
            {qualificado ? (
              <>
                <h2 className="mb-2 text-xl font-semibold text-ink-primary md:text-2xl">
                  Próximo passo: diagnóstico de 45 minutos
                </h2>
                <p className="mb-6 text-ink-secondary">
                  Uma conversa para mapear o fluxo atual, confirmar se o pacote recomendado é mesmo o certo e priorizar
                  por onde começar. Você sai com um escopo nomeado, não com uma proposta genérica.
                </p>
                <a href={AGENDA} target="_blank" rel="noopener noreferrer" className={BOTAO}>
                  Escolher um horário
                  <ArrowRight className="h-5 w-5" />
                </a>
                <p className="mt-3 text-sm text-ink-muted">Sem custo. 45 minutos.</p>
              </>
            ) : (
              <>
                <h2 className="mb-2 text-xl font-semibold text-ink-primary md:text-2xl">Receba o material de preparação</h2>
                <p className="mb-6 text-ink-secondary">
                  Mandamos sem custo o que ajuda a preparar a operação antes de automatizar: como organizar o canal de
                  atendimento, o que precisa estar registrado no CRM e quais decisões vêm antes da ferramenta.
                </p>
                <a href={WHATSAPP_MATERIAL} target="_blank" rel="noopener noreferrer" className={BOTAO}>
                  Receber o material
                  <ArrowRight className="h-5 w-5" />
                </a>
                <p className="mt-3 text-sm text-ink-muted">Você sai da lista quando quiser, respondendo a própria mensagem.</p>
              </>
            )}
          </RevealOnScroll>

          {/* Vitrine da escada. Nenhum caminho do funil termina sem saída. */}
          <RevealOnScroll as="section" className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-ink-primary">A escada inteira</h2>
            <ul className="space-y-3">
              {LISTA_DEGRAUS.map((d) => (
                <li
                  key={d.numero}
                  className={`rounded-xl border p-4 ${
                    d.numero === numero ? 'border-cyan-400 bg-cyan-400/10' : 'border-ink-primary/10 bg-ink-primary/[0.04]'
                  }`}
                >
                  <p className="font-semibold text-ink-primary">
                    {d.nome}
                    {d.numero === numero && <span className="ml-2 text-sm font-normal text-cyan-300">recomendado para você</span>}
                  </p>
                  <p className="text-sm text-ink-secondary">{d.resumo}</p>
                </li>
              ))}
            </ul>
            <Link
              to="/precos"
              className="mt-4 inline-block font-semibold text-purple-300 underline underline-offset-4 transition-colors hover:text-ink-primary"
            >
              Ver o que entra e o que não entra em cada pacote
            </Link>
          </RevealOnScroll>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Obrigado;
