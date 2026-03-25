

## Plan: Move title inside the gradient banner in Pain Points cards

Looking at the uploaded screenshot, the user wants the title (e.g. "Processos Lentos") to be inside the gradient blue/purple banner alongside the icon, rather than below it.

### Change: `src/components/PainPointsSection.tsx`

Restructure the card content so the icon and title share the same gradient banner div:

- Merge the icon `div` and `h3` title into a single container with `bg-gradient-sapient` styling
- This container will have `flex items-center gap-3`, rounded corners, and padding
- The description stays below, outside the banner

**Before:**
```
[icon in small bg-white/10 box]
Title (below)
Description
```

**After:**
```
[icon + Title together inside bg-gradient-sapient banner]
Description
```

Specifically, lines 61-64 become a single flex row container with the gradient background, containing both the icon and the `h3` title.

