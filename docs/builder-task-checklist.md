# Builder Task Checklist - Landing Page v1

## 🎯 Task Objective
Build a fast, single-page landing site for Wittwizz Digital using the Website Content Matrix v1.0. Implement sections, copy slots, SEO defaults, analytics events, and acceptance gates.

## 📋 Pre-Implementation Checklist

### ✅ Content & Configuration (COMPLETED)
- [x] Content matrix with all copy slots and CTAs
- [x] QA acceptance gates defined
- [x] Privacy and compliance documentation
- [x] Alt-text manifest for images
- [x] Project structure and directories

### 🔄 Technical Setup (PENDING)
- [ ] Choose frontend framework (React, Vue, or vanilla HTML/CSS/JS)
- [ ] Set up development environment
- [ ] Configure build tools and bundlers
- [ ] Set up local development server

## 🏗️ Implementation Tasks

### 1. Project Foundation
- [ ] Initialize frontend project
- [ ] Set up routing (single-page with anchor links)
- [ ] Configure CSS framework or design system
- [ ] Set up responsive grid system

### 2. Section Implementation (in order from content-matrix.json)
- [ ] **Hero Section**
  - [ ] Main headline: "Build more. Spend less. Grow faster."
  - [ ] Subtitle: "AI-powered brand, web, and growth sprints for India's startups."
  - [ ] Primary CTA: "Plan my 30-day Launch Sprint"
  - [ ] Secondary CTA: "See pricing"
  - [ ] Support badge: "Founder-speed delivery"

- [ ] **Statbar Section**
  - [ ] First draft in: 72h
  - [ ] Alt-text coverage: 95%+
  - [ ] Lighthouse: 90+/95+

- [ ] **Services Section** (4 services)
  - [ ] Branding & Identity (₹60,000)
  - [ ] Web & CRO (₹50,000)
  - [ ] Social & Content (₹35,000/mo)
  - [ ] Growth & GTM (₹45,000/mo)

- [ ] **Packages Section** (3 tiers)
  - [ ] Startup Launch (₹1.5L, 30 days)
  - [ ] Growth Sprint (₹3.0L, 30-45 days)
  - [ ] Scale Ready (₹6.0L, 45-60 days)

- [ ] **Differentiators Section** (3 pillars)
  - [ ] Automation-first
  - [ ] Founder-speed
  - [ ] Clarity & reporting

- [ ] **Sectors Section** (4 tabs)
  - [ ] D2C (Rising CAC, low LP CVR)
  - [ ] SaaS (Pipeline drought)
  - [ ] Fintech (Trust/compliance signals)
  - [ ] Healthtech (Complex journeys)

- [ ] **Cases Section** (3 case studies)
  - [ ] LP CVR +38% in 21 days
  - [ ] 0→30 leads/mo in 60 days
  - [ ] Brand shipped in 10 days

- [ ] **FAQs Section** (4 questions)
  - [ ] First draft revisions
  - [ ] Ad spend management
  - [ ] AI usage policy
  - [ ] Cancellation terms

- [ ] **Lead Form Section**
  - [ ] 9 form fields (name, email, company, role, stage, goal, timeline, budget_band, referral)
  - [ ] Budget band options
  - [ ] Submit button: "Get my plan"
  - [ ] Privacy note

- [ ] **Footer Section**
  - [ ] Company blurb
  - [ ] Address: Gurugram, Haryana, India
  - [ ] Email: hello@wittwizz.com
  - [ ] Legal: © 2025 Wittwizz Digital — Terms • Privacy

### 3. Technical Features
- [ ] **SEO Implementation**
  - [ ] Meta tags and Open Graph
  - [ ] Structured data (WebSite, Organization)
  - [ ] Sitemap generation
  - [ ] Robots.txt

- [ ] **Analytics Events** (wire these events)
  - [ ] `evt_lead_submit` - form submit success
  - [ ] `evt_cta_click` - hero CTA click
  - [ ] `evt_section_view` - packages/services visible
  - [ ] `evt_faq_open` - FAQ expand

- [ ] **Performance Optimization**
  - [ ] Image optimization and lazy loading
  - [ ] CSS/JS minification
  - [ ] Critical CSS inlining
  - [ ] Service worker (optional)

- [ ] **Accessibility**
  - [ ] Keyboard navigation
  - [ ] Screen reader support
  - [ ] Color contrast compliance
  - [ ] Focus management

### 4. Visual Design
- [ ] **Brand Identity**
  - [ ] Color palette (primary, secondary, accent)
  - [ ] Typography system
  - [ ] Icon set
  - [ ] Visual hierarchy

- [ ] **Responsive Design**
  - [ ] Mobile-first approach
  - [ ] Tablet breakpoint
  - [ ] Desktop optimization
  - [ ] Touch-friendly interactions

- [ ] **Interactive Elements**
  - [ ] Smooth scrolling to sections
  - [ ] Tab switching for sectors
  - [ ] Form validation and feedback
  - [ ] Loading states

## 🧪 Testing & Quality Assurance

### Automated Testing
- [ ] Run Lighthouse audit
- [ ] Verify performance scores (90+/100)
- [ ] Verify accessibility scores (95+/100)
- [ ] Check CLS (< 0.1) and LCP (< 2.5s)

### Manual Testing
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Form submission flow
- [ ] Navigation and user experience

### Content Review
- [ ] Verify all copy matches content-matrix.json
- [ ] Check reading grade level (≤ 8)
- [ ] Remove banned words (revolutionary, disrupt, world-class)
- [ ] Verify no unsourced claims

## 🚀 Deployment & Launch

### Pre-Launch
- [ ] Final Lighthouse audit
- [ ] Performance testing
- [ ] Content review and approval
- [ ] Legal review (privacy, terms)

### Launch
- [ ] Deploy to production
- [ ] Verify all functionality
- [ ] Monitor analytics
- [ ] Collect user feedback

### Post-Launch
- [ ] Performance monitoring
- [ ] User behavior analysis
- [ ] A/B testing setup
- [ ] Conversion optimization

## 📊 Success Metrics

### Technical Performance
- Lighthouse Performance: 90+/100
- Lighthouse Accessibility: 95+/100
- Page load time: < 3 seconds
- Mobile usability: 100%

### Business Metrics
- Lead form completion rate
- CTA click-through rates
- Page engagement time
- Mobile vs desktop conversion

## 🔧 Tools & Resources

### Recommended Stack
- **Frontend**: React/Vue or vanilla HTML/CSS/JS
- **Styling**: Tailwind CSS, CSS Modules, or styled-components
- **Build Tool**: Vite, Webpack, or Parcel
- **Analytics**: Privacy-first analytics (Plausible, Fathom, or Google Analytics with consent)
- **Forms**: Netlify Forms, Formspree, or custom backend
- **Hosting**: Netlify, Vercel, or GitHub Pages

### Design Resources
- **Icons**: Heroicons, Feather Icons, or custom SVG
- **Images**: Placeholder images initially, replace with actual assets
- **Fonts**: Google Fonts or system fonts for performance

## 📝 Notes for Implementation

### Content Guidelines
- Keep copy clear and jargon-free
- Focus on outcomes, not features
- Use Indian pricing (₹) and context
- Maintain founder-friendly tone

### Technical Guidelines
- Mobile-first responsive design
- Progressive enhancement
- Accessibility by default
- Performance optimization from start

### Brand Guidelines
- Professional but approachable
- Efficiency and clarity focus
- Startup-friendly positioning
- Indian market understanding

## ✅ Acceptance Criteria

- [ ] All sections rendered in correct order
- [ ] All copy fields populated from content-matrix.json
- [ ] Analytics events wired per specification
- [ ] Lighthouse scores meet acceptance gates
- [ ] Responsive design across all devices
- [ ] Form submission working correctly
- [ ] SEO elements properly implemented
- [ ] Accessibility requirements met

---

**Estimated Timeline**: 2-3 weeks for complete implementation
**Priority**: High - This is the core deliverable for Task 1
**Dependencies**: Content matrix and acceptance gates (COMPLETED)
**Next Phase**: Analytics implementation and optimization (Task 3)
