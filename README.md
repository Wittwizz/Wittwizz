# Wittwizz Digital - Landing Page v1

## 🚀 Live Site
**Production URL**: https://wittwizz.github.io/Wittwizz/

## 📋 Project Overview
Wittwizz Digital is an AI-powered brand, web, and growth partner for India's startups. This landing page showcases our services, packages, and sector expertise with a focus on founder-friendly, efficient delivery.

## 🏗️ Project Structure
```
wittwizz/
├── index.html          # Main landing page (675 lines)
├── styles.css          # Responsive styling (937 lines)
├── assets/             # Images and visual assets
├── content/            # Content matrix and specifications
├── docs/               # Documentation and guides
├── releases/           # Release notes and version history
├── scripts/            # Utility scripts and tools
└── reports/            # Performance and analytics reports
```

## 🎯 Features Implemented

### Core Sections
1. **Hero Section** - Main headline and call-to-actions
2. **Stats Bar** - Performance metrics and guarantees
3. **Services** - 4 core service offerings with pricing
4. **Packages** - 3 pricing tiers (Startup Launch, Growth Sprint, Scale Ready)
5. **Differentiators** - Key value propositions
6. **Sectors** - Industry-specific solutions (D2C, SaaS, Fintech, Healthtech)
7. **Case Studies** - Success stories and results
8. **FAQs** - Common questions and answers
9. **Lead Form** - 9-field contact form for lead generation
10. **Footer** - Company information and legal links

### Technical Features
- **Responsive Design** - Mobile-first approach
- **Accessibility** - ARIA labels, keyboard navigation
- **Performance** - Optimized CSS, minimal JavaScript
- **SEO** - Meta tags, structured data, semantic HTML
- **Analytics** - Event tracking for user interactions
- **Deep Linking** - Shareable calculator configurations with URL state

### Deep Linking System
The calculator supports deep linking to share specific configurations:

#### New Schema (Recommended)
- **Quick Mode**: `?mode=quick&pick=starter`
- **Advanced Mode**: `?mode=advanced&pick=brand_kit,web_site,social_media`

#### Legacy Schema (Backward Compatible)
- **Preset Only**: `?pick=starter` (automatically sets Quick mode)

#### Features
- URLs automatically sync with calculator state
- Browser back/forward navigation preserves state
- Copy link button generates shareable URLs
- Automatic mode detection based on selections

## 🚀 Deployment

### Current Deployment
- **Host**: GitHub Pages
- **Branch**: `lp-v1`
- **URL**: https://wittwizz.github.io/Wittwizz/
- **Status**: ✅ Live and accessible

### How to Redeploy

#### For Updates to Existing Site
1. **Make Changes**: Edit HTML, CSS, or assets
2. **Commit Changes**: 
   ```bash
   git add .
   git commit -m "description of changes"
   ```
3. **Push to Branch**: 
   ```bash
   git push origin lp-v1
   ```
4. **Auto-Deploy**: GitHub Pages automatically deploys from `lp-v1` branch

#### For New Releases
1. **Create New Branch**: 
   ```bash
   git checkout -b lp-v2
   ```
2. **Make Changes**: Implement new features/fixes
3. **Test Locally**: Verify functionality
4. **Push Branch**: 
   ```bash
   git push origin lp-v2
   ```
5. **Update Pages Source**: Change GitHub Pages source to new branch in repository settings
6. **Update Release Notes**: Create new release document in `/releases/`

#### Rollback Procedure
1. **Identify Bad Commit**: Find problematic commit hash
2. **Revert Branch**: 
   ```bash
   git revert <commit-hash>
   ```
3. **Push Changes**: 
   ```bash
   git push origin lp-v1
   ```
4. **Verify Rollback**: Check deployed site functionality

## 🛠️ Local Development

### Prerequisites
- Git
- Web browser
- Text editor

### Setup
1. **Clone Repository**: 
   ```bash
   git clone https://github.com/Wittwizz/Wittwizz.git
   cd Wittwizz
   ```
2. **Switch to Branch**: 
   ```bash
   git checkout lp-v1
   ```
3. **Open in Browser**: Open `index.html` in your web browser

### Development Workflow
1. **Make Changes**: Edit files as needed
2. **Test Locally**: Open in browser to verify changes
3. **Commit Changes**: Follow deployment steps above
4. **Push Updates**: Deploy to GitHub Pages

## 📊 Quality Assurance

### Performance Targets
- **Lighthouse Performance**: 90+/100
- **Lighthouse Accessibility**: 95+/100
- **Cumulative Layout Shift**: < 0.1
- **Largest Contentful Paint**: < 2.5s

### Browser Support
- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS/Android)

## 🔧 Configuration

### GitHub Pages Settings
- **Source**: Deploy from a branch
- **Branch**: `lp-v1`
- **Folder**: `/ (root)`
- **Custom Domain**: None (using default)

### Environment Variables
No environment variables required for static deployment.

## 📝 Content Management

### Updating Content
1. **Edit HTML**: Modify content directly in `index.html`
2. **Update Assets**: Replace images in `assets/` directory
3. **Modify Styling**: Update `styles.css` for design changes
4. **Deploy Changes**: Follow redeployment steps above

### Content Sources
- **Services**: Defined in `content/website/content-matrix.json`
- **Pricing**: Hardcoded in HTML (update manually)
- **Images**: Placeholder images in `assets/` (replace with actual)

## 🚨 Known Issues

### Current Limitations
1. **Placeholder Images**: All images are basic text placeholders
   - **Impact**: Visual appearance not production-ready
   - **Priority**: Medium - Replace before public launch

2. **Form Backend**: Contact form submits to console only
   - **Impact**: No actual lead capture
   - **Priority**: High - Implement backend before launch

3. **Analytics**: Events logged to console only
   - **Impact**: No actual analytics data collection
   - **Priority**: Medium - Wire to analytics provider

## 📞 Support

### Technical Issues
- **Repository**: https://github.com/Wittwizz/Wittwizz
- **Issues**: Create GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions

### Business Inquiries
- **Email**: hello@wittwizz.com
- **Website**: https://wittwizz.github.io/Wittwizz/

## 📄 License

This project is proprietary to Wittwizz Digital. All rights reserved.

---

**Last Updated**: 2025-08-11  
**Version**: v1.0.0  
**Release Engineer**: Himanshu  
**Status**: ✅ Deployed and Live
