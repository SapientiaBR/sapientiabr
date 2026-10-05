// Roda com `npm test` (node --test). O Node 24 remove os tipos sozinho,
// então não há dependência nova nem etapa de build para testar.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  diagnosticarOperacao,
  investimentoExibido,
  GARGALOS,
  DEGRAUS,
  LISTA_DEGRAUS,
} from '../src/lib/raio-x.ts';

const base = {
  gargalos: [] as string[],
  integracoes: 1,
  canais: 1,
  setores: 1,
  baseConhecimento: false,
  canalDigitalAtivo: true,
  decisor: true,
};

test('existem seis gargalos nomeados', () => {
  assert.equal(GARGALOS.length, 6);
  assert.ok(GARGALOS.includes('leads-sem-resposta'));
  assert.ok(GARGALOS.includes('presenca-digital-solta'));
});

test('os quatro degraus carregam os preços da tabela de 04-escada-de-produto.md', () => {
  assert.deepEqual(
    LISTA_DEGRAUS.map((d) => [d.nome, d.setup, d.recorrencia]),
    [
      ['Fluxo Único', 2400, 590],
      ['Agente Comercial', 3900, 690],
      ['Operação Assistida', 7200, 1190],
      ['Operação Conectada', 12800, 2200],
    ],
  );
});

test('todo degrau declara o que não está incluído', () => {
  for (const d of LISTA_DEGRAUS) assert.ok(d.naoInclui.length >= 4, d.nome);
});

test('razão recorrência sobre setup fica dentro da faixa praticada de 0,15 a 0,29', () => {
  for (const d of LISTA_DEGRAUS) {
    const r = d.recorrencia / d.setup;
    assert.ok(r >= 0.15 && r <= 0.29, `${d.nome}: ${r.toFixed(3)}`);
  }
});

test('um gargalo com poucas integrações vai para Fluxo Único', () => {
  const r = diagnosticarOperacao({ ...base, gargalos: ['sistemas-desconectados'], integracoes: 2 });
  assert.equal(r.degrau, 1);
  assert.equal(r.nomeDegrau, 'Fluxo Único');
});

test('gargalo comercial vai para Agente Comercial', () => {
  assert.equal(diagnosticarOperacao({ ...base, gargalos: ['leads-sem-resposta'], integracoes: 3 }).degrau, 2);
});

test('follow-up manual também é gargalo comercial', () => {
  assert.equal(diagnosticarOperacao({ ...base, gargalos: ['follow-up-manual'], integracoes: 3 }).degrau, 2);
});

test('dois gargalos incluindo backoffice vão para Operação Assistida', () => {
  const r = diagnosticarOperacao({ ...base, gargalos: ['leads-sem-resposta', 'equipe-sobrecarregada'], integracoes: 4 });
  assert.equal(r.degrau, 3);
});

test('mais de um canal vai para Operação Conectada', () => {
  assert.equal(diagnosticarOperacao({ ...base, gargalos: ['leads-sem-resposta'], canais: 3 }).degrau, 4);
});

test('mais de um setor vai para Operação Conectada', () => {
  assert.equal(diagnosticarOperacao({ ...base, gargalos: ['atendimento-sem-contexto'], setores: 2 }).degrau, 4);
});

test('base de conhecimento necessária vai para Operação Conectada', () => {
  assert.equal(diagnosticarOperacao({ ...base, gargalos: ['atendimento-sem-contexto'], baseConhecimento: true }).degrau, 4);
});

test('sem canal digital ativo desqualifica', () => {
  const r = diagnosticarOperacao({ ...base, gargalos: ['leads-sem-resposta'], canalDigitalAtivo: false });
  assert.equal(r.qualificado, false);
  assert.match(r.motivo, /canal digital/i);
});

test('quem responde sem participar da decisão desqualifica, mas ainda recebe degrau', () => {
  const r = diagnosticarOperacao({ ...base, gargalos: ['leads-sem-resposta'], decisor: false });
  assert.equal(r.qualificado, false);
  assert.ok(r.degrau >= 1 && r.degrau <= 4);
});

test('nenhum gargalo selecionado cai no degrau de entrada', () => {
  assert.equal(diagnosticarOperacao({ ...base }).degrau, 1);
});

test('mais de 3 integrações tira do Fluxo Único', () => {
  assert.equal(diagnosticarOperacao({ ...base, gargalos: ['sistemas-desconectados'], integracoes: 5 }).degrau, 2);
});

test('gargalo desconhecido é ignorado sem quebrar', () => {
  const r = diagnosticarOperacao({ ...base, gargalos: ['inexistente', 'leads-sem-resposta'] });
  assert.equal(r.gargalosSelecionados.length, 1);
  assert.equal(r.degrau, 2);
});

test('degraus 1 e 2 mostram o valor exato', () => {
  assert.deepEqual(investimentoExibido(1), { setup: 'R$ 2.400', recorrencia: 'R$ 590', exato: true });
  assert.deepEqual(investimentoExibido(2), { setup: 'R$ 3.900', recorrencia: 'R$ 690', exato: true });
});

test('degraus 3 e 4 mostram a mesma faixa, verdadeira para os dois', () => {
  const faixa = { setup: 'entre R$ 7.200 e R$ 12.800', recorrencia: 'entre R$ 1.190 e R$ 2.200', exato: false };
  assert.deepEqual(investimentoExibido(3), faixa);
  assert.deepEqual(investimentoExibido(4), faixa);
});

test('a faixa contém o preço real de quem cai nos degraus 3 e 4', () => {
  for (const n of [3, 4] as const) {
    assert.ok(DEGRAUS[n].setup >= DEGRAUS[3].setup && DEGRAUS[n].setup <= DEGRAUS[4].setup);
  }
});
