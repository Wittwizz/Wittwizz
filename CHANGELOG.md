# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Deep link schema for calculator with backward compatibility
- New URL format: `?mode=quick&pick=starter` or `?mode=advanced&pick=brand_kit,web_site`
- Legacy URL format still supported: `?pick=starter`
- Calculator automatically detects preset vs individual items
- URL synchronization with calculator state
- Shareable URL generation with copy functionality
- Browser back/forward navigation preserves calculator state

### Changed
- Calculator now supports both Quick and Advanced modes
- Preset selection automatically switches to Quick mode
- Individual item selection can work in both modes
- URL updates in real-time as calculator state changes

### Technical
- React-based calculator component with TypeScript
- Tailwind CSS styling with dark mode support
- Responsive design for mobile and desktop
- Accessibility improvements with ARIA labels

## [1.0.0] - 2025-01-XX

### Added
- Initial landing page with hero section
- Features showcase section
- Pricing calculator with deep linking
- Call-to-action section
- Responsive design system
- Dark mode support
