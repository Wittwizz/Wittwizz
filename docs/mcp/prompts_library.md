# Wittwizz MCP Prompts Library

**Project:** Wittwizz — MCP Enablement & Allowlist (Task M1)  
**Last Updated:** 2025-08-11T02:15:00Z  
**Status:** Fallback Implementation (MCP endpoints unavailable)

## Overview

This library contains plain-English prompts for fetching and inserting UI components using Wittwizz's design tokens. Since the MCP endpoints are currently unavailable, these prompts are designed for use with direct component library imports.

## Component Prompts

### Button Component

**Prompt:** "Add a primary button with label 'Plan my 30-day Launch Sprint'"

**Expected Result:** A styled button component that:
- Uses Wittwizz's `--color-accent` token for the primary color
- Applies Wittwizz's `--radius` token for border radius
- Includes proper focus ring for accessibility
- Maintains AA contrast ratio
- Is positioned appropriately in the hero section

**Implementation Notes:**
- Import from `@shadcn/ui` button component
- Apply custom CSS variables for theming
- Ensure proper ARIA labeling

### Accordion Component

**Prompt:** "Insert FAQ accordion with our FAQ items"

**Expected Result:** An accessible accordion component that:
- Uses Wittwizz's `--radius` token for rounded corners
- Implements proper ARIA controls and keyboard navigation
- Contains FAQ items relevant to Wittwizz's services
- Maintains consistent spacing using Wittwizz tokens

**Implementation Notes:**
- Import from `@shadcn/ui` accordion component
- Structure FAQ content with proper headings
- Test keyboard navigation (Tab, Enter, Space, Arrow keys)

### Tabs Component

**Prompt:** "Add sectors tabs: D2C, SaaS, Fintech, Healthtech"

**Expected Result:** A tabbed interface that:
- Uses Wittwizz's `--color-accent` token for active tab styling
- Implements proper `role="tablist"` and tab navigation
- Supports arrow key navigation between tabs
- Displays sector-specific content for each tab

**Implementation Notes:**
- Import from `@radix-ui/react-tabs`
- Apply custom styling using Wittwizz color tokens
- Ensure proper focus management and keyboard support

### Dialog Component

**Prompt:** "Create lead-capture dialog for calculator"

**Expected Result:** A modal dialog that:
- Uses Wittwizz's `--color-surface` token for background
- Applies Wittwizz's `--radius` token for rounded corners
- Implements proper `aria-modal` and focus trapping
- Contains a lead capture form with calculator functionality

**Implementation Notes:**
- Import from `@radix-ui/react-dialog`
- Implement focus trap for accessibility
- Ensure Escape key closes the dialog
- Apply Wittwizz spacing tokens for consistent layout

### Icons Component

**Prompt:** "Use 'check' and 'arrow-right' icons in packages"

**Expected Result:** Icon components that:
- Are properly sized and colored for their context
- Include `decorative="true"` unless they convey meaning
- Use appropriate colors from Wittwizz's design system
- Are positioned correctly within package sections

**Implementation Notes:**
- Import from `lucide-react` library
- Apply consistent sizing and coloring
- Ensure proper accessibility attributes
- Use semantic colors for better UX

### Badge Component

**Prompt:** "Add small badge 'Founder-speed delivery' in hero"

**Expected Result:** A badge component that:
- Uses Wittwizz's `--color-accent-dark` token for styling
- Displays the text "Founder-speed delivery"
- Is positioned prominently in the hero section
- Maintains AA contrast for accessibility

**Implementation Notes:**
- Import from `flowbite-react` library
- Apply custom color using Wittwizz tokens
- Ensure proper contrast ratio
- Position for maximum visibility

## Usage Guidelines

### 1. Token Application
- Always apply Wittwizz's design tokens when styling components
- Use CSS custom properties for consistent theming
- Maintain the established color palette and spacing system

### 2. Accessibility Compliance
- Test all components with keyboard navigation
- Verify ARIA attributes are properly implemented
- Ensure contrast ratios meet AA standards
- Test with screen readers when possible

### 3. Responsive Design
- Ensure components work across different screen sizes
- Test on mobile, tablet, and desktop devices
- Maintain usability across all breakpoints

### 4. Performance Considerations
- Lazy load components when appropriate
- Optimize bundle size by importing only needed components
- Monitor performance metrics after implementation

## Fallback Implementation

Since MCP endpoints are unavailable, use these alternative approaches:

1. **Direct Library Imports:** Import components directly from their respective libraries
2. **Custom Wrappers:** Create wrapper components that apply Wittwizz tokens
3. **CSS Customization:** Use CSS custom properties to override default styling
4. **Component Composition:** Build complex components from simpler primitives

## Testing Checklist

After implementing each component:

- [ ] Component renders correctly with Wittwizz tokens
- [ ] Accessibility features work as expected
- [ ] Keyboard navigation functions properly
- [ ] Contrast ratios meet AA standards
- [ ] Component is responsive across devices
- [ ] Performance impact is minimal

## Future Integration

When MCP endpoints become available:

1. **Update Prompts:** Modify prompts to use MCP fetch commands
2. **Test Connectivity:** Verify all endpoints are reachable
3. **Validate Components:** Ensure fetched components meet quality standards
4. **Update Documentation:** Reflect new MCP-based workflow

## Support and Maintenance

- Monitor component library updates for breaking changes
- Test components after major dependency updates
- Maintain accessibility compliance across all implementations
- Document any customizations or workarounds
