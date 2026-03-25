

## Plan: Add GradientDots background component

### Step 1: Create `src/components/ui/gradient-dots.tsx`
Copy the provided component code, removing the `'use client'` directive (Vite project, not Next.js).

### Step 2: Update `src/components/HeroSection.tsx`
- Import `GradientDots`
- Add `overflow-hidden` to the root `div`
- Place `<GradientDots backgroundColor="#1A1F2C" className="z-0" />` as the first child
- Ensure existing content layers remain at `z-10`

Two files total — one new, one minor edit.

