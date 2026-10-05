import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RevealOnScroll, RevealText } from '@/motion';
import { usePageMeta } from '@/lib/meta';
import {
  GARGALOS,
  ROTULOS,
  LISTA_DEGRAUS,
  DEGRAUS,
  diagnosticarOperacao,
  investimentoExibido,
  type Gargalo,
  type ResultadoRaioX,
} from '@/lib/raio-x';

/*
 * Mesmo vocabulário das seções da home: cartão translúcido sobre
 * `bg-sapient-deep`, filete `ink-primary/10`, destaque com borda cyan no topo,
 * botão no gradiente da marca. Tudo em classe de tema, então a página segue o
 * alternador claro/escuro sem nenhum código a mais.
 */
const CARTAO = 'rounded-xl border border-ink-primary/10 bg-ink-primary/[0.04]';
const CAMPO =
  'mt-2 h-12 w-full appearance-none rounded-md border border-ink-primary/15 bg-sapient-deep px-3 text-base text-ink-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400';
const BOTAO =
  'inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-gradient-sapient px-8 text-lg font-semibold text-ink-on-brand shadow-lg shadow-purple-500/30 transition-opacity hover:opacity-90 sm:w-auto';

const WHATSAPP_MATERIAL =
  'https://wa.me/5511920795583?text=' +
  encodeURIComponent('Oi! Fiz o Raio-X da operação e quero receber o material de preparação.');

type Selecoes = {
  integracoes: string;
  canais: string;
  setores: string;
  baseConhecimento: string;
  canalDigitalAtivo: string;
  decisor: string;
};

const VAZIO: Selecoes = {
  integracoes: '',
  canais: '',
  setores: '',
  baseConhecimento: '',
  canalDigitalAtivo: '',
  decisor: '',
};

const RaioX = () => {
  usePageMeta(
    'Raio-X da Operação | Sapient.IA',
    'Seis perguntas sobre a sua operação. No fim você vê onde ela vaza, qual pacote resolve e quanto custa, na tela.',
  );

  const [gargalos, setGargalos] = useState<Gargalo[]>([]);
  const [s, setS] = useState<Selecoes>(VAZIO);
  const [erro, setErro] = useState(false);
  const [resultado, setResultado] = useState<ResultadoRaioX | null>(null);
  const topoResultado = useRef<HTMLHeadingElement>(null);

  const alterna = (g: Gargalo) =>
    setGargalos((atual) => (atual.includes(g) ? atual.filter((x) => x !== g) : [...atual, g]));
  const muda = (campo: keyof Selecoes) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    setS((atual) => ({ ...atual, [campo]: e.target.value }));

  const enviar = (ev: React.FormEvent) => {
    ev.preventDefault();
    const faltando = (Object.keys(s) as (keyof Selecoes)[]).find((k) => s[k] === '');
    if (faltando) {
      setErro(true);
      document.getElementById(faltando)?.focus();
      return;
    }
    setErro(false);
    setResultado(
      diagnosticarOperacao({
        gargalos,
        integracoes: Number(s.integracoes),
        canais: Number(s.canais),
        setores: Number(s.setores),
        baseConhecimento: s.baseConhecimento === 'sim',
        canalDigitalAtivo: s.canalDigitalAtivo === 'sim',
        decisor: s.decisor === 'sim',
      }),
    );
    // No celular o resultado começa fora da tela; sem rolar e mover o foco,
    // a pessoa ficaria olhando para o fim de um formulário que já sumiu.
    requestAnimationFrame(() => {
      topoResultado.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
      topoResultado.current?.focus({ preventScroll: true });
    });
  };

  const refazer = () => {
    setResultado(null);
    requestAnimationFrame(() => document.getElementById('topo-raio-x')?.scrollIntoView({ block: 'start' }));
  };

  const investimento = resultado ? investimentoExibido(resultado.degrau) : null;
  const degrau = resultado ? DEGRAUS[resultado.degrau] : null;

  return (
    <div className="bg-sapient-deep min-h-screen">
      <Navbar />

      <main id="topo-raio-x" className="px-4 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.18em] text-purple-300 md:text-sm">
              Antes de automatizar, entender
            </p>
            <RevealText as="h1" className="mb-4 text-3xl font-bold text-ink-primary md:text-5xl">
              Raio-X da <em className="accent">operação</em>.
            </RevealText>
            <RevealOnScroll delay={0.15}>
              <p className="mx-auto max-w-xl text-ink-secondary md:text-lg">
                Seis perguntas. No fim você vê onde a operação vaza, qual pacote resolve e quanto custa. Sem cadastro
                para ver o resultado.
              </p>
            </RevealOnScroll>
          </div>

          {resultado && degrau && investimento ? (
            <section aria-live="polite" className="space-y-6">
              <h2
                ref={topoResultado}
                tabIndex={-1}
                className="scroll-mt-28 text-2xl font-bold text-ink-primary outline-none md:text-3xl"
              >
                Onde a sua operação <em className="accent">vaza</em>
              </h2>
              <ul className="space-y-3">
                {resultado.gargalosSelecionados.length === 0 ? (
                  <li className="text-ink-secondary">
                    Você não marcou nenhum gargalo. O diagnóstico partiu do tamanho da operação.
                  </li>
                ) : (
                  resultado.gargalosSelecionados.map((g) => (
                    <li key={g} className="flex gap-3 text-ink-secondary">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-400" aria-hidden="true" />
                      {ROTULOS[g]}
                    </li>
                  ))
                )}
              </ul>

              <div className="rounded-xl border-t-[3px] border-cyan-400 bg-ink-primary/[0.04] p-6 md:p-8">
                <p className="mb-2 font-label text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  Pacote recomendado
                </p>
                <h3 className="mb-3 text-2xl font-bold text-ink-primary md:text-3xl">{degrau.nome}</h3>
                <p className="text-xl font-semibold text-cyan-300 md:text-2xl">
                  {investimento.exato
                    ? `${investimento.setup} de implantação + ${investimento.recorrencia} por mês`
                    : `${investimento.setup} de implantação`}
                </p>
                {!investimento.exato && (
                  <p className="mt-1 text-ink-secondary">
                    mais {investimento.recorrencia} por mês, conforme o escopo final.
                  </p>
                )}
                <p className="mt-4 text-ink-secondary">
                  {degrau.resumo} Prazo de {degrau.prazo}.
                </p>
                <p className="mt-3 text-sm text-ink-muted">{resultado.motivo}</p>
              </div>

              <div className={`${CARTAO} p-6 md:p-8`}>
                {resultado.qualificado ? (
                  <>
                    <h3 className="mb-2 text-xl font-semibold text-ink-primary">Próximo passo: diagnóstico de 45 minutos</h3>
                    <p className="mb-6 text-ink-secondary">
                      Uma conversa para mapear o fluxo atual, confirmar se o pacote recomendado é mesmo o certo e
                      priorizar por onde começar. Sem custo.
                    </p>
                    <Link to={`/obrigado?degrau=${resultado.degrau}&faixa=qualificado`} className={BOTAO}>
                      Agendar o diagnóstico
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </>
                ) : (
                  <>
                    <h3 className="mb-2 text-xl font-semibold text-ink-primary">Guarde este diagnóstico</h3>
                    <p className="mb-6 text-ink-secondary">
                      {resultado.motivo} O diagnóstico acima continua valendo. Mandamos sem custo o material que ajuda a
                      preparar a operação para quando isso fizer sentido.
                    </p>
                    <a href={WHATSAPP_MATERIAL} target="_blank" rel="noopener noreferrer" className={BOTAO}>
                      Receber o material
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </>
                )}
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-ink-primary">Os outros pacotes</h3>
                <ul className="space-y-2">
                  {LISTA_DEGRAUS.filter((d) => d.numero !== resultado.degrau).map((d) => (
                    <li key={d.numero} className="text-sm text-ink-secondary">
                      <span className="font-semibold text-ink-primary">{d.nome}.</span> {d.resumo}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/precos"
                  className="mt-4 inline-block font-semibold text-purple-300 underline underline-offset-4 transition-colors hover:text-ink-primary"
                >
                  Ver o que entra e o que não entra em cada pacote
                </Link>
              </div>

              <button
                type="button"
                onClick={refazer}
                className="text-ink-secondary underline underline-offset-4 transition-colors hover:text-ink-primary"
              >
                Refazer o Raio-X
              </button>
            </section>
          ) : (
            <form onSubmit={enviar} noValidate className="space-y-8">
              <fieldset>
                <legend className="mb-1 text-lg font-semibold text-ink-primary">
                  1. Onde a sua operação trava hoje?
                </legend>
                <p className="mb-4 text-sm text-ink-muted">Marque o que acontece. Pode ser mais de um.</p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {GARGALOS.map((g) => {
                    const marcado = gargalos.includes(g);
                    return (
                      <label
                        key={g}
                        className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                          marcado
                            ? 'border-cyan-400 bg-cyan-400/10'
                            : 'border-ink-primary/10 bg-ink-primary/[0.04] hover:border-ink-primary/20'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="gargalo"
                          value={g}
                          checked={marcado}
                          onChange={() => alterna(g)}
                          className="sr-only"
                        />
                        <span
                          className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded border ${
                            marcado ? 'border-cyan-400 bg-cyan-400 text-sapient-deep' : 'border-ink-primary/30'
                          }`}
                          aria-hidden="true"
                        >
                          {marcado && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                        </span>
                        <span className="text-ink-secondary">{ROTULOS[g]}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Pergunta
                  id="integracoes"
                  rotulo="2. Quantos sistemas precisam conversar entre si?"
                  ajuda="CRM, agenda, formulário, pagamento, planilha, ERP."
                  valor={s.integracoes}
                  onChange={muda('integracoes')}
                  opcoes={[['1', '1 sistema'], ['2', '2 sistemas'], ['3', '3 sistemas'], ['5', '4 ou mais']]}
                />
                <Pergunta
                  id="canais"
                  rotulo="3. Por quantos canais o cliente fala com você?"
                  valor={s.canais}
                  onChange={muda('canais')}
                  opcoes={[['1', 'Só WhatsApp'], ['2', 'WhatsApp e mais um'], ['3', 'Três ou mais']]}
                />
                <Pergunta
                  id="setores"
                  rotulo="4. Quantos setores atendem esse cliente?"
                  valor={s.setores}
                  onChange={muda('setores')}
                  opcoes={[['1', 'Um só'], ['2', 'Dois ou mais, com triagem entre eles']]}
                />
                <Pergunta
                  id="baseConhecimento"
                  rotulo="5. O atendimento consulta conteúdo que muda com frequência?"
                  ajuda="Tabela de preço, catálogo, procedimento."
                  valor={s.baseConhecimento}
                  onChange={muda('baseConhecimento')}
                  opcoes={[['nao', 'Não, as respostas são estáveis'], ['sim', 'Sim, muda com frequência']]}
                />
                <Pergunta
                  id="canalDigitalAtivo"
                  rotulo="6. Existe canal digital de atendimento ativo hoje?"
                  valor={s.canalDigitalAtivo}
                  onChange={muda('canalDigitalAtivo')}
                  opcoes={[['sim', 'Sim, já atendemos por WhatsApp ou similar'], ['nao', 'Não, ainda não temos']]}
                />
                <Pergunta
                  id="decisor"
                  rotulo="Você participa da decisão de contratação?"
                  valor={s.decisor}
                  onChange={muda('decisor')}
                  opcoes={[['sim', 'Sim'], ['nao', 'Não, quem decide é outra pessoa']]}
                />
              </div>

              {erro && (
                <p role="alert" className="font-medium text-brand-rose">
                  Responda todas as perguntas para ver o diagnóstico.
                </p>
              )}

              <div className="flex flex-col items-center gap-3">
                <button type="submit" className={BOTAO}>
                  Ver o diagnóstico
                  <ArrowRight className="h-5 w-5" />
                </button>
                <p className="text-sm text-ink-muted">O resultado aparece na tela, sem cadastro.</p>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Pergunta = ({
  id,
  rotulo,
  ajuda,
  valor,
  onChange,
  opcoes,
}: {
  id: string;
  rotulo: string;
  ajuda?: string;
  valor: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  opcoes: [string, string][];
}) => (
  <div>
    <label htmlFor={id} className="font-semibold text-ink-primary">
      {rotulo}
    </label>
    <div className="relative">
      <select id={id} name={id} value={valor} onChange={onChange} className={`${CAMPO} pr-10`}>
        <option value="">Selecione</option>
        {opcoes.map(([v, texto]) => (
          <option key={v} value={v}>
            {texto}
          </option>
        ))}
      </select>
      {/* A seta some com `appearance-none`; sem ela o campo parece de texto. */}
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 mt-1 h-5 w-5 -translate-y-1/2 text-ink-muted"
        aria-hidden="true"
      />
    </div>
    {ajuda && <p className="mt-1.5 text-sm text-ink-muted">{ajuda}</p>}
  </div>
);

export default RaioX;
