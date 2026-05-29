# Plano: atualização de copy e estrutura da landing page

Aplicar mudanças cirúrgicas mantendo dark theme, tipografia (Syne + Plus Jakarta Sans) e paleta atuais.

## 1. Esconder badge "Edit with Lovable"
- Chamar `set_badge_visibility(hide_badge: true)`.
- Requer plano Pro+; se falhar, avisar usuário.

## 2. HeroSection.tsx — novos textos
- Headline: "Automatize o Atendimento, as Vendas e a Gestão da Sua Empresa. Tudo com IA, Sem Contratar Ninguém." — destacar "Automatize" com `text-gradient-sapient`.
- Subheadline: "A Sapient.IA implementa tudo para você em 3 a 4 semanas. Do atendimento no WhatsApp às redes sociais, do CRM inteligente ao site profissional."
- Botão primário: "Quero Automatizar Minha Empresa" (mantém link `https://bit.ly/40BtBp2`).
- Botão secundário → transformar em link de texto simples "Ver como funciona" (sem borda/bg), ainda fazendo scroll para `#services`.
- Adicionar linha de social proof abaixo dos botões, separada por `|`:
  "Empresas em 6 setores atendidos | 65% de redução nos custos | Implementação em 3 a 4 semanas"
- Não alterar logo, shapes, seção "Sobre Nós" nem indicador de scroll.

## 3. Seção de clientes (dentro do HeroSection)
- Substituir título "Confiado por empresas de todos os tamanhos" por:
  - H2: "Nossa experiência comprova o resultado."
  - Subtítulo: "Empresas de setores diferentes. Um resultado em comum: mais tempo, menos custo."
- Manter os 3 logos.
- Abaixo dos logos, adicionar grade responsiva (3 cols mobile / 6 cols desktop) com chips/cards dos setores:
  Saúde, Construção Civil, Varejo, Imobiliárias, Serviços B2B, Educação.

## 4. Nova seção FAQ
- Criar `src/components/FAQSection.tsx`.
- Título: "Suas dúvidas, respondidas de forma direta."
- 8 perguntas (lista das 8 fornecidas), todas com resposta visível por padrão (sem accordion). Layout simples em cards/blocos com `border-white/10` e `bg-white/5`, grid 1 col mobile / 2 cols desktop.
- Inserir no `Index.tsx` após `ContactSection`… ver ordem final abaixo.

## 5. Nova seção Garantia
- Criar `src/components/GuaranteeSection.tsx`.
- Bloco centralizado com ícone `ShieldCheck` (lucide) em círculo gradiente.
- Título "Garantia Sapient.IA".
- Texto: "Sua solução funcionando ao final da implementação ou você não paga. Essa é a nossa garantia. Sem condições ocultas."

## 6. CTA final
- Criar `src/components/FinalCTASection.tsx`.
- Texto urgência (pequeno, em destaque sapient-purple): "Diagnóstico gratuito disponível para novos clientes este mês."
- Botão grande gradiente "Quero Meu Diagnóstico Gratuito" → `https://bit.ly/40BtBp2`.
- Texto abaixo (cinza, pequeno): "Sem compromisso. Sem configuração técnica da sua parte."

## 7. Index.tsx — nova ordem
```
Navbar
HeroSection (com clientes reformulados)
PainPointsSection
ServicesSection
BenefitsSection
NoctuaBotSection
ContactSection
FAQSection            ← novo
GuaranteeSection      ← novo
FinalCTASection       ← novo (substitui visualmente o papel do antigo "Inscrever-se")
Newsletter CTA (mantém, mais discreto)
Footer
```
A seção "Newsletter CTA" existente permanece (mudança não solicitada).

## Detalhes técnicos
- Usar tokens existentes: `bg-sapient-dark`, `text-gradient-sapient`, `bg-gradient-sapient`, `border-white/10`, `bg-white/5`.
- Tipografia: títulos herdam `Syne` automaticamente (h1–h6 globais); corpo herda Plus Jakarta Sans.
- Ícones: `lucide-react` (`ShieldCheck`, `ArrowRight`, `Check`).
- Nenhum endpoint/lib novo; nenhuma mudança em rotas, webhooks ou autenticação.
