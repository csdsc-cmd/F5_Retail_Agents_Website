# Fusion5 Brand Guidelines

> **Reference**: https://www.fusion5.com/nz
> **This file is human-maintained.** Update when brand guidelines change.

## Brand Identity

Fusion5 is a leading business solutions provider in Australia and New Zealand. The brand conveys:
- **Professional enterprise expertise** with approachable warmth
- **Innovation and digital transformation** leadership
- **Trust and reliability** for mid-market businesses

## Color Palette

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Deep Purple | `#3b1d4e` | Primary brand, headers, footers, dark backgrounds |
| Coral/Orange-Red | `#ff5c39` | CTAs, accents, highlights, energy |
| White | `#ffffff` | Primary backgrounds, text on dark |

### Brand Gradient
- **Direction**: 135deg (diagonal) or 90deg (horizontal)
- **Start**: `#ff5c39` (coral/orange)
- **End**: `#3b1d4e` (deep purple)
- **Usage**: Loading bars, accent elements, hero overlays, buttons

### Extended Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Light Purple | `#6b2d5b` | Secondary purple, hover states |
| Coral Light | `#ff7b5c` | Lighter accent variant |
| Magenta | `#c44569` | Mid-gradient point |
| Off-White | `#fdfcfb` | Subtle backgrounds |
| Dark Gray | `#1f2937` | Body text |
| Medium Gray | `#6b7280` | Secondary text |

## Typography

### Font Stack
- **Primary**: Inter, system-ui, -apple-system, sans-serif
- **Fallback**: Segoe UI, Roboto, Helvetica Neue, Arial

### Type Scale
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Hero Heading | 3rem-3.75rem (48-60px) | 700 | 1.1-1.2 |
| Section Heading | 2.25rem (36px) | 700 | 1.2 |
| Subsection | 1.5rem (24px) | 600 | 1.3 |
| Body Large | 1.125rem (18px) | 400 | 1.6 |
| Body | 1rem (16px) | 400 | 1.6 |
| Small | 0.875rem (14px) | 400 | 1.5 |

### Typography Guidelines
- Headlines should be bold and impactful
- Use sentence case for headings (not Title Case)
- Body text should have generous line height for readability
- Limit line width to 65-75 characters for optimal reading

## Layout & Spacing

### Container
- Max width: 1280px
- Side padding: 1rem (mobile), 1.5rem (tablet), 2rem (desktop)
- Centered with `margin: 0 auto`

### Spacing Scale
- Use 8px base unit (0.5rem)
- Section padding: 4rem-6rem vertical
- Component gaps: 1.5rem-2rem
- Card padding: 1.5rem-2rem

### Grid
- 12-column grid for flexibility
- Responsive breakpoints: 640px, 768px, 1024px, 1280px

## Components

### Buttons
```css
/* Primary CTA */
.btn-primary {
  background: linear-gradient(135deg, #ff5c39 0%, #e64a2a 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 92, 57, 0.3);
}

/* Secondary CTA */
.btn-secondary {
  background: linear-gradient(135deg, #6b2d5b 0%, #3b1d4e 100%);
  color: white;
}
```

### Cards
- Background: white with subtle shadow
- Border-radius: 0.75rem-1rem
- Hover: lift effect (translateY -4px) with increased shadow
- Padding: 1.5rem-2rem

### Navigation
- Sticky header with white/transparent background
- Logo on left, nav items on right
- Mobile: hamburger menu with slide-in drawer
- Active state: coral underline or background

### Hero Sections
- Minimum height: 50vh for impact
- Full-width with contained content
- Background: gradient overlay on images or solid gradient
- CTA buttons prominently placed

### Footer
- Dark background (deep purple `#3b1d4e`)
- Multi-column layout
- Social icons, partner logos
- Copyright and legal links

## Imagery

### Style
- Professional but approachable
- Modern, clean photography
- Abstract tech/digital patterns for backgrounds
- Avoid stock photo clichs

### Treatment
- Use gradient overlays for text legibility
- Lazy loading with blur-up placeholders
- Optimized for web (WebP with fallbacks)

## Motion & Interaction

### Principles
- Subtle and purposeful
- Enhance user understanding
- Never delay or obstruct

### Transitions
- Duration: 200-300ms for UI, 400-500ms for page
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out)

### Hover States
- Buttons: slight lift + shadow increase
- Cards: lift + shadow + optional border color
- Links: underline animation or color change
- Icons: subtle bounce or scale

### Loading
- Gradient loading bar (coral to purple)
- Skeleton screens for content
- Opacity fade-in for images

## Accessibility

### Requirements
- WCAG 2.1 AA compliance minimum
- Color contrast: 4.5:1 for body text, 3:1 for large text
- Focus states: 2px outline offset, visible ring
- Semantic HTML throughout
- Keyboard navigation support

### Focus Styling
```css
*:focus-visible {
  outline: 2px solid #ff5c39;
  outline-offset: 2px;
}
```

## Voice & Tone

- **Professional** but not stuffy
- **Confident** but not arrogant
- **Helpful** and solution-oriented
- **Clear** and jargon-free where possible

### Headlines
- Action-oriented: "Make more possible. Go beyond."
- Benefit-focused
- Concise (under 10 words preferred)

---

*Based on analysis of fusion5.com/nz - January 2026*
