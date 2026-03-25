

## Plan: Swap "Gestão de Redes Sociais" for "Criação de Sites/Landing Pages"

### Change in `src/components/ServicesSection.tsx`

Replace the last service item (lines ~48-55) — "Gestão de Redes Sociais" with:

```tsx
{
  icon: <Layers className="w-8 h-8 text-sapient-blue" />,
  title: 'Criação de Sites/Landing Pages',
  description: 'Desenvolvimento de sites profissionais e landing pages otimizadas para conversão, com design moderno e responsivo.',
  color: 'from-sapient-blue/20 to-sapient-purple/20'
}
```

Reuses the existing `Layers` icon (already imported). Single line-level edit, no other files affected.

