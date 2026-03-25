

## Problem

The `GlowCard` component has an internal `<div data-glow>` element (line 177) that participates in the layout flow. Even with the `!flex !flex-col` overrides, this empty div takes up space and pushes the actual card content (title, description) outside the card boundaries.

## Solution

Modify `GlowCard` in `src/components/ui/spotlight-card.tsx` to make the inner glow div not affect layout:

1. **Make inner glow div absolute** — Add `position: absolute` and `inset: 0` directly on the inner `<div data-glow>` element (it already has these styles from CSS but they only apply to `[data-glow] [data-glow]` selector — we should ensure they're applied via className too for reliability).

2. **Add `overflow-hidden`** to the outer card container so content never visually escapes the card boundaries.

3. **Wrap children in a relative z-index container** so they render above the glow effect layer.

### Files Changed
- `src/components/ui/spotlight-card.tsx` — Fix the inner div layout and add overflow control

This fixes all three sections (PainPoints, Services, Benefits) since they all use the same component.

