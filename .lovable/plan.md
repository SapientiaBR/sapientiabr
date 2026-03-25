

## Plan: Refine title banner styling in card sections

### Changes to `src/components/ServicesSection.tsx` and `src/components/PainPointsSection.tsx`

Update the title banner container in both files:

1. **More rounded corners**: Change `rounded-lg` to `rounded-xl` for softer appearance
2. **Better centering**: Add `text-center` or `justify-center` to the flex container
3. **Reduce icon size slightly** so title fits better: icons from `w-12 h-12` to `w-8 h-8` in ServicesSection (PainPoints already uses `w-8 h-8`)
4. **Adjust padding**: Use `px-4 py-3` for more balanced spacing

### ServicesSection banner div:
```tsx
<div className={`mb-4 bg-gradient-to-br ${service.color} flex items-center justify-center gap-3 px-4 py-3 rounded-xl`}>
```

### PainPointsSection banner div:
```tsx
<div className="mb-4 bg-gradient-sapient flex items-center justify-center gap-3 px-4 py-3 rounded-xl">
```

Two files, minimal changes each.

