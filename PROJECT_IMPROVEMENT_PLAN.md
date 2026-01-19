# PROJECT_IMPROVEMENT_PLAN.md

## Executive Summary

### Current State
The project received a **7/10 score** from Design Director review, indicating a strong foundation with excellent brand alignment and modern design patterns. However, the project is **NOT APPROVED** for release due to critical accessibility issues, inconsistent spacing rhythm, and visual hierarchy problems.

### Goals
1. Achieve full WCAG AA accessibility compliance
2. Establish consistent spacing and visual rhythm
3. Resolve all critical UI/UX issues blocking approval
4. Polish remaining visual elements for production readiness

### Target Outcome
Reach **9/10 score** and obtain Design Director approval within the planned implementation phases.

---

## Priority Matrix

| Impact ↓ / Effort → | Low Effort (S) | Medium Effort (M) | High Effort (L) |
|---------------------|----------------|-------------------|-----------------|
| **High Impact** | Focus states fix, Placeholder contrast, Footer link hovers | Header/Logo resize, Section spacing standardization | Floating elements z-index |
| **Medium Impact** | Button hover scale fix, Border-radius standardization | Trust metric card heights, CTA card differentiation | ROI calculator UX |
| **Low Impact** | Hero line-height, Font weights | Card hover animations, Mobile connection lines | Reduced motion support |

---

## Implementation Phases

---

### Phase 1: Critical Accessibility Fixes
**Timeline:** Day 1-2  
**Goal:** Resolve all accessibility barriers blocking user interaction

#### Task 1.1 🔴 Fix Focus State Accessibility
**File:** `src/index.css` (or `styles/globals.css`)  
**Effort:** S  
**Assigned:** Frontend Developer

- [ ] Remove any `outline: none` or `outline: 0` declarations
- [ ] Implement proper focus-visible approach

**Current Code (Remove):**
```css
*:focus {
  outline: none;
}
```

**Replacement Code:**
```css
/* Remove default focus for mouse users, keep for keyboard */
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Ensure interactive elements have visible focus */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(var(--primary-500-rgb), 0.1);
}
```

**Success Criteria:**
- [ ] Tab through entire page with keyboard - all interactive elements show visible focus ring
- [ ] Focus ring is clearly visible against all background colors
- [ ] Lighthouse accessibility score improves

---

#### Task 1.2 🔴 Fix Form Input Contrast
**File:** `src/components/ui/Form.tsx`  
**Effort:** S  
**Assigned:** Frontend Developer

- [ ] Update placeholder text colors to meet WCAG AA (4.5:1 ratio)
- [ ] Update helper text colors for sufficient contrast

**Current Code (Find & Replace):**
```tsx
// Find instances like:
placeholder:text-neutral-400
text-neutral-400 // for helper text
```

**Replacement Code:**
```tsx
// Input component
<input
  className={cn(
    "w-full px-4 py-3 rounded-lg border border-neutral-300",
    "placeholder:text-neutral-500", // Changed from 400
    "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
    "transition-colors duration-200",
    className
  )}
  {...props}
/>

// Helper text component
<p className="mt-1.5 text-sm text-neutral-600"> {/* Changed from 400 */}
  {helperText}
</p>

// Error text (ensure contrast)
<p className="mt-1.5 text-sm text-red-600 font-medium">
  {errorMessage}
</p>
```

**Success Criteria:**
- [ ] Run contrast checker on all form text - minimum 4.5:1 ratio
- [ ] Placeholders readable on white and light gray backgrounds
- [ ] Helper text clearly legible

---

#### Task 1.3 🔴 Fix Floating Elements Z-Index
**File:** `src/components/home/HeroSection.tsx`  
**Effort:** M  
**Assigned:** Frontend Developer

- [ ] Audit all decorative floating elements
- [ ] Add responsive visibility or pointer-events handling
- [ ] Test touch targets on mobile devices

**Current Code (Identify patterns like):**
```tsx
<div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full blur-3xl opacity-30" />
```

**Replacement Code:**
```tsx
{/* Decorative elements - hidden on mobile or non-interactive */}
<div 
  className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full blur-3xl opacity-30 hidden lg:block pointer-events-none"
  aria-hidden="true"
/>

{/* Alternative: Keep visible but ensure non-blocking */}
<div 
  className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full blur-3xl opacity-30 pointer-events-none select-none -z-10"
  aria-hidden="true"
/>
```

**Full Component Update:**
```tsx
const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background decorative elements - behind content */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full blur-3xl opacity-30 hidden lg:block" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-tr from-secondary-200 to-secondary-300 rounded-full blur-2xl opacity-25 hidden lg:block" />
      </div>
      
      {/* Main content - always interactive */}
      <div className="relative z-10">
        {/* Hero content here */}
      </div>
    </section>
  );
};
```

**Success Criteria:**
- [ ] All buttons/links in hero clickable on mobile (test iPhone SE, Android)
- [ ] No decorative elements block touch targets
- [ ] Visual design maintained on desktop

---

#### Task 1.4 🔴 Fix Header Logo Issues
**File:** `src/components/layout/Header.tsx`  
**Effort:** M  
**Assigned:** Frontend Developer + Designer

- [ ] Replace logo image with transparent PNG or SVG
- [ ] Reduce logo dimensions
- [ ] Adjust header height proportionally

**Current Code:**
```tsx
<header className="h-24 md:h-28 ...">
  <img 
    src="/logo.png" 
    alt="Company Logo"
    className="h-32 md:h-40 mix-blend-multiply"
  />
</header>
```

**Replacement Code:**
```tsx
<header className="h-16 md:h-20 sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
  <div className="container mx-auto px-4 h-full flex items-center justify-between">
    {/* Logo - properly sized */}
    <a href="/" className="flex items-center gap-2">
      <img 
        src="/logo-transparent.svg" // Use SVG or transparent PNG
        alt="Company Logo"
        className="h-10 md:h-12 w-auto" // Reduced from h-32/h-40
      />
      {/* Optional: Add text logo for clarity */}
      <span className="font-semibold text-lg text-neutral-900 hidden sm:block">
        CompanyName
      </span>
    </a>
    
    {/* Navigation */}
    <nav className="flex items-center gap-6">
      {/* nav items */}
    </nav>
  </div>
</header>
```

**Asset Requirements:**
- [ ] Request transparent logo from design team (SVG preferred)
- [ ] Ensure logo works on both light and dark backgrounds
- [ ] Provide @2x version for retina displays if using PNG

**Success Criteria:**
- [ ] No visual artifacts around logo edges
- [ ] Header proportions feel balanced (logo ~40% of header height)
- [ ] Logo crisp on retina displays

---

### Phase 2: Visual Consistency & Spacing
**Timeline:** Day 3-4  
**Goal:** Establish consistent spacing rhythm and visual hierarchy

#### Task 2.1 🟡 Standardize Section Spacing
**Files:** All section components  
**Effort:** M  
**Assigned:** Frontend Developer

**Files to Update:**
- [ ] `src/components/home/HeroSection.tsx`
- [ ] `src/components/home/FeaturesSection.tsx`
- [ ] `src/components/home/TrustSection.tsx`
- [ ] `src/components/home/TestimonialsSection.tsx`
- [ ] `src/components/home/PricingSection.tsx`
- [ ] `src/components/home/CTASection.tsx`

**Spacing Standard:**
```tsx
// Create a reusable section wrapper component
// File: src/components/ui/Section.tsx

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'primary';
  id?: string;
}

export const Section = ({ 
  children, 
  className, 
  background = 'white',
  id 
}: SectionProps) => {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-neutral-50',
    primary: 'bg-primary-50'
  };

  return (
    <section 
      id={id}
      className={cn(
        "py-20 lg:py-28", // Standardized spacing
        bgClasses[background],
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};
```

**Usage Example:**
```tsx
// Before
<section className="py-12 md:py-16 lg:py-24 bg-white">

// After
<Section background="white">
```

**Success Criteria:**
- [ ] All main sections use `py-20 lg:py-28`
- [ ] Consistent container padding across breakpoints
- [ ] Visual rhythm feels balanced when scrolling

---

#### Task 2.2 🟡 Fix Trust Metric Card Heights
**File:** `src/components/home/TrustSection.tsx`  
**Effort:** S  
**Assigned:** Frontend Developer

- [ ] Add minimum height to metric cards
- [ ] Use flexbox for consistent internal alignment

**Current Code:**
```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
  {metrics.map((metric) => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <p className="text-3xl font-bold text-primary-600">{metric.value}</p>
      <p className="text-neutral-600">{metric.label}</p>
    </div>
  ))}
</div>
```

**Replacement Code:**
```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
  {metrics.map((metric) => (
    <div 
      key={metric.id}
      className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 min-h-[160px] flex flex-col justify-center items-center text-center"
    >
      <p className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
        {metric.value}
      </p>
      <p className="text-neutral-600 text-sm lg:text-base">
        {metric.label}
      </p>
    </div>
  ))}
</div>
```

**Success Criteria:**
- [ ] All metric cards same height in each row
- [ ] Content vertically centered
- [ ] Cards align properly on all breakpoints

---

#### Task 2.3 🟡 Standardize Border Radius
**File:** `src/index.css` + component files  
**Effort:** S  
**Assigned:** Frontend Developer

- [ ] Define border-radius design tokens
- [ ] Apply consistently across components

**Add to CSS Variables:**
```css
:root {
  /* Border Radius Scale */
  --radius-sm: 0.375rem;   /* 6px - small elements */
  --radius-md: 0.5rem;     /* 8px - inputs, small cards */
  --radius-lg: 0.75rem;    /* 12px - cards, modals */
  --radius-xl: 1rem;       /* 16px - large cards */
  --radius-2xl: 1.5rem;    /* 24px - hero elements */
  --radius-full: 9999px;   /* pills, avatars */
}
```

**Tailwind Config Update:**
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    }
  }
}
```

**Application Standard:**
| Element | Border Radius |
|---------|---------------|
| Buttons | `rounded-lg` (12px) |
| Inputs | `rounded-lg` (12px) |
| Cards | `rounded-xl` (16px) |
| Modals | `rounded-2xl` (24px) |
| Badges/Pills | `rounded-full` |
| Avatars | `rounded-full` |

**Success Criteria:**
- [ ] Buttons and inputs have matching border radius
- [ ] All cards use consistent radius
- [ ] No mixing of arbitrary radius values

---

#### Task 2.4 🟡 Add Comparison Table Recommended Badge
**File:** `src/components/home/PricingSection.tsx` (or ComparisonTable component)  
**Effort:** S  
**Assigned:** Frontend Developer

- [ ] Add "Recommended" badge to Platform/Pro tier column
- [ ] Style to draw attention without overwhelming

**Code Addition:**
```tsx
// Pricing column header component
const PricingColumnHeader = ({ 
  title, 
  price, 
  isRecommended 
}: { 
  title: string; 
  price: string; 
  isRecommended?: boolean;
}) => (
  <div className={cn(
    "relative p-6 text-center",
    isRecommended && "bg-primary-50 rounded-t-xl"
  )}>
    {isRecommended && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          Recommended
        </span>
      </div>
    )}
    <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
    <p className="text-3xl font-bold text-primary-600 mt-2">{price}</p>
  </div>
);

// Usage
<PricingColumnHeader 
  title="Platform" 
  price="$99/mo" 
  isRecommended={true} 
/>
```

**Success Criteria:**
- [ ] Badge clearly visible above recommended column
- [ ] Column visually differentiated from others
- [ ] Works on mobile responsive view

---

### Phase 3: UX Enhancements
**Timeline:** Day 5-6  
**Goal:** Improve user experience and interaction patterns

#### Task 3.1 🟡 Fix Button Hover Scale Layout Shifts
**File:** `src/components/ui/Button.tsx`  
**Effort:** S  
**Assigned:** Frontend Developer

- [ ] Remove transform scale on hover
- [ ] Replace with safer visual feedback

**Current Code (Problematic):**
```tsx
<button className="... hover:scale-105 transition-transform">
```

**Replacement Code:**
```tsx
// Option A: Use shadow/color change instead of scale
<button 
  className={cn(
    "px-6 py-3 rounded-lg font-medium",
    "transition-all duration-200",
    "hover:shadow-lg hover:shadow-primary-500/25",
    "hover:-translate-y-0.5", // Subtle lift, minimal layout impact
    "active:translate-y-0 active:shadow-md",
    className
  )}
>
  {children}
</button>

// Option B: Internal content animation only
<button 
  className={cn(
    "group px-6 py-3 rounded-lg font-medium",
    "transition-colors duration-200",
    "hover:bg-primary-700",
    className
  )}
>
  <span className="flex items-center gap-2">
    {children}
    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
  </span>
</button>
```

**Success Criteria:**
- [ ] No content shifts when hovering buttons
- [ ] Hover state still provides clear visual feedback
- [ ] Active/pressed state feels responsive

---

#### Task 3.2 🟡 Add Footer Link Hover States
**File:** `src/components/layout/Footer.tsx`  
**Effort:** S  
**Assigned:** Frontend Developer

- [ ] Add underline animation on hover
- [ ] Ensure sufficient color contrast

**Code Update:**
```tsx
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href}
    className={cn(
      "text-neutral-400 hover:text-white",
      "transition-colors duration-200",
      "relative inline-block",
      // Underline animation
      "after:absolute after:bottom-0 after:left-0",
      "after:h-px after:w-0 after:bg-current",
      "after:transition-all after:duration-200",
      "hover:after:w-full"
    )}
  >
    {children}
  </a>
);

// Usage in footer
<nav className="flex flex-col gap-3">
  <FooterLink href="/about">About Us</FooterLink>
  <FooterLink href="/careers">Careers</FooterLink>
  <FooterLink href="/blog">Blog</FooterLink>
</nav>
```

**Success Criteria:**
- [ ] All footer links have visible hover state
- [ ] Underline animates smoothly
- [ ] Links accessible (visible against footer background)

---

#### Task 3.3 🟡 Improve ROI Calculator Placeholder State
**File:** `src/components/home/ROICalculator.tsx`  
**Effort:** M  
**Assigned:** Frontend Developer

- [ ] Add empty state with guidance
- [ ] Show sample calculation or preview
- [ ] Improve input labels and feedback

**Code Structure:**
```tsx
const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    employees: '',
    avgSalary: '',
    hoursPerWeek: ''
  });
  const [result, setResult] = useState<number | null>(null);

  const hasInputs = Object.values(inputs).some(v => v !== '');

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold text-neutral-900 mb-6">
        Calculate Your ROI
      </h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Number of Employees
            </label>
            <input
              type="number"
              placeholder="e.g., 50"
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 placeholder:text-neutral-500"
              value={inputs.employees}
              onChange={(e) => setInputs(prev => ({ ...prev, employees: e.target.value }))}
            />
            <p className="mt-1 text-sm text-neutral-600">
              How many team members will use the platform?
            </p>
          </div>
          {/* More inputs... */}
        </div>
        
        {/* Results Section */}
        <div className={cn(
          "rounded-xl p-6 transition-all duration-300",
          result !== null 
            ? "bg-primary-50 border-2 border-primary-200" 
            : "bg-neutral-50 border-2 border-dashed border-neutral-200"
        )}>
          {result !== null ? (
            <div className="text-center">
              <p className="text-sm text-primary-600 font-medium mb-2">
                Estimated Annual Savings
              </p>
              <p className="text-4xl font-bold text-primary-700">
                ${result.toLocaleString()}
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <Calculator className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500">
                Enter your details to see potential savings
              </p>
              <p className="text-sm text-neutral-400 mt-2">
                Most companies save $50,000+ annually
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
```

**Success Criteria:**
- [ ] Empty state clearly indicates what to do
- [ ] Input labels explain what's expected
- [ ] Results animate in smoothly
- [ ] Placeholder provides social proof hint

---

#### Task 3.4 🟡 Differentiate Primary/Secondary CTA Cards
**File:** `src/components/home/CTASection.tsx`  
**Effort:** S  
**Assigned:** Frontend Developer

- [ ] Create clear visual hierarchy between CTA options
- [ ] Primary CTA should be more prominent

**Code Update:**
```tsx
const CTASection = () => (
  <Section background="primary" className="text-center">
    <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
      Ready to Get Started?
    </h2>
    <p className="text-lg text-neutral-600 mb-10 max-w-2xl mx-auto">
      Choose the option that works best for you
    </p>
    
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* Primary CTA - More prominent */}
      <div className="bg-primary-600 rounded-2xl p-8 text-white shadow-xl shadow-primary-600/25 transform hover:-translate-y-1 transition-transform">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
          <Rocket className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-2">Start Free Trial</h3>
        <p className="text-primary-100 mb-6">
          14 days free, no credit card required
        </p>
        <button className="w-full bg-white text-primary-600 font-semibold py-3 rounded-lg hover:bg-primary-50 transition-colors">
          Get Started Free
        </button>
      </div>
      
      {/* Secondary CTA - Less prominent */}
      <div className="bg-white rounded-2xl p-8 border-2 border-neutral-200 hover:border-primary-200 transition-colors">
        <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
          <Calendar className="w-6 h-6 text-neutral-600" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">Book a Demo</h3>
        <p className="text-neutral-600 mb-6">
          See the platform in action with our team
        </p>
        <button className="w-full bg-neutral-900 text-white font-semibold py-3 rounded-lg hover:bg-neutral-800 transition-colors">
          Schedule Demo
        </button>
      </div>
    </div>
  </Section>
);
```

**Success Criteria:**
- [ ] Primary CTA immediately draws attention
- [ ] Clear visual difference between options
- [ ] Both CTAs are accessible and clickable

---

### Phase 4: Polish & Refinement
**Timeline:** Day 7-8  
**Goal:** Final polish for production readiness

#### Task 4.1 🟢 Replace Placeholder Logos with Industry Icons
**File:** `src/components/home/TrustSection.tsx` (or LogoCloud component)  
**Effort:** M  
**Assigned:** Frontend Developer + Designer

- [ ] Identify appropriate industry/company icons
- [ ] Create consistent styling for logo display
- [ ] Add subtle hover effect

**Code Structure:**
```tsx
import { Building2, Briefcase, Globe, Shield, Cpu, Landmark } from 'lucide-react';

const industryLogos = [
  { icon: Building2, name: 'Enterprise Corp' },
  { icon: Briefcase, name: 'Business Inc' },
  { icon: Globe, name: 'Global Solutions' },
  { icon: Shield, name: 'SecureTech' },
  { icon: Cpu, name: 'TechForward' },
  { icon: Landmark, name: 'Finance Pro' },
];

const LogoCloud = () => (
  <div className="py-12 border-y border-neutral-100">
    <p className="text-center text-sm text-neutral-500 mb-8">
      Trusted by industry leaders
    </p>
    <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
      {industryLogos.map((logo) => (
        <div 
          key={logo.name}
          className="flex items-center gap-2 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <logo.icon className="w-8 h-8" />
          <span className="font-medium text-sm hidden sm:block">{logo.name}</span>
        </div>
      ))}
    </div>
  </div>
);
```

**Success Criteria:**
- [ ] No placeholder "logo.png" images visible
- [ ] Icons represent diverse industries
- [ ] Consistent sizing and spacing

---

#### Task 4.2 🟢 Reduce Hero Description Line Height
**File:** `src/components/home/HeroSection.tsx`  
**Effort:** S  
**Assigned:** Frontend Developer

- [ ] Adjust line-height for better readability
- [ ] Ensure comfortable reading width

**Code Update:**
```tsx
<p className="text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed lg:leading-normal">
  {/* leading-relaxed (1.625) on mobile, leading-normal (1.5) on desktop */}
  Transform your workflow with AI-powered automation. 
  Save hours every week and focus on what matters most.
</p>
```

**Success Criteria:**
- [ ] Text doesn't feel overly spaced
- [ ] Still comfortable to read on mobile
- [ ] Matches overall typography rhythm

---

#### Task 4.3 🟢 Add Display Font Weight for Headlines
**File:** `src/index.css` + component files  
**Effort:** S  
**Assigned:** Frontend Developer

- [ ] Use heavier font weights for main headlines
- [ ] Consider adding display font for impact

**Tailwind Config Addition:**
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        display: '800', // Extra bold for headlines
      }
    }
  }
}
```

**Usage:**
```tsx
// Hero headline
<h1 className="text-4xl lg:text-6xl font-extrabold lg:font-black text-neutral-900 tracking-tight">
  Build Something Amazing
</h1>

// Section headlines
<h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
  Features You'll Love
</h2>
```

**Success Criteria:**
- [ ] Headlines feel impactful and hierarchy is clear
- [ ] Font weights consistent across sections
- [ ] Works well with body text contrast

---

#### Task 4.4 🟢 Simplify Card Hover Animations
**File:** Multiple component files  
**Effort:** S  
**Assigned:** Frontend Developer

**Files to Review:**
- [ ] `src/components/home/FeaturesSection.tsx`
- [ ] `src/components/home/AgentCards.tsx`
- [ ] `src/components/ui/Card.tsx`

**Simplified Hover Pattern:**
```tsx
// Consistent card hover - subtle and performant
const Card = ({ children, className }: CardProps) => (
  <div 
    className={cn(
      "bg-white rounded-xl p-6 border border-neutral-100",
      "transition-all duration-200 ease-out",
      // Subtle hover: shadow + slight border color
      "hover:shadow-lg hover:shadow-neutral-900/5",
      "hover:border-neutral-200",
      className
    )}
  >
    {children}
  </div>
);
```

**Remove complex animations like:**
```tsx
// ❌ Avoid
"hover:scale-105 hover:-rotate-1 hover:shadow-2xl"

// ✅ Prefer
"hover:shadow-lg hover:border-neutral-200"
```

**Success Criteria:**
- [ ] Card hovers feel subtle and professional
- [ ] No jarring or distracting animations
- [ ] Consistent hover behavior across all cards

---

#### Task 4.5 🟢 Add Mobile Connection Lines to Workflow Steps
**File:** `src/components/home/WorkflowSection.tsx` (or HowItWorks)  
**Effort:** M  
**Assigned:** Frontend Developer

- [ ] Add vertical connecting lines for mobile
- [ ] Maintain horizontal lines for desktop

**Code Update:**
```tsx
const WorkflowSection = () => {
  const steps = [
    { number: 1, title: 'Connect', description: 'Link your tools' },
    { number: 2, title: 'Configure', description: 'Set your preferences' },
    { number: 3, title: 'Automate', description: 'Let AI do the work' },
  ];

  return (
    <Section>
      <div className="relative">
        {/* Desktop horizontal line */}
        <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />
        
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index)