# Frontend Versions

This directory contains different versions of the Fusion5 Retail Agents Website frontend.

## Available Versions

### v1-minimal (Original)
**Location:** `frontend-versions/v1-minimal/`

A clean, minimal high-fidelity design focused on content and structure.

**Characteristics:**
- Clean, minimal styling
- Basic hover effects
- Simple fade animations
- Standard typography
- Placeholder customer logos

**Best for:**
- Quick prototyping
- Content-focused presentations
- Situations requiring faster page loads

### v2-polished (Current - in `/frontend`)
**Location:** `frontend/` (main development)

An enhanced version with more visual polish, animations, and micro-interactions based on business feedback.

**Enhancements over v1:**

#### Loading & Transitions
- Page transition animations (fade in/out between routes)
- Smooth scroll-to-top on navigation
- Staggered reveal animations on scroll

#### Animations
- Scroll-triggered animations using Intersection Observer
- Staggered animations for card grids (100ms delay between items)
- Animated number counting for metrics
- Floating elements with subtle movement
- Blob morphing background decorations
- Icon scale animations on hover

#### Typography Improvements
- Improved letter-spacing (-0.025em for headers, -0.01em for body)
- Better line-height for readability (1.75-1.8 for body text)
- Darker body text color for better contrast (neutral-600 → neutral-700)
- Larger paragraph text size

#### Spacing Fixes
- Increased section padding (py-28 lg:py-36)
- Better card padding (p-7 to p-10)
- Improved gap between grid items (gap-8 lg:gap-10)
- More breathing room around CTAs

#### Visual Enhancements
- Animated background blob decorations
- Glass morphism effects
- Enhanced hover states with scale and shadow
- Glow effects on primary CTAs
- Color-coded customer type logos
- Gradient accent bars on card hover

#### Micro-interactions
- Button press effect (scale 0.98)
- Card lift on hover (translateY -6px)
- Icon bounce animation
- Link underline animation
- Arrow icon translation on hover (2px)

## Switching Between Versions

### To use v1-minimal:
```bash
# Backup current frontend
mv frontend frontend-v2-polished

# Restore v1
cp -r frontend-versions/v1-minimal frontend
```

### To restore v2-polished:
```bash
# Remove v1
rm -rf frontend

# Restore v2
mv frontend-v2-polished frontend
```

## Development

Both versions share the same:
- Package dependencies
- Build configuration (Vite)
- TypeScript configuration
- Tailwind CSS base configuration

The main differences are in:
- Component implementations (`/src/components/`)
- CSS utilities (`/src/index.css`)
- Custom hooks (v2 only has `/src/hooks/`)

## Recommendations

- **For demos/pitches:** Use v2-polished for maximum visual impact
- **For development/testing:** Either version works
- **For performance-critical:** v1-minimal has slightly faster initial loads

## Future Considerations

When adding real photography:
1. Replace placeholder customer logos with actual brand logos
2. Add hero background images/videos
3. Add team/testimonial photos
4. Consider WebP format with fallbacks for optimal loading
