import { Link } from 'react-router-dom';
import { ArrowRight, Check, Minus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RevealOnScroll, RevealText } from '@/motion';
import { usePageMeta } from '@/lib/meta';
import { LISTA_DEGRAUS, brl } from '@/lib/raio-x';

/** O pacote destacado. Agente Comercial é o de maior lastro praticado. */
const DESTAQUE = 2;

/*
 * SLA por pacote, de `contexto/04-escada-de-produto.md` seção 7. Fica aqui e
 * não em `raio-x.ts` porque só esta página usa.
 */
const SLA: [string, string, string, string, string][] = [
  ['Fluxo Único', 'até 1h/mês', 'mensal', '1 dia útil', '2 dias úteis'],
  ['Agente Comercial', 'até 2h/mês', 'quinzenal', '8h úteis', '1 dia útil'],
  ['Operação Assistida', 'até 3h/mês', 'quinzenal', '4h úteis', '1 dia útil'],
  ['Operação Conectada', 'até 5h/mês', 'quinzenal', '4h úteis', '1 dia útil'],
];

const Precos = () => {
  usePageMeta(
    'Pacotes e preços | Sapient.IA',
    'Quatro pacotes de automação com escopo fechado, prazo declarado e preço de tabela. O que entra e o que não entra em cada um.',
  );

  return (
    <div className="bg-sapient-deep min-h-screen">
      <Navbar />

      <main className="px-4 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container mx-auto max-w-5xl">
          <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <p className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.18em] text-purple-300 md:text-sm">
              Escopo fechado, prazo declarado
            </p>
            <RevealText as="h1" className="mb-4 text-3xl font-bold text-ink-primary md:text-5xl">
              Quatro pacotes. Preço de <em className="accent">tabela</em>.
            </RevealText>
            <RevealOnScroll delay={0.15}>
              <p className="text-ink-secondary md:text-lg">
                O preço desta tabela é o preço praticado. O que ancora aqui é o escopo: o que entra, o que não entra, e o
                pacote de cima ao lado.
              </p>
              <Link
                to="/raio-x"
                className="mt-4 inline-block font-semibold text-purple-300 underline underline-offset-4 transition-colors hover:text-ink-primary"
              >
                Não sabe qual é o seu? O Raio-X responde em 6 perguntas.
              </Link>
            </RevealOnScroll>
          </header>

          {/* Diagnóstico, o degrau zero. */}
          <RevealOnScroll className="mb-6 rounded-xl border border-ink-primary/10 bg-ink-primary/[0.04] p-6 md:p-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <h2 className="text-xl font-bold text-ink-primary md:text-2xl">Diagnóstico de Operação</h2>
              <p className="text-xl font-semibold text-cyan-300">R$ 0 · 45 minutos</p>
            </div>
            <p className="mt-3 text-ink-secondary">
              Mapa do fluxo atual, um gargalo priorizado e o pacote recomendado com a faixa de investimento. Você sai
              com um pacote nomeado, ou o diagnóstico não terminou.
            </p>
          </RevealOnScroll>

          <div className="space-y-6">
            {LISTA_DEGRAUS.map((d) => (
              <RevealOnScroll
                key={d.numero}
                as="article"
                className={`rounded-xl p-6 md:p-8 ${
                  d.numero === DESTAQUE
                    ? 'border-t-[3px] border-cyan-400 bg-ink-primary/[0.06]'
                    : 'border border-ink-primary/10 bg-ink-primary/[0.04]'
                }`}
              >
                {d.numero === DESTAQUE && (
                  <span className="mb-3 inline-block rounded-full bg-cyan-400 px-3 py-1 font-label text-xs font-bold uppercase tracking-[0.12em] text-sapient-deep">
                    Mais contratado
                  </span>
                )}
                <h2 className="text-2xl font-bold text-ink-primary md:text-3xl">{d.nome}</h2>
                <p className="mt-2 text-xl font-semibold text-cyan-300 md:text-2xl">
                  {brl(d.setup)} de implantação + {brl(d.recorrencia)} por mês
                </p>
                <p className="mt-2 text-sm text-ink-muted">
                  Prazo: {d.prazo}. {d.paraQuem}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-label text-xs font-semibold uppercase tracking-[0.14em] text-ink-primary">
                      Está incluído
                    </h3>
                    <ul className="space-y-2">
                      {d.inclui.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm text-ink-secondary md:text-base">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-cyan-400" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-3 font-label text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      Não está incluído
                    </h3>
                    <ul className="space-y-2">
                      {d.naoInclui.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm text-ink-muted md:text-base">
                          <Minus className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll as="section" className="mt-16">
            <h2 className="mb-4 text-2xl font-bold text-ink-primary md:text-3xl">
              O que a <em className="accent">recorrência</em> cobre
            </h2>
            <ul className="mb-8 space-y-2 text-ink-secondary">
              <li>Monitoramento, correção e ajuste preventivo</li>
              <li>Ajuste de fluxo, de mensagem, de roteamento e de copy</li>
              <li>Reunião de alinhamento e priorização</li>
              <li>Todos os softwares e integrações da solução, sem custo adicional de licença</li>
            </ul>

            <h3 className="mb-3 text-lg font-semibold text-ink-primary">SLA por pacote</h3>
            {/* No celular a tabela rola dentro do próprio contêiner, e a
                página inteira não ganha rolagem lateral. */}
            <div className="overflow-x-auto rounded-xl border border-ink-primary/10">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-primary/10 text-cyan-300">
                    {['Pacote', 'Melhorias leves', 'Reunião', 'Incidente crítico', 'Incidente médio'].map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SLA.map((linha) => (
                    <tr key={linha[0]} className="border-b border-ink-primary/5 last:border-0">
                      {linha.map((celula, i) => (
                        <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-semibold text-ink-primary' : 'text-ink-secondary'}`}>
                          {celula}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-ink-muted">
              Suporte em dias úteis, das 9h às 18h, em todos os pacotes. Funcionalidade nova ou integração estrutural é
              orçada à parte.
            </p>

            <h3 className="mb-3 mt-10 text-lg font-semibold text-ink-primary">Condições comerciais</h3>
            <ul className="space-y-2 text-ink-secondary">
              <li>Implantação em 2x: 50% na assinatura e 50% na entrega</li>
              <li>Pix, cartão ou boleto</li>
              <li>Validade da proposta: 7 dias</li>
              <li>OpenAI e WhatsApp API faturados direto para você, sem taxa administrativa nossa</li>
            </ul>
          </RevealOnScroll>

          <RevealOnScroll className="mt-16 rounded-lg bg-gradient-sapient p-8 text-center text-ink-on-brand">
            <h2 className="mb-3 text-2xl font-bold">Qual desses é o seu?</h2>
            <p className="mx-auto mb-6 max-w-lg">
              O Raio-X responde em 6 perguntas, sem cadastro, e mostra o pacote recomendado na tela.
            </p>
            <Link
              to="/raio-x"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-white px-8 text-lg font-bold text-purple-600 transition-colors hover:bg-gray-100"
            >
              Fazer o Raio-X
              <ArrowRight className="h-5 w-5" />
            </Link>
          </RevealOnScroll>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Precos;
