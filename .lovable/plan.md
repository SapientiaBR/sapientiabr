## Objetivo
Deixar a página `/newsletter` mobile-first, com copy direta e tudo visível em uma tela de ~390×844 sem rolagem.

## Mudanças em `src/pages/Newsletter.tsx`

### Layout
- Reduzir paddings verticais: `py-5` → `py-3` no header, `pb-16` → `pb-6` no main, footer `py-6` → `py-3`.
- Container central com `gap-4` compacto em vez de `mt-8/mt-10`.
- Logo menor no mobile: `w-64 md:w-80` → `w-44 md:w-72`, com `mb-2`.
- Form vertical já é bom; reduzir altura do input/botão de `h-12` para `h-11`.

### Copy mais direta
- Subtítulo: trocar "A newsletter rápida e direta sobre automação inteligente e IA aplicada ao seu negócio." por **"IA e automação que geram resultado. Direto no seu e-mail."**
- Benefícios: reduzir de 3 para 2 itens curtos:
  - "Cases reais de automação"
  - "Ferramentas testadas pelo nosso time"
  - (remover "Conteúdo direto ao ponto…")
- Esconder a lista de benefícios no mobile (`hidden sm:flex`) para eliminar rolagem; mantém no desktop.
- Disclaimer: "Sem spam. Você pode cancelar a qualquer momento." → **"Sem spam. Cancele quando quiser."**
- Botão: "Inscrever-se" → **"Quero receber"**.
- Header: "Voltar para Sapient.IA" → **"Voltar"** no mobile (`sm:inline` no resto).

### Tela de sucesso
- Mesma estética compacta: ícone `w-14 h-14`, título menor, descrição mais curta:
  - "Pronto! Você está inscrito no Expresso IA."
- Botões empilhados, `h-11`, sem ícones grandes.

## Fora de escopo
- Sem mudanças no webhook, na lógica de submit, no logo, nas cores ou no CTA da home.
