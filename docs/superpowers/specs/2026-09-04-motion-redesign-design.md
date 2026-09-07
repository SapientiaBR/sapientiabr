# Redesign visual e de movimento — sapientiabr.cloud

Data: 2026-09-04
Branch: `feat/motion-redesign`

## Objetivo

Elevar o acabamento visual do site institucional da Sapient.IA ao nível de um site
premium com movimento dirigido por scroll e hero em WebGL, **sem alterar o conteúdo
editorial nem a ordem das seções**. A motivação declarada é estética.

Referência de qualidade: saffron-griflan.netlify.app (técnica de movimento apenas —
nenhum código, asset ou layout daquele site é reaproveitado).

## Fonte da verdade da identidade

Brand Guide v2 (`Downloads/Branding Guide - Sapient.IA/sapient-ia-brand-guide-v2.html`),
que substitui a paleta e a tipografia hoje no repositório.

| Token | Valor |
| --- | --- |
| Fundo | `#080d1a` → `#111827` (navy profundo, nunca preto puro) |
| Gradiente brand | `#7c3aed` → `#06b6d4` |
| Gradiente texto | `#a78bfa` → `#4debff` |
| Hero | HUMANE |
| Display | Switzer |
| Body | Switzer |
| Rótulo | Switzer |

Regras do guide que viram restrição de implementação:

- 1 heading = 1 palavra em itálico com gradient text
- Cards com `border-top: 3px` em accents variados (coral, lime, indigo, sky)
- Gradiente nunca como fundo de seção inteira — só CTA, texto de destaque, logo e bordas
- Glassmorphism sutil em cards premium: blur 20–24 px, borda branca 8%

## Stack

Mantém: React 18, Vite, TypeScript, Tailwind, shadcn/ui, react-router.

Entra: `gsap` + ScrollTrigger, `lenis`, `three`.
Sai: `framer-motion` — seus únicos consumidores (`ui/shape-landing-hero`,
`ui/spotlight`) são substituídos pelo hero novo.

## Arquitetura

### `src/design/tokens.css`

Escala completa do guide como custom properties. `tailwind.config.ts` passa a derivar
dessas variáveis. Os nomes antigos (`sapient-purple`, `sapient-blue`, `sapient-dark`)
permanecem como alias apontando para os valores novos, permitindo migração incremental
sem quebrar os 11 componentes de uma vez.

### `src/motion/`

| Módulo | Responsabilidade | Depende de |
| --- | --- | --- |
| `LenisProvider` | scroll suave global sincronizado ao ScrollTrigger | lenis, gsap |
| `PageMask` | dissolve de entrada com `feTurbulence` + `feColorMatrix` | gsap |
| `RevealText` | reveal de heading caractere a caractere | gsap |
| `RevealOnScroll` | entrada escalonada genérica | gsap |
| `MagneticButton` | CTA que atrai o cursor | gsap |
| `SectionRail` | rail lateral com seção ativa | gsap ScrollTrigger |
| `useReducedMotion` | detecção única de preferência do usuário | — |

Cada componente encapsula seu GSAP em `gsap.context()` e faz `revert()` no unmount.

### `src/three/`

| Módulo | Responsabilidade |
| --- | --- |
| `OwlParticles.tsx` | fronteira React: ciclo de vida, resize, lazy, fallback |
| `owlScene.ts` | cena Three.js imperativa, sem React dentro |
| `sampleLogo.ts` | PNG → buffer de posições por limiar de alfa |
| `shaders/owl.vert.glsl` | deriva idle, repulsão do mouse, dissolução por scroll |
| `shaders/owl.frag.glsl` | gradiente purple→cyan, alfa circular |

Fonte das partículas: `src/assets/sapient-logo.png` (1080×1350, RGBA). ~35 mil
partículas amostradas acima do limiar de alfa.

## Degradação

Três níveis, avaliados na montagem:

1. Sem contexto WebGL → renderiza o PNG estático
2. `prefers-reduced-motion: reduce` → PNG estático, Lenis desligado, reveals viram
   estado final imediato
3. Viewport móvel ou `hardwareConcurrency <= 4` → contagem de partículas reduzida

`IntersectionObserver` pausa o loop de render quando o hero sai do viewport.
Three.js entra em chunk separado via `React.lazy`, fora do caminho do first paint.

## Melhoria pontual de performance

`src/assets/otus-logo.png` tem 3,1 MB sem canal alfa — sozinho maior que o resto do
site somado. Convertido para WebP redimensionado como parte deste trabalho.

## Verificação

- Playwright por rota: zero erro de console, zero 404, `#root` populado, screenshot por seção
- Build de produção com bundle medido antes e depois
- Execução com `prefers-reduced-motion` ativo
- Execução com WebGL desabilitado
- Contraste dos tokens novos

## Fora de escopo

- Alterações de conteúdo, copy ou ordem de seções
- Sequência de frames dirigida por scroll (exige produção de 200+ renders)
- Transições animadas entre rotas
- Deploy em produção — entrega é local, em branch


## Adendo — 2026-09-07: tipografia

O Brand Guide v2 especificava Sora + DM Sans + JetBrains Mono, todas via Google
Fonts. Três famílias foram avaliadas a pedido do cliente e a pilha mudou.

### Decisão

| Papel | Fonte | Motivo |
| --- | --- | --- |
| Hero | HUMANE SemiBold | Display ultracondensada (0,17 em de largura média). Dá ao hero uma identidade que uma sans neutra não dá. Freeware com uso comercial liberado. |
| Headings e corpo | Geist Sans | 728 glifos, variável 100–900, desenhada para interface. SIL OFL 1.1. |
| Rótulos e números | Geist Mono | Mesma família do Sans — resolve a incoerência de misturar DM Sans com JetBrains Mono. |

**Arena foi descartada.** 98 glifos: nenhum dígito e nenhum caractere acentuado.
Num site em português com "70%", "24/7" e "3 a 4 semanas", cada linha cairia
para a fonte de fallback no meio da frase. A licença também é `Freeware,
Non-Commercial`, incompatível com um site institucional.

### Consequências

- As fontes passam a ser auto-hospedadas (`src/design/fonts.css`). O site não
  faz mais nenhuma requisição a `fonts.googleapis.com` ou `fonts.gstatic.com` —
  havia um `<link>` remanescente no `index.html` carregando Syne e Plus Jakarta
  Sans, resquício do build anterior.
- HUMANE não tem itálico. No hero a assinatura da marca fica só no gradiente; o
  itálico sintético por cisalhamento entorta as hastes numa condensada extrema.
- `RevealText` envolvia cada palavra num `overflow: hidden`. Com a entrelinha
  apertada do hero isso cortava o til e o agudo das maiúsculas. O wrapper ganhou
  respiro no topo e o recorte é removido quando a animação termina.
- **O Brand Guide v2 precisa ser atualizado** para refletir a nova pilha, senão
  volta a divergir do site — que foi o problema que motivou este trabalho.


## Adendo — 2026-09-07 (2): Switzer substitui Geist

A pedido do cliente, Switzer passa a ser a fonte do site. Geist sai por completo,
incluindo a dependência npm.

| Papel | Antes | Agora |
| --- | --- | --- |
| Hero | HUMANE | HUMANE (mantida) |
| Headings, corpo, UI | Geist Sans | Switzer |
| Rótulos em caixa alta | Geist Mono | Switzer (`font-label`) |
| `<code>`/`<pre>` | Geist Mono | pilha monoespaçada do sistema |

Os seis usos de `font-mono` eram todos eyebrow e legenda em caixa alta com
tracking largo — nenhum era código ou dado tabular. O papel virou `font-label`,
que é estilo, não família monoespaçada. Uma mono de verdade continua declarada
para `<code>`, mas usando a pilha do sistema: nada a baixar.

Ganhos colaterais: as duas variáveis da Switzer somam 74,8 KB contra 141 KB das
duas da Geist, e a itálica é desenhada. Antes só a variável reta da Geist estava
carregada, então o itálico da assinatura da marca era sintetizado pelo navegador.

### Bug corrigido junto: gatilhos de scroll com medida velha

Seções inteiras ficavam paradas em opacidade 0 depois de entrarem no viewport.

Causa: `ScrollTrigger` guarda início e fim em pixels, medidos na criação de cada
gatilho, e duas coisas invalidavam essa medida depois — a troca da HUMANE
(`font-display: block`, condensada extrema, muda a altura do hero em centenas de
pixels) e o pin da seção de benefícios, que insere ~990 px de espaçador. Pior,
cada `RevealOnScroll` chamava `ScrollTrigger.refresh()` no próprio
`useLayoutEffect`: com quinze instâncias, o refresh media o DOM no meio da
montagem dos irmãos.

Correção: um único `refreshScrollTriggersWhenSettled()` em `motion/gsap.ts`,
chamado uma vez pelo `SmoothScroll` — dois quadros depois da montagem e de novo
quando `document.fonts.ready` resolve.
