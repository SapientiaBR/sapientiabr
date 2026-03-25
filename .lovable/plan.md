

## Plan: Replace GradientDots with Shape Landing Hero background

Remove the GradientDots component and replace the HeroSection background with the KokonutUI `HeroGeometric` floating geometric shapes effect. The shapes will serve as an animated background behind the existing hero content.

### Step 1: Create `src/components/ui/shape-landing-hero.tsx`

The new component with two exports:
- `ElegantShape` — a `motion.div` rendering a rounded rectangle with gradient fill that animates in from above with rotation and subtle floating motion
- `HeroGeometric` — the full hero layout with 5 positioned `ElegantShape` instances, badge, two-line title, and subtitle

Since the provided JSX was stripped during transport, I will reconstruct the full component from the known KokonutUI registry structure. Key details:
- Remove `'use client'` (Vite project)
- Remove unused imports (`useMotionValue`, `useTransform`, `animate`, `useEffect`, `useState`) — these were in the registry but the component only uses `motion` and `Circle`
- Uses `framer-motion@11.15.0` (already installed, compatible with React 18)

### Step 2: Update `src/components/HeroSection.tsx`

Two approaches possible:

**Option A — Use as background only**: Extract just the `ElegantShape` pieces and place them absolutely behind the existing hero content (logo, title, buttons, "Sobre Nos", client logos). This preserves the current layout.

**Option B — Replace entire hero**: Use `HeroGeometric` as a standalone section, customized with Sapient.IA branding, and move the "Sobre Nos" and client logos sections below it.

I recommend **Option A** — use the floating geometric shapes as a background effect while keeping the existing hero content intact. This avoids losing the current branding, CTA buttons, "Sobre Nos" section, and client logos.

Changes:
- Remove `GradientDots` import and usage
- Import and place several `ElegantShape` components with absolute positioning behind the hero content
- Adapt gradient colors to use sapient purple/blue (`from-sapient-purple/[0.08]`, `from-sapient-blue/[0.08]`)

### Step 3: Delete `src/components/ui/gradient-dots.tsx`

No longer used anywhere.

### Technical Details

The `ElegantShape` component structure:
```tsx
<motion.div
  initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
  animate={{ opacity: 1, y: 0, rotate, transition: { duration: 2.4, delay, ease: [0.23, 0.86, 0.39, 0.96] } }}
  className={className}
>
  <motion.div
    animate={{ y: [0, 15, 0] }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    style={{ width, height }}
    className="relative"
  >
    <div className={cn("absolute inset-0 rounded-full", `bg-gradient-to-r to-transparent ${gradient}`, "border border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]")} />
  </motion.div>
</motion.div>
```

Five shapes positioned across the hero with varying sizes, rotations, and delays — creating a subtle floating geometric background.

