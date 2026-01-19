# Fusion5 Retail Agent Platform - Design System

## Overview
Enterprise-focused design system for the Fusion5 Retail Agent Platform marketing website. Emphasizes trust, professionalism, and operational focus over startup aesthetics.

## Design Philosophy
> "Design for trust, not trends. Enterprise buyers need to feel confident, not impressed."

### Core Principles
1. **Generous whitespace** over cramped content
2. **Subtle animations** over flashy effects  
3. **Real photography** over generic stock
4. **Custom illustrations** over clip art
5. **Data visualization** over decorative graphics
6. **Consistent rhythm** over visual novelty

## Color Palette

### Primary (Fusion5 Blue)
- `primary-500`: #3b82f6 - Main brand color
- `primary-600`: #2563eb - Hover states
- `primary-700`: #1d4ed8 - Active states
- `primary-100`: #dbeafe - Light backgrounds
- `primary-50`: #eff6ff - Subtle backgrounds

### Secondary (Professional Grays)
- `secondary-900`: #0f172a - Headings, primary text
- `secondary-700`: #334155 - Body text
- `secondary-500`: #64748b - Secondary text
- `secondary-300`: #cbd5e1 - Borders, dividers
- `secondary-100`: #f1f5f9 - Light backgrounds

### Accent (Confident Teal)
- `accent-500`: #14b8a6 - Primary CTAs
- `accent-600`: #0d9488 - CTA hover
- `accent-100`: #ccfbf1 - Success states

## Typography

### Font Stack
- **Primary**: Inter (loaded from Google Fonts)
- **Fallback**: system-ui, sans-serif

### Type Scale
- `text-6xl`: 60px/64px - Hero headlines
- `text-5xl`: 48px/48px - Page headlines  
- `text-4xl`: 36px/40px - Section headlines
- `text-3xl`: 30px/36px - Subsection headlines
- `text-2xl`: 24px/32px - Card titles
- `text-xl`: 20px/28px - Large body text
- `text-lg`: 18px/28px - Body text (prominent)
- `text-base`: 16px/24px - Body text (standard)
- `text-sm`: 14px/20px - Secondary text
- `text-xs`: 12px/16px - Labels, captions

### Font Weights
- `font-normal`: 400 - Body text
- `font-medium`: 500 - Emphasized text
- `font-semibold`: 600 - Headings
- `font-bold`: 700 - Strong headings

## Spacing System

### Base Unit: 4px (0.25rem)

### Scale
- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-6`: 24px
- `space-8`: 32px
- `space-12`: 48px
- `space-16`: 64px
- `space-20`: 80px
- `space-24`: 96px
- `space-32`: 128px

### Layout Grid
- **Container max-width**: 1280px
- **Section padding**: 96px vertical, 24px horizontal
- **Component spacing**: 48px between major sections
- **Content spacing**: 24px between related elements

## Components

### Buttons

#### Primary Button
- Background: `primary-500`
- Hover: `primary-600`
- Text: white, `font-medium`
- Padding: 12px 24px
- Border radius: 6px

#### Secondary Button  
- Background: transparent
- Border: 1px solid `secondary-300`
- Hover: `secondary-50`
- Text: `secondary-700`

#### CTA Button
- Background: `accent-500`
- Hover: `accent-600`
- Text: white, `font-semibold`
- Padding: 16px 32px

### Cards
- Background: white
- Border: 1px solid `secondary-200`
- Border radius: 12px
- Shadow: subtle (0 1px 3px rgba(0,0,0,0.1))
- Hover: lift shadow (0 4px 12px rgba(0,0,0,0.1))

## Layout Patterns

### Hero Sections
- Height: 80vh minimum
- Content: centered, max-width 800px
- Background: subtle gradient or solid color
- Text hierarchy: H1 + subtitle + CTA

### Feature Grids
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Gap: 32px
- Card aspect ratio: flexible height

### Content Sections
- Max width: 1200px
- Padding: 96px vertical
- Text max-width: 700px for readability

## Visual Elements

### Icons
- Style: Outline (Heroicons style)
- Weight: 1.5px stroke
- Size: 24px standard, 20px small, 32px large

### Images
- Style: Real photography preferred
- Treatment: Subtle border radius (8px)
- Quality: High resolution, optimized
- Color: Consistent color grading

### Illustrations
- Style: Clean, minimal line art
- Colors: Limited palette (primary + secondary)
- Usage: Technical concepts, not decorative

## Responsive Breakpoints

- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px - 1439px
- **Large**: 1440px+

### Mobile-First Approach
- Design mobile first, enhance for larger screens
- Touch targets minimum 44px
- Readable text without zooming
- Simplified navigation

## Animation Guidelines

### Micro-interactions
- Duration: 200-300ms
- Easing: ease-out for entrances, ease-in for exits
- Properties: transform, opacity (avoid animating layout)

### Page Transitions
- Duration: 400-600ms
- Style: Subtle fade or slide
- Performance: Use transform and opacity only

## Accessibility Standards

### Color Contrast
- Body text: minimum 4.5:1
- Large text: minimum 3:1
- Interactive elements: clearly distinguishable

### Focus States
- Visible outline for keyboard navigation
- Color: `primary-500` with 2px outline
- Never remove focus indicators

### Text
- Minimum font size: 16px on mobile
- Line height: 1.5 minimum for body text
- Sufficient spacing between interactive elements