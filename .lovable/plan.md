## Plano

### 1. Adicionar link "Secretaria Invisível" no rodapé

Em `src/components/Footer.tsx`, adicionar uma nova seção acima do copyright (ou dentro do bloco da esquerda) com um destaque chamando atenção para a página irmã focada em clínicas e consultórios:

```tsx
<div className="mt-8 p-4 rounded-lg border border-white/10 bg-white/5">
  <p className="text-gray-300 text-sm">
    Atende clínicas ou consultórios? Conheça também a{' '}
    <a
      href="https://secretariainvisivel.com.br/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sapient-purple hover:text-white font-semibold underline underline-offset-4"
    >
      Secretaria Invisível
    </a>
    {' '}— nossa solução dedicada para a área da saúde.
  </p>
</div>
```

### 2. Criar página `/newsletter`

**Novo arquivo** `src/pages/Newsletter.tsx`:
- Layout reutilizando `Navbar` e `Footer` para consistência visual.
- Hero centralizado com título ("Inscreva-se na nossa Newsletter"), subtítulo explicando o valor (novidades sobre automação e IA).
- Formulário com:
  - Campo `email` (input controlado, validado via `zod` + `react-hook-form` já presente no projeto, ou validação simples nativa).
  - Botão "Inscrever-se" usando `bg-gradient-sapient`.
  - Feedback de sucesso via `sonner` (toast) após submit.
- Como ainda não há backend (Lovable Cloud não habilitado), o submit apenas valida o email e exibe toast de confirmação. Posso habilitar Cloud + tabela `newsletter_subscribers` se você quiser persistir — me avise.

**Atualizar** `src/App.tsx`:
- Importar `Newsletter` e adicionar `<Route path="/newsletter" element={<Newsletter />} />` acima da catch-all.

**Atualizar** `src/components/Footer.tsx`:
- Adicionar link "Newsletter" → `/newsletter` nos links inferiores (substituindo um dos placeholders "#" ou ao lado deles), usando `react-router-dom` `Link`.

### Detalhes técnicos
- Sem mudanças em design tokens; usa cores semânticas já existentes (`sapient-dark`, `sapient-purple`, `bg-gradient-sapient`).
- Sem novas dependências.
- SEO da nova página: `<title>` e `<meta description>` definidos via tags no topo do componente.

### Pergunta de escopo
Os emails da newsletter devem ser **apenas validados localmente (toast de sucesso)** ou você quer que eu **habilite o Lovable Cloud** e salve os inscritos numa tabela do banco? Posso seguir com a versão local agora e adicionar persistência depois.
