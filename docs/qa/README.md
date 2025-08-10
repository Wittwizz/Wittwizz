# Quality Assurance

This directory contains quality gates and testing specifications for the Wittwizz Digital landing page.

## Files
- `acceptance-gates.json` - Non-negotiable quality thresholds
- `README.md` - This file

## Quality Gates

### Performance
- **Lighthouse Performance**: Minimum 90/100
- **Lighthouse Accessibility**: Minimum 95/100
- **Cumulative Layout Shift (CLS)**: Maximum 0.1
- **Largest Contentful Paint (LCP)**: Maximum 2.5 seconds

### Accessibility
- **Alt-text Coverage**: Minimum 95%
- **Keyboard Navigation**: Required for all interactive elements

### SEO
- **Structured Data**: WebSite and Organization schemas
- **Sitemap**: Must be present
- **Broken Links**: None allowed

### Content
- **Reading Grade**: Maximum 8th grade level
- **Banned Words**: No "revolutionary", "disrupt", "world-class"
- **Claims**: Must have sources if making specific claims

## Testing Process
1. Automated Lighthouse audits
2. Manual accessibility review
3. Content quality check
4. SEO validation
5. Performance testing

## Status
- ✅ Quality gates defined
- 🔄 Testing implementation pending
- 🔄 CI/CD setup pending
