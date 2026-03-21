# Brand Guidelines - AURA by AI_Nikitka93

## 1. Positioning
We help style-conscious founders, creatives, and premium tech buyers turn jewelry into an intelligent status ritual with connected luxury wearables, unlike Oura, generic smart wearables, and conventional jewelry houses, we fuse editorial elegance with discreet ambient intelligence.

## 2. Personality
- **We:** sensorial, precise, futuristic, seductive
- **We НЕ:** clinical, noisy

## 3. Tone of Voice
- **Formality:** neutral-to-formal; respectful `вы`, no slang, no emoji in core commerce surfaces
- **Energy:** controlled, magnetic, high-intent; never loud or pushy
- **Complexity:** expert, but legible; explain innovation through benefits before mechanics
- **Forbidden phrases:** `динамично развивающаяся компания`, `индивидуальный подход`, `высокое качество`, `команда профессионалов`
- **Patterns:** imperative verbs for CTA (`Откройте коллекцию`, `Выберите ритуал`, `Настройте сияние`), concrete numbers instead of vague adjectives, benefit-led phrasing with `вы`, short editorial sentences, product copy built around ritual + intelligence + materiality

## 4. Color System

### Core Palette
Seed accent: `#6F7CFF`

| Role | Variable | HEX | Example |
|------|----------|-----|--------|
| Primary | `--color-primary` | `#6F7CFF` | <div style="background:#6F7CFF;width:32px;height:32px;border-radius:8px;"></div> |
| Secondary | `--color-secondary` | `#111318` | <div style="background:#111318;width:32px;height:32px;border-radius:8px;"></div> |
| Neutral | `--color-neutral` | `#98A1B3` | <div style="background:#98A1B3;width:32px;height:32px;border-radius:8px;"></div> |
| Success | `--color-success` | `#37D6B5` | <div style="background:#37D6B5;width:32px;height:32px;border-radius:8px;"></div> |
| Error | `--color-error` | `#FF6B8F` | <div style="background:#FF6B8F;width:32px;height:32px;border-radius:8px;"></div> |

### Derived Dark-Mode Tokens
- `--color-bg: #090B10`
- `--color-surface: #111318`
- `--color-surface-elevated: #171A21`
- `--color-text: #F5F7FB`
- `--color-text-soft: #C5CCDA`
- `--color-border: rgba(255,255,255,0.12)`
- `--color-glass-fill: rgba(255,255,255,0.08)`
- `--color-glass-stroke: rgba(255,255,255,0.18)`
- `--color-glass-highlight: rgba(255,255,255,0.34)`
- `--color-glow-primary: rgba(111,124,255,0.38)`

### Accessibility Note
- `#F5F7FB` on `#090B10` and `#111318` exceeds WCAG AA for body text.
- Primary accent is reserved for CTA, focus, active states, and kinetic highlights, not for long-form copy.

## 5. Typography
- **Display:** `Syne`, 700, 48-96px, line-height 0.95-1.05, tight tracking for kinetic headlines
- **Heading:** `Manrope`, 600, 24-40px, line-height 1.15-1.2
- **Body:** `Manrope`, 400, 16px, line-height 1.6
- **Caption:** `Manrope`, 500, 14px, line-height 1.5
- **Code:** `JetBrains Mono`, 14px, line-height 1.7

### Google Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&family=Manrope:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
```

## 6. Spacing (8px Grid)
`--space-xs: 4px` | `--space-sm: 8px` | `--space-md: 16px` | `--space-lg: 24px` | `--space-xl: 32px` | `--space-2xl: 48px` | `--space-3xl: 64px` | `--space-4xl: 80px` | `--space-5xl: 120px`

## 7. Border Radius
`--radius-sm: 4px` | `--radius-md: 10px` | `--radius-lg: 18px` | `--radius-xl: 28px` | `--radius-full: 9999px`

### Liquid Glass Radius Guidance
- `--radius-md` for compact controls with polished edges
- `--radius-lg` for product cards and floating UI chips
- `--radius-xl` for glass panels, hero modules, and immersive media frames

## 8. Shadows
`--shadow-sm: 0 2px 10px rgba(0,0,0,0.22)` | `--shadow-md: 0 12px 30px rgba(0,0,0,0.28)` | `--shadow-lg: 0 28px 80px rgba(4,8,20,0.48)` | `--shadow-glow: 0 0 36px rgba(111,124,255,0.28)`

### Liquid Glass Shadow Tokens
- `--shadow-glass-inner: inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.04)`
- `--shadow-glass-panel: 0 24px 60px rgba(0,0,0,0.34), 0 1px 0 rgba(255,255,255,0.10)`
- `--shadow-glass-hover: 0 32px 72px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.14), 0 0 32px rgba(111,124,255,0.18)`

## 9. Signature Element
- **Element:** `Luminous Glass Halo`
- **Concept:** Every key card, CTA, and product spotlight sits on a blurred dark-glass plane with a soft indigo edge-light that feels like illuminated crystal rather than neon UI.
- **Behavior:** Use a layered surface: dark base, translucent glass fill, top highlight, and outer glow. On hover, intensify border light and increase background blur instead of scaling aggressively.
- **CSS Tokens:** `--glass-blur: 18px`, `--glass-saturate: 140%`, `--glass-border-width: 1px`, `--halo-opacity: 0.7`
- **Usage:** Apply to hero cards, configurator steps, premium badges, and checkout trust modules. Avoid repeating it on every small component.

Example token block:
```css
:root {
  --color-primary: #6F7CFF;
  --color-secondary: #111318;
  --color-neutral: #98A1B3;
  --color-success: #37D6B5;
  --color-error: #FF6B8F;
  --color-bg: #090B10;
  --color-surface: #111318;
  --color-surface-elevated: #171A21;
  --color-text: #F5F7FB;
  --color-text-soft: #C5CCDA;
  --color-border: rgba(255,255,255,0.12);
  --color-glass-fill: rgba(255,255,255,0.08);
  --color-glass-stroke: rgba(255,255,255,0.18);
  --color-glass-highlight: rgba(255,255,255,0.34);
  --color-glow-primary: rgba(111,124,255,0.38);

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 80px;
  --space-5xl: 120px;

  --radius-sm: 4px;
  --radius-md: 10px;
  --radius-lg: 18px;
  --radius-xl: 28px;
  --radius-full: 9999px;

  --shadow-sm: 0 2px 10px rgba(0,0,0,0.22);
  --shadow-md: 0 12px 30px rgba(0,0,0,0.28);
  --shadow-lg: 0 28px 80px rgba(4,8,20,0.48);
  --shadow-glow: 0 0 36px rgba(111,124,255,0.28);
  --shadow-glass-inner: inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.04);
  --shadow-glass-panel: 0 24px 60px rgba(0,0,0,0.34), 0 1px 0 rgba(255,255,255,0.10);
  --shadow-glass-hover: 0 32px 72px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.14), 0 0 32px rgba(111,124,255,0.18);

  --glass-blur: 18px;
  --glass-saturate: 140%;
  --glass-border-width: 1px;
  --halo-opacity: 0.7;
}
```

## 10. Usage Guidelines
- Primary color is used only for CTA, active states, focus rings, and premium interaction feedback.
- Secondary and surface tokens carry the interface; never replace them with flat pure black.
- Keep visible accents to one main hue per screen; emerald remains functional, not decorative.
- Limit one luminous glass surface per viewport cluster to preserve premium tension.
- Body text uses `--color-text` or `--color-text-soft` only; never set long text in accent colors.
- Maintain contrast at AA minimum; avoid placing small text directly over blurred media.
