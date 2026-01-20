# Plan 1: Traditional Version Improvements

## Overview
Fix critical issues with the Traditional version to make it fully functional as a proper multi-page marketing website.

## Current Issues Identified

### CRITICAL: No Route Configuration
The App.tsx currently has no routes defined. All Link components lead nowhere.

### Broken Links (13 total)
| Route | Page Exists | Status |
|-------|-------------|--------|
| `/` | Home.tsx | Broken - no route |
| `/demo` | Demo.tsx | Broken - no route |
| `/roi` | ROI.tsx | Broken - no route |
| `/platform` | Platform.tsx | Broken - no route |
| `/agents` | Agents.tsx | Broken - no route |
| `/governance` | Governance.tsx | Broken - no route |
| `/resources` | Resources.tsx | Broken - no route |
| `/agents/:slug` | AgentDetail.tsx | Broken - no route |
| `/privacy` | None | Missing page |

### Missing Components
1. **Navigation Header** - Not included in version-toggled App
2. **Footer** - Not included in version-toggled App
3. **Layout wrapper** - Exists but not being used

---

## Implementation Plan

### Phase 1: Fix Routing Architecture

**Task 1.1: Update App.tsx with full routing for Traditional mode**
- Add Routes and Route components from react-router-dom
- When version === 'traditional', render full Layout with Router
- Keep Modern version as current single-page experience
- Add all page routes: /, /demo, /roi, /platform, /agents, /governance, /resources
- Add dynamic route for /agents/:agentSlug

**Task 1.2: Create Privacy Policy page**
- Create /pages/Privacy.tsx
- Add route for /privacy
- Basic legal content placeholder

### Phase 2: Integrate Navigation

**Task 2.1: Update Traditional version to include Layout**
- Wrap TraditionalVersion in Layout component (which includes Header/Footer)
- Update Layout to work with version context
- Ensure mobile menu works correctly

**Task 2.2: Style Header for Traditional theme**
- Ensure Header styling matches traditional light theme
- Verify all navigation links work
- Test mobile menu functionality

### Phase 3: Testing & Polish

**Task 3.1: Full link verification**
- Test every navigation link
- Test every CTA button
- Test agent detail pages (/agents/pricing, /agents/inventory, etc.)
- Verify 404 page works for unknown routes

**Task 3.2: Page transition polish**
- Ensure smooth transitions between pages
- Verify scroll-to-top on navigation
- Test back/forward browser buttons

---

## Files to Modify

1. `/frontend/src/App.tsx` - Major rewrite for routing
2. `/frontend/src/components/layout/Layout.tsx` - Minor updates
3. `/frontend/src/pages/Privacy.tsx` - New file

## Files to Reference

1. `/frontend/src/components/layout/Header.tsx` - Navigation structure
2. `/frontend/src/components/layout/Footer.tsx` - Footer links
3. `/frontend/src/pages/*.tsx` - All existing pages

---

## Success Criteria

- [ ] All 8 main routes work (/,/demo,/roi,/platform,/agents,/governance,/resources,/privacy)
- [ ] All 6 agent detail routes work (/agents/pricing, etc.)
- [ ] Navigation header displays on all Traditional pages
- [ ] Footer displays on all Traditional pages
- [ ] Mobile menu works correctly
- [ ] 404 page displays for unknown routes
- [ ] Browser back/forward works correctly
- [ ] No console errors on any page

---

## Estimated Components

- Routes: 15 (8 main + 6 agent detail + 1 catch-all)
- Pages to verify: 9 existing + 1 new (Privacy)
- Navigation links to fix: ~25

## Completion Promise
`BUILD_COMPLETE - Traditional Routing v1.0`
