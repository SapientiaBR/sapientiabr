

## Plan: Restore "pain" styling to Pain Points card titles

The gradient banner was accidentally applied from the Services section pattern. The Pain Points titles should feel negative/uncomfortable — no background, red-toned text and icons.

### Changes to `src/components/PainPointsSection.tsx`

**Replace the gradient banner div** (line 61-64) with a simpler layout:
- Remove the `bg-gradient-sapient` background container
- Style the icon with a soft red color (`text-red-400`) instead of white
- Style the title with soft red (`text-red-400`) 
- Keep the flex layout with icon + title but no background fill, no rounded container

```tsx
// Before
<div className="mb-4 bg-gradient-sapient flex items-center justify-center gap-3 px-4 py-3 rounded-xl">
  {point.icon}
  <h3 className="text-xl font-semibold text-white">{point.title}</h3>
</div>

// After
<div className="mb-4 flex items-center gap-3">
  {point.icon}
  <h3 className="text-xl font-semibold text-red-400">{point.title}</h3>
</div>
```

Also update icon color in the data array from `text-white` to `text-red-400` for all 6 pain point icons.

Also update the `GlowCard` glow color — it's already `"red"` which fits perfectly.

One file, minimal changes.

