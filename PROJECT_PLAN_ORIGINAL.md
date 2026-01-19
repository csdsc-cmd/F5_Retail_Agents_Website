# Project Implementation Plan

## Project Overview

### Project Name
Fusion5 Retail Agent Platform Website

### Description
A commercial marketing website extension for fusion5.com.au that showcases and sells the Fusion5 Retail Agent Platform - a subscription-based suite of modular, governed AI agents designed for Dynamics 365 retail workflows. The website positions the platform as the safer, faster, and more economical alternative to building agents in-house, targeting mid-market retailers on D365.

### Target Users
**Primary Buyers:**
- CIO / Head of IT - governance, risk, architecture concerns
- COO / Head of Retail Operations - execution, efficiency focus
- CFO / Finance Director - margin, cost control, ROI justification

**Secondary Users:**
- Inventory planners
- Store operations teams
- Customer service managers
- Loss prevention teams
- Executive leadership

---

## Project Team (AI Agents)

### UI/UX Designer Agent

**Name:** DesignDirector

**Role:** Senior UI/UX Designer with expertise in enterprise B2B SaaS websites

**Responsibilities:**
1. **Design Phase** - Reviews and approves all visual designs before implementation
2. **Asset Creation** - Generates custom images, illustrations, and graphics using AI tools
3. **Asset Sourcing** - Selects appropriate imagery from:
   - Existing Fusion5 website (brand consistency)
   - Open source photo libraries (Unsplash, Pexels)
   - AI-generated visuals (for diagrams, illustrations, icons)
4. **Visual QA** - Reviews implemented pages and can reject designs that don't meet standards
5. **Trend Awareness** - Applies 2026 enterprise web design best practices

**Design Standards (Rejection Criteria):**
- Rejects designs with poor visual hierarchy
- Rejects inconsistent spacing or typography
- Rejects generic stock photo aesthetics
- Rejects anything resembling "startup hype" visuals
- Rejects poor mobile responsiveness
- Rejects inaccessible color contrast
- Rejects cluttered or overwhelming layouts

**Tools Available:**
- `image_generation` - Generate custom illustrations, diagrams, hero images
- `web_fetch` - Access Fusion5 website for brand assets and style reference
- `screenshot_analysis` - Review implemented pages visually
- `unsplash_search` - Find appropriate stock photography
- `figma_export` - (optional) Export design specifications

**Design Philosophy:**
```
I design for trust, not trends. Enterprise buyers need to feel confident,
not impressed. Every visual element must serve the conversion goal.

My approach:
- Generous whitespace over cramped content
- Subtle animations over flashy effects
- Real photography over generic stock
- Custom illustrations over clip art
- Data visualization over decorative graphics
- Consistent rhythm over visual novelty

I reject anything that makes the site feel like a startup pitch deck.
The goal is to look like an established, reliable technology partner.
```

**2026 Enterprise Web Design Principles:**
- Bento grid layouts for feature showcases
- Subtle glassmorphism for depth (used sparingly)
- Variable fonts with refined micro-typography
- Scroll-triggered animations (performance-conscious)
- Dark mode as first-class option
- 3D elements for technical concepts (not decorative)
- Generous padding and breathing room
- Asymmetric layouts that still feel balanced
- Muted, sophisticated color palettes
- Photography with consistent color grading

**Visual QA Checklist:**
- [ ] Hero section creates immediate trust
- [ ] Navigation is intuitive and professional
- [ ] CTAs are visible but not aggressive
- [ ] Images support the message, not distract
- [ ] Typography hierarchy is crystal clear
- [ ] Mobile experience is polished, not adapted
- [ ] Page load feels instant
- [ ] Animations enhance, not delay
- [ ] Fusion5 brand is recognizable
- [ ] Overall impression: "These people are serious"

---

### Developer Agent

**Name:** BuildAgent

**Role:** Senior Full-Stack Developer specializing in React/TypeScript

**Responsibilities:**
- Implements components according to design specifications
- Ensures TypeScript strict mode compliance
- Optimizes for performance and accessibility
- Writes clean, maintainable code

---

### QA Agent

**Name:** QualityGate

**Role:** Quality Assurance Engineer

**Responsibilities:**
- Validates all success criteria
- Tests across browsers and devices
- Reports bugs and regressions
- Signs off on completion

---

## Site Architecture

### Pages Required

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/` | Platform-led hero, value proposition, agent overview cards |
| Platform Overview | `/platform` | Deep dive on platform capabilities, governance, architecture |
| Agents Overview | `/agents` | Grid/list of all 6 agents with summaries |
| Inventory Intelligence Agent | `/agents/inventory` | Individual agent detail page |
| Pricing & Promotions Agent | `/agents/pricing` | Individual agent detail page |
| Store Operations Agent | `/agents/store-operations` | Individual agent detail page |
| Customer Service & Returns Agent | `/agents/customer-service` | Individual agent detail page |
| Loss Prevention Agent | `/agents/loss-prevention` | Individual agent detail page |
| Executive Insights Agent | `/agents/executive-insights` | Individual agent detail page |
| Governance & Compliance | `/governance` | Security, audit, human-in-the-loop details |
| ROI Assessment | `/roi` | Form + value calculator |
| Book a Demo | `/demo` | Lead capture form |
| Resources | `/resources` | Gated content downloads |

---

## Design System

### Visual Tone
- Calm, confident, enterprise-safe
- Fusion5 brand aligned (not startup aesthetic)
- Clear hierarchy, minimal "AI hype"
- Professional data visualizations where appropriate

### Color Palette (Fusion5 aligned)
- Primary: Fusion5 brand blue
- Secondary: Professional grays
- Accent: Confident teal/green for CTAs
- Background: Clean whites and light grays

### Typography
- Headlines: Clean, modern sans-serif
- Body: Highly readable, professional
- No playful or casual fonts

### Copywriting Rules
**Tone:** Professional, operational, outcome-driven

**Avoid:**
- "Revolutionary", "game-changing", "cutting-edge"
- Generic AI claims
- Chatbot/bot language

**Emphasise:**
- Risk reduction
- Time-to-value
- Human control
- Governance
- D365 alignment

---

## Implementation Phases

### Phase 0: Design Foundation (DesignDirector)
- [ ] Analyze Fusion5 website for brand assets and style patterns (url: https://www.fusion5.com.au)
- [ ] Create design system specification (file: frontend/src/design/DESIGN_SYSTEM.md)
- [ ] Define color palette with exact values (file: frontend/src/design/colors.ts)
- [ ] Define typography scale and font selections (file: frontend/src/design/typography.ts)
- [ ] Define spacing and layout grid system (file: frontend/src/design/spacing.ts)
- [ ] Source/generate hero images for homepage (file: frontend/public/images/hero/)
- [ ] Source/generate agent icons/illustrations (file: frontend/public/images/agents/)
- [ ] Create mood board reference for developers (file: frontend/src/design/MOOD_BOARD.md)
- [ ] **DESIGN GATE: Design system approved before development begins**

### Phase 1: Project Setup & Configuration
- [ ] Create frontend package.json with dependencies (file: frontend/package.json)
- [ ] Create Vite configuration (file: frontend/vite.config.ts)
- [ ] Create TypeScript configuration (file: frontend/tsconfig.json)
- [ ] Create Tailwind CSS configuration with design tokens (file: frontend/tailwind.config.js)
- [ ] Create PostCSS configuration (file: frontend/postcss.config.js)
- [ ] Create environment configuration (file: frontend/.env.example)
- [ ] Create global CSS with design system variables (file: frontend/src/index.css)
- [ ] Create shared type definitions (file: frontend/src/types/index.ts)

### Phase 2: Core Layout & Components
- [ ] Create main App component with routing (file: frontend/src/App.tsx)
- [ ] Create Header/Navigation component (file: frontend/src/components/layout/Header.tsx)
- [ ] Create Footer component (file: frontend/src/components/layout/Footer.tsx)
- [ ] Create Layout wrapper component (file: frontend/src/components/layout/Layout.tsx)
- [ ] Create Mobile navigation menu (file: frontend/src/components/layout/MobileMenu.tsx)

### Phase 3: Shared UI Components
- [ ] Create Button component (file: frontend/src/components/ui/Button.tsx)
- [ ] Create Card component (file: frontend/src/components/ui/Card.tsx)
- [ ] Create Section component (file: frontend/src/components/ui/Section.tsx)
- [ ] Create Hero component (file: frontend/src/components/ui/Hero.tsx)
- [ ] Create Feature grid component (file: frontend/src/components/ui/FeatureGrid.tsx)
- [ ] Create CTA banner component (file: frontend/src/components/ui/CTABanner.tsx)
- [ ] Create Icon components (file: frontend/src/components/ui/Icons.tsx)
- [ ] Create Form components (file: frontend/src/components/ui/Form.tsx)
- [ ] Create Badge/Tag component (file: frontend/src/components/ui/Badge.tsx)

### Phase 4: Homepage
- [ ] Create Homepage component (file: frontend/src/pages/Home.tsx)
- [ ] Create Hero section with platform positioning (file: frontend/src/components/home/HeroSection.tsx)
- [ ] Create Agent cards overview section (file: frontend/src/components/home/AgentsOverview.tsx)
- [ ] Create Platform benefits section (file: frontend/src/components/home/PlatformBenefits.tsx)
- [ ] Create Social proof/trust section (file: frontend/src/components/home/TrustSection.tsx)
- [ ] Create Homepage CTA section (file: frontend/src/components/home/HomeCTA.tsx)
- [ ] **DESIGN REVIEW: DesignDirector visual QA on homepage (can reject)**

### Phase 5: Platform & Governance Pages
- [ ] Create Platform Overview page (file: frontend/src/pages/Platform.tsx)
- [ ] Create Platform capabilities section (file: frontend/src/components/platform/Capabilities.tsx)
- [ ] Create D365 integration section (file: frontend/src/components/platform/D365Integration.tsx)
- [ ] Create Architecture diagram component (file: frontend/src/components/platform/Architecture.tsx)
- [ ] Generate architecture diagram illustration (file: frontend/public/images/platform/architecture.svg)
- [ ] Create Governance & Compliance page (file: frontend/src/pages/Governance.tsx)
- [ ] Create Security features section (file: frontend/src/components/governance/SecurityFeatures.tsx)
- [ ] Create Human-in-the-loop section (file: frontend/src/components/governance/HumanInLoop.tsx)
- [ ] Create Audit & observability section (file: frontend/src/components/governance/AuditSection.tsx)
- [ ] Generate governance/security illustrations (file: frontend/public/images/governance/)
- [ ] **DESIGN REVIEW: DesignDirector visual QA on platform pages (can reject)**

### Phase 6: Agent Pages
- [ ] Create Agents Overview page (file: frontend/src/pages/Agents.tsx)
- [ ] Create Agent detail page template (file: frontend/src/pages/AgentDetail.tsx)
- [ ] Create agent data configuration (file: frontend/src/data/agents.ts)
- [ ] Create Agent hero section (file: frontend/src/components/agents/AgentHero.tsx)
- [ ] Create Agent benefits section (file: frontend/src/components/agents/AgentBenefits.tsx)
- [ ] Create Agent use cases section (file: frontend/src/components/agents/UseCases.tsx)
- [ ] Create Agent USP section (file: frontend/src/components/agents/UniqueSellingPoints.tsx)
- [ ] Create Related agents section (file: frontend/src/components/agents/RelatedAgents.tsx)
- [ ] Generate/source images for each agent page (file: frontend/public/images/agents/)
- [ ] **DESIGN REVIEW: DesignDirector visual QA on all 6 agent pages (can reject)**

### Phase 7: Conversion Pages
- [ ] Create Book a Demo page (file: frontend/src/pages/Demo.tsx)
- [ ] Create Demo request form (file: frontend/src/components/forms/DemoForm.tsx)
- [ ] Create ROI Assessment page (file: frontend/src/pages/ROI.tsx)
- [ ] Create ROI calculator component (file: frontend/src/components/roi/ROICalculator.tsx)
- [ ] Create ROI form component (file: frontend/src/components/forms/ROIForm.tsx)
- [ ] Create Resources page (file: frontend/src/pages/Resources.tsx)
- [ ] Create Resource card component (file: frontend/src/components/resources/ResourceCard.tsx)
- [ ] Create Gated content modal (file: frontend/src/components/resources/GatedModal.tsx)
- [ ] **DESIGN REVIEW: DesignDirector visual QA on conversion pages (can reject)**

### Phase 8: Integration & Polish
- [ ] Create 404 page (file: frontend/src/pages/NotFound.tsx)
- [ ] Create SEO meta component (file: frontend/src/components/SEO.tsx)
- [ ] Create scroll-to-top functionality (file: frontend/src/hooks/useScrollToTop.ts)
- [ ] Create form submission service (file: frontend/src/services/formService.ts)
- [ ] Create analytics integration (file: frontend/src/services/analytics.ts)
- [ ] Add loading states and transitions (file: frontend/src/components/ui/LoadingSpinner.tsx)
- [ ] Final responsive testing and fixes
- [ ] Create README with setup instructions (file: frontend/README.md)

### Phase 9: Final Design Review (DesignDirector)
- [ ] Full site visual QA - desktop (1920px, 1440px, 1280px)
- [ ] Full site visual QA - tablet (768px, 1024px)
- [ ] Full site visual QA - mobile (375px, 414px)
- [ ] Animation and transition review
- [ ] Image quality and loading review
- [ ] Typography consistency check
- [ ] Color consistency check
- [ ] Brand alignment final verification
- [ ] **FINAL DESIGN GATE: DesignDirector sign-off required before completion**

---

## File Manifest

| File | Purpose | Phase |
|------|---------|-------|
| frontend/src/design/DESIGN_SYSTEM.md | Complete design system specification | 0 |
| frontend/src/design/MOOD_BOARD.md | Visual reference and inspiration | 0 |
| frontend/src/design/colors.ts | Color palette with CSS variables | 0 |
| frontend/src/design/typography.ts | Font families, sizes, weights | 0 |
| frontend/src/design/spacing.ts | Spacing scale and grid system | 0 |
| frontend/public/images/hero/* | Homepage hero images | 0 |
| frontend/public/images/agents/* | Agent icons and illustrations | 0 |
| frontend/public/images/platform/* | Platform diagrams and visuals | 5 |
| frontend/public/images/governance/* | Security and compliance visuals | 5 |
| frontend/package.json | Dependencies: React, React Router, Tailwind, etc. | 1 |
| frontend/vite.config.ts | Vite build configuration | 1 |
| frontend/tsconfig.json | TypeScript strict mode config | 1 |
| frontend/tailwind.config.js | Tailwind with Fusion5 design tokens | 1 |
| frontend/postcss.config.js | PostCSS for Tailwind | 1 |
| frontend/src/index.css | Global styles, CSS variables | 1 |
| frontend/src/types/index.ts | TypeScript interfaces (Agent, Form, etc.) | 1 |
| frontend/src/App.tsx | Root component with React Router | 2 |
| frontend/src/components/layout/Header.tsx | Navigation with dropdowns | 2 |
| frontend/src/components/layout/Footer.tsx | Footer with links, legal | 2 |
| frontend/src/components/layout/Layout.tsx | Page wrapper | 2 |
| frontend/src/components/layout/MobileMenu.tsx | Mobile hamburger menu | 2 |
| frontend/src/components/ui/Button.tsx | Primary, secondary, ghost buttons | 3 |
| frontend/src/components/ui/Card.tsx | Content cards | 3 |
| frontend/src/components/ui/Section.tsx | Page section wrapper | 3 |
| frontend/src/components/ui/Hero.tsx | Hero section template | 3 |
| frontend/src/components/ui/FeatureGrid.tsx | Feature grid layout | 3 |
| frontend/src/components/ui/CTABanner.tsx | Call-to-action banners | 3 |
| frontend/src/components/ui/Icons.tsx | SVG icon components | 3 |
| frontend/src/components/ui/Form.tsx | Form input components | 3 |
| frontend/src/components/ui/Badge.tsx | Status badges/tags | 3 |
| frontend/src/pages/Home.tsx | Homepage | 4 |
| frontend/src/components/home/HeroSection.tsx | Main hero with value prop | 4 |
| frontend/src/components/home/AgentsOverview.tsx | 6 agent cards | 4 |
| frontend/src/components/home/PlatformBenefits.tsx | Key differentiators | 4 |
| frontend/src/components/home/TrustSection.tsx | Credibility signals | 4 |
| frontend/src/components/home/HomeCTA.tsx | Conversion section | 4 |
| frontend/src/pages/Platform.tsx | Platform overview page | 5 |
| frontend/src/components/platform/Capabilities.tsx | Agent capabilities | 5 |
| frontend/src/components/platform/D365Integration.tsx | D365 native messaging | 5 |
| frontend/src/components/platform/Architecture.tsx | Architecture diagram | 5 |
| frontend/src/pages/Governance.tsx | Governance page | 5 |
| frontend/src/components/governance/SecurityFeatures.tsx | Security details | 5 |
| frontend/src/components/governance/HumanInLoop.tsx | Human approval workflows | 5 |
| frontend/src/components/governance/AuditSection.tsx | Audit trail info | 5 |
| frontend/src/pages/Agents.tsx | All agents overview | 6 |
| frontend/src/pages/AgentDetail.tsx | Individual agent template | 6 |
| frontend/src/data/agents.ts | Agent content data | 6 |
| frontend/src/components/agents/AgentHero.tsx | Agent page hero | 6 |
| frontend/src/components/agents/AgentBenefits.tsx | Benefits list | 6 |
| frontend/src/components/agents/UseCases.tsx | Use case examples | 6 |
| frontend/src/components/agents/UniqueSellingPoints.tsx | USPs | 6 |
| frontend/src/components/agents/RelatedAgents.tsx | Cross-sell | 6 |
| frontend/src/pages/Demo.tsx | Book demo page | 7 |
| frontend/src/components/forms/DemoForm.tsx | Demo request form | 7 |
| frontend/src/pages/ROI.tsx | ROI assessment page | 7 |
| frontend/src/components/roi/ROICalculator.tsx | Interactive calculator | 7 |
| frontend/src/components/forms/ROIForm.tsx | ROI request form | 7 |
| frontend/src/pages/Resources.tsx | Resources listing | 7 |
| frontend/src/components/resources/ResourceCard.tsx | Resource item | 7 |
| frontend/src/components/resources/GatedModal.tsx | Email gate modal | 7 |
| frontend/src/pages/NotFound.tsx | 404 page | 8 |
| frontend/src/components/SEO.tsx | Meta tags component | 8 |
| frontend/src/hooks/useScrollToTop.ts | Scroll restoration | 8 |
| frontend/src/services/formService.ts | Form submission handler | 8 |
| frontend/src/services/analytics.ts | Analytics tracking | 8 |
| frontend/src/components/ui/LoadingSpinner.tsx | Loading indicator | 8 |
| frontend/README.md | Setup documentation | 8 |

---

## Agent Content Data

### Agent 1: Inventory Intelligence Agent
- **Route:** `/agents/inventory`
- **Purpose:** Automates detection, analysis, and handling of inventory exceptions across stores and channels
- **Benefits:** Reduces stockouts/overstock, cuts manual exception handling, improves inventory turns and cash flow
- **USPs:** Exception-first logic, human approval built-in, D365 Supply Chain native

### Agent 2: Pricing & Promotions Intelligence Agent
- **Route:** `/agents/pricing`
- **Purpose:** Monitors promotion and pricing performance, explains margin impact, flags corrective actions
- **Benefits:** Protects margin during promotions, reduces post-hoc analysis, improves pricing discipline
- **USPs:** Explains why margin moved, aligns Commerce + Finance, human-in-the-loop guardrails

### Agent 3: Store Operations Agent
- **Route:** `/agents/store-operations`
- **Purpose:** Automates store task execution monitoring and exception escalation
- **Benefits:** Improves execution consistency, reduces head office follow-ups, increases compliance
- **USPs:** Exception-driven oversight, D365 Commerce integration, smart escalation

### Agent 4: Customer Service & Returns Agent
- **Route:** `/agents/customer-service`
- **Purpose:** Handles repetitive retail enquiries and triages returns before human involvement
- **Benefits:** Reduces service team workload, speeds resolution, improves consistency
- **USPs:** Policy-aware decisions, safe escalation, D365 Customer Service native

### Agent 5: Loss Prevention Intelligence Agent
- **Route:** `/agents/loss-prevention`
- **Purpose:** Identifies anomalous inventory and financial patterns linked to shrinkage
- **Benefits:** Earlier detection, focused investigations, reduced blanket audits
- **USPs:** Commerce + Finance signals, explains anomaly reasoning, audit workflow support

### Agent 6: Executive Insights Agent
- **Route:** `/agents/executive-insights`
- **Purpose:** Answers executive questions about retail performance with context and recommended actions
- **Benefits:** Reduces analyst dependency, faster decisions, shared operational understanding
- **USPs:** Explains drivers not just metrics, cross-D365 reasoning, leadership-designed

---

## Success Criteria

### Build Success
- [ ] TypeScript compiles without errors (`npm run build` succeeds)
- [ ] No console errors in development or production
- [ ] All routes render correctly
- [ ] Forms submit without errors (to configured endpoint)

### Design Success (DesignDirector Sign-off Required)
- [ ] Matches Fusion5 brand guidelines (verified by DesignDirector)
- [ ] Mobile responsive (375px - 1920px) - all breakpoints reviewed
- [ ] Consistent typography and spacing throughout
- [ ] Professional, enterprise-safe aesthetic
- [ ] No "AI hype" visual language
- [ ] All images are high quality and appropriate
- [ ] Color palette used consistently
- [ ] Animations are subtle and purposeful
- [ ] Visual hierarchy is clear on every page
- [ ] **DesignDirector final approval received**

### Content Success
- [ ] All 6 agent pages have complete content
- [ ] Platform positioning is clear and consistent
- [ ] Governance messaging is prominent
- [ ] D365 native messaging is clear
- [ ] Copywriting follows tone guidelines

### Conversion Success
- [ ] Book a Demo form captures: name, email, company, role, message
- [ ] ROI Assessment form captures: company size, D365 modules, pain points
- [ ] Resources gate captures: email before download
- [ ] Clear CTAs on every page
- [ ] Multiple paths to conversion

### SEO & Performance
- [ ] All pages have unique meta titles and descriptions
- [ ] Images are optimized
- [ ] Lighthouse performance score > 80
- [ ] Core Web Vitals pass

---

## Completion Signal

When ALL success criteria above are met, add this comment to `frontend/src/App.tsx`:

```typescript
// BUILD_COMPLETE: Fusion5 Retail Agent Platform Website
// - All pages implemented and styled
// - Forms functional
// - Mobile responsive
// - Brand aligned
// - DesignDirector approved: [DATE]
// - All success criteria verified
```

**Note:** BUILD_COMPLETE cannot be added until DesignDirector has provided final sign-off.

---

## Notes for Build Loop

### Iteration Strategy
- **Phase 0**: ~5-8 iterations (design system, assets - DesignDirector)
- **Phase 1**: ~3-5 iterations (setup, config)
- **Phase 2**: ~5-8 iterations (layout components)
- **Phase 3**: ~8-12 iterations (UI component library)
- **Phase 4**: ~8-12 iterations (homepage) + design review
- **Phase 5**: ~10-14 iterations (platform/governance pages) + design review
- **Phase 6**: ~15-20 iterations (agent pages) + design review
- **Phase 7**: ~8-12 iterations (conversion pages) + design review
- **Phase 8**: ~5-8 iterations (polish)
- **Phase 9**: ~3-8 iterations (final design QA, revisions)

**Total estimated**: 70-105 iterations

### Validation Checks

**Technical Validation (every iteration):**
- `tsc --noEmit` - TypeScript check
- `npm run build` - Production build test
- `npm run lint` - ESLint (if configured)

**Design Validation (at phase gates):**
- DesignDirector screenshot review
- Visual QA checklist verification
- Brand alignment check
- Responsive breakpoint review

**Design Review Process:**
1. BuildAgent completes phase implementation
2. DesignDirector takes screenshots at key breakpoints
3. DesignDirector evaluates against Visual QA Checklist
4. If APPROVED: proceed to next phase
5. If REJECTED: DesignDirector provides specific feedback, BuildAgent iterates

**Rejection Feedback Format:**
```
DESIGN_REJECTED

Issues:
- [Specific issue 1]
- [Specific issue 2]

Required Changes:
- [Actionable fix 1]
- [Actionable fix 2]

Reference: [Link to design system or mood board section]
```

### Key Dependencies Order
1. Config files first (package.json, vite, tailwind)
2. Types and design tokens
3. Layout components before pages
4. UI components before page-specific components
5. Data files before components that consume them

### Content Notes
- Agent content should be data-driven from `agents.ts`
- Use same component templates across all agent pages
- Keep copy professional and outcome-focused
- No placeholder "Lorem ipsum" - use real copy

---

## Environment Variables

### Frontend (.env)
```bash
VITE_FORM_ENDPOINT=https://your-form-handler.com/submit
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_SITE_URL=https://retail-agents.fusion5.com.au
```

---

## Tech Stack

### Frontend
- React 18
- TypeScript (strict mode)
- Vite (build tool)
- React Router v6 (routing)
- Tailwind CSS (styling)
- React Hook Form (form handling)
- Zod (form validation)

### No Backend Required (Phase 1)
- Forms submit to external service (Formspree, HubSpot, etc.)
- Static site deployment (Vercel, Netlify, Azure Static Web Apps)

---

*Generated: 2025-01-20*
*North Star: Make it feel irrational for a mid-market retailer on D365 to try building this themselves.*
