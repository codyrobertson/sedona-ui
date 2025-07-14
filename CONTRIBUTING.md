# Contributing to Sedona UI

We love your input! We want to make contributing to Sedona UI as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/sedona-ui.git
cd sedona-ui

# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## Component Development Guidelines

### 1. Follow the Component Pattern

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  // Base styles using theme variables
  "base-classes",
  {
    variants: {
      variant: {
        default: "theme-aware-classes",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(componentVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component, componentVariants }
```

### 2. Theme Responsiveness

- **Always use theme variables** instead of hardcoded colors
- **Test in both light and dark modes**
- Use semantic color tokens: `bg-background`, `text-foreground`, `border-border`
- For Zeus-specific features, use: `bg-muted dark:bg-zeus-surface-neutral`

### 3. TypeScript

- All components must be fully typed
- Use proper `forwardRef` patterns
- Export both component and prop interfaces
- Use `VariantProps` for variant-based props

### 4. Accessibility

- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper focus management

### 5. Testing

```bash
# Add tests for new components
npm run test

# Test across different viewports
npm run test:responsive

# Accessibility testing
npm run test:a11y
```

## Styling Guidelines

### Use Tailwind Classes

```tsx
// ✅ Good
className="bg-background text-foreground border border-border"

// ❌ Bad - hardcoded colors
className="bg-white text-black border-gray-200"

// ❌ Bad - Zeus colors without theme awareness
className="bg-zeus-surface-default text-zeus-text-primary"

// ✅ Good - Zeus colors with theme awareness
className="bg-muted dark:bg-zeus-surface-default text-foreground dark:text-zeus-text-primary"
```

### Responsive Design

```tsx
// Mobile-first approach
className="text-sm md:text-base lg:text-lg"

// Consistent spacing
className="p-4 md:p-6 lg:p-8"
```

## Design System Guidelines

### Zeus Color System

- Use Zeus colors for dark theme enhancements
- Always provide light mode alternatives
- Follow the semantic naming convention

### Typography

- Use the defined type scale: `text-caption-s`, `text-caption-m`, `text-caption-l`, `text-body-s`, `text-body-m`
- Use `font-sans` for UI text and `font-mono` for code/data

### Spacing

- Use the defined spacing scale: `p-1` (4px), `p-2` (8px), `p-3` (12px), etc.
- Maintain consistent spacing ratios

## Issue Reporting

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/sedona-ui/issues).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests

We love feature requests! Before submitting:

1. Check if the feature already exists
2. Check if someone else has requested it
3. Provide detailed use cases
4. Consider how it fits with the design system

## Code Review Process

The core team looks at Pull Requests on a regular basis. After feedback has been given we expect responses within two weeks. After two weeks we may close the pull request if it isn't showing any activity.

## Community

Stay connected with the Sedona UI community:

- 💬 [Discord Server](https://discord.gg/sedona-ui)
- 🐦 [Twitter](https://twitter.com/sedona-ui)
- 📧 [Email](mailto:team@sedona-ui.dev)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.