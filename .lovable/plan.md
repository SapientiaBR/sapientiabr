

## Remover o componente 3D Spline do HeroSection

O componente `SplineScene` carrega uma cena 3D pesada que causa lentidão. Vou removê-lo junto com o `Spotlight`.

### Alterações

**`src/components/HeroSection.tsx`**:
- Remover imports de `SplineScene` e `Spotlight`
- Remover o bloco "Right Side - 3D Scene" (div com SplineScene e Spotlight)
- Ajustar o layout para que o conteúdo textual ocupe toda a largura (remover `flex-row` split e centralizar o conteúdo)

O resultado será um hero mais limpo e significativamente mais rápido.

