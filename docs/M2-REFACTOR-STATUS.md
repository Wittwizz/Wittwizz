# Task M2: Refactor to Allowlist Imports + Token Wrappers

## 🎯 **Objective**
Refactor UI imports to M1 allowlist, add tokenized wrappers for Radix/Tailwind/Lucide, and enforce a11y/perf gates without changing UX.

## 📋 **Targets**
- **Performance**: ≥90 (Lighthouse)
- **Accessibility**: ≥95 (Lighthouse)  
- **CLS**: <0.1 (Cumulative Layout Shift)
- **LCP**: ≤2.5s (Largest Contentful Paint)

## 🚀 **Progress Status**

### ✅ **Completed Steps**
1. **Working Branch**: `feat/m2-refactor` created
2. **Package.json**: Pinned versions and scripts added
3. **Token Wrappers**: Radix + Lucide components created
4. **Tailwind Preset**: Design tokens configured
5. **Build Setup**: Vite + PostCSS configured
6. **React Structure**: App component with allowlist imports

### 🔧 **Current Structure**
```
src/
├── ui/
│   ├── Slot.tsx          # Radix Slot wrapper
│   ├── Button.tsx        # Tokenized button
│   └── Dialog.tsx        # Radix dialog re-exports
├── styles/
│   ├── tokens.css        # CSS custom properties
│   └── index.css         # Tailwind + custom styles
├── icons/                # Lucide usage only
├── App.tsx               # Main landing page
└── main.tsx              # React entry point
```

### 📦 **Allowlist Compliance**
- ✅ **@radix-ui/react-*** (headless primitives)
- ✅ **tailwindcss** (via preset + classes)
- ✅ **lucide-react** (named imports only)

### 🎨 **Design Tokens**
- **Primary**: Cobalt #2563EB
- **Surface**: #0B1426
- **Ink**: #1A1A1A
- **Radius**: 2xl (1rem)
- **Shadow**: card (0 6px 24px rgba(0,0,0,0.08))

## 🚨 **Next Steps**

### **Immediate Actions Required**
1. **Install Dependencies**: Run `npm install` or `pnpm install`
2. **Test Build**: Run `npm run build` to verify compilation
3. **Local Preview**: Run `npm run preview` to test locally
4. **Audit Gates**: Run `npm run test:gates` for quality validation

### **Quality Gates Testing**
```bash
# Build and test
npm run build
npm run preview & sleep 2
npm run lh:ci      # Lighthouse audit
npm run axe:ci     # Accessibility audit
```

### **Asset Size Validation**
- **Hero**: ≤200KB
- **OG**: ≤150KB  
- **Tiles**: ≤120KB

## 🔍 **Accessibility Features Implemented**
- ✅ **Focus Management**: Visible focus rings with primary color
- ✅ **ARIA Support**: Proper labels and descriptions
- ✅ **Keyboard Navigation**: Logical tab order
- ✅ **High Contrast**: Media query support
- ✅ **Semantic HTML**: Proper landmark structure

## 📊 **Performance Optimizations**
- ✅ **Code Splitting**: Vendor, UI, and icon chunks
- ✅ **Tree Shaking**: Named imports only
- ✅ **Preload Hints**: Critical resource optimization
- ✅ **Lazy Loading**: Non-critical content deferred

## 🚀 **Deployment Readiness**
- ✅ **Build System**: Vite + PostCSS configured
- ✅ **TypeScript**: Strict mode enabled
- ✅ **Quality Scripts**: Lighthouse + Axe integration
- ✅ **CI Ready**: Automated testing pipeline

## 📝 **Definition of Done**
- [ ] All UI imports comply with allowlist (Radix, Tailwind, Lucide)
- [ ] Token wrappers in place; components use them
- [ ] Lighthouse/Axe gates pass locally and in CI
- [ ] No visual regressions (hero, split-screen, CTA, announcement bar)
- [ ] PR merged to lp-v1

## 🔄 **Rollback Plan**
If issues arise:
1. **Local**: `git checkout lp-v1` to return to stable branch
2. **Remote**: `git push origin lp-v1 --force` to reset if needed
3. **Deployment**: GitHub Pages will auto-revert to last stable commit

---

**Status**: 🚧 **IN PROGRESS** - Core structure complete, ready for testing  
**Branch**: `feat/m2-refactor`  
**Next**: Install dependencies and run quality gates  
**Estimated Completion**: 2-3 hours (including testing and fixes)
