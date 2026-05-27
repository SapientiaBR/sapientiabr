Migrate the site's typography from Poppins to Syne (headings) + Plus Jakarta Sans (body).

## What will change

1. **Google Fonts import** (`index.html` + `src/index.css`)
   - Replace Poppins with `Syne:wght@400;500;600;700;800` + `Plus+Jakarta+Sans:wght@300;400;500;600;700`

2. **Tailwind config** (`tailwind.config.ts`)
   - Add `fontFamily` tokens:
     - `heading: ['Syne', 'sans-serif']`
     - `body: ['Plus Jakarta Sans', 'sans-serif']`

3. **Global styles** (`src/index.css`)
   - Set `body` font-family to `Plus Jakarta Sans`
   - Set all `h1–h6` font-family to `Syne`

4. **Audit components**
   - Scan all `.tsx` files for inline `font-family` or `font-poppins` references and update them to use the new Tailwind tokens.

## What will NOT change

- Font weights (400–800 preserved)
- Any other visual tokens (colors, spacing, radius)
- Webhook logic or form behavior

## Expected result

All headings (hero titles, section headers, card titles) will render in Syne — bold, original, and autoral. All body text, paragraphs, and UI labels will render in Plus Jakarta Sans — clean and highly legible.