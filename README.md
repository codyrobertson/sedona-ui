# Sedona UI Kit

A production-ready UI component library built with **Next.js 14**, **Tailwind CSS**, **shadcn/ui**, and the **Zeus design system**. Optimized for AI agent trading platforms with comprehensive theming support.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Complete Zeus Design System** integration with 100+ design tokens
- 🌗 **Full Light/Dark Theme Support** with automatic persistence
- 📱 **Fully Responsive** components with mobile-first design
- ♿ **Accessible** - Built with Radix UI primitives following ARIA standards
- 🔧 **TypeScript** - Full type safety with comprehensive interfaces
- 🚀 **Performance Optimized** - Tree-shakeable components
- 📊 **Trading-Specific Components** - Badges, status indicators, data visualization
- 🎭 **Chat System** - Complete AI agent chat interface
- 📈 **Data Tables** - Advanced table rows with dot matrix visualizations

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sedona-ui.git
cd sedona-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage

```tsx
import { Button, Badge, ThemeToggle } from "@/components/ui"

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      <Button variant="brand">Get Started</Button>
      <Badge variant="success">SAFE</Badge>
    </div>
  )
}
```

## 📦 Components

### Core UI Components
- **Button** - Multiple variants including brand, status, and trading-specific styles
- **Badge** - Status indicators with Zeus color integration
- **Input/Textarea** - Form inputs with proper theme support
- **Select** - Dropdown selections with custom styling
- **Card** - Flexible content containers
- **Navigation** - Responsive navigation with wallet connection
- **Search** - Search input with focus states

### Trading-Specific Components
- **TableRow** - Advanced data rows with avatars, rankings, and visualizations
- **DotMatrixGrid** - Customizable data visualization with multiple color schemes
- **StatusBadges** - SAFE/CLOSE/RISK indicators for trading states
- **PriceChange** - Color-coded price movement indicators

### Chat System
- **ChatInterface** - Complete AI agent chat with multiple layout variants
- **MessageBubble** - Themed message containers for user and agent messages
- **AgentAvatar** - Status-aware avatars with online/typing/offline states
- **TypingIndicator** - Animated typing states

### Theme System
- **ThemeToggle** - Persistent theme switching with system preference detection
- **Zeus Colors** - Complete Zeus design system integration
- **CSS Variables** - Semantic color system for consistent theming

## 🎨 Design System

### Typography Scale
```css
/* Caption Sizes */
caption-s: 10px / 14px / 600
caption-m: 12px / 16px / 500  
caption-l: 14px / 20px / 600

/* Body Sizes */
body-s: 16px / 24px / 500
body-m: 18px / 26px / 600
```

### Color System
- **Zeus Colors** - Complete dark theme palette from Figma
- **Sedona Brand** - Orange brand colors (#de7001)
- **Status Colors** - Success, warning, destructive, info states
- **Semantic Variables** - Theme-aware CSS custom properties

### Spacing Scale
```css
0: 0px, 1: 4px, 2: 8px, 3: 12px, 
4: 16px, 6: 24px, 8: 32px, 36: 144px
```

## 🌗 Theming

The theme system supports both light and dark modes with automatic persistence:

### Light Theme
- Clean white backgrounds
- Dark text for readability  
- Subtle borders and shadows
- Proper contrast ratios

### Dark Theme
- Zeus design system colors
- Rich dark backgrounds
- Optimized for trading interfaces
- Reduced eye strain

### Theme Toggle
```tsx
import { ThemeToggle } from "@/components/sedona/theme-toggle"

// Automatic system preference detection
// localStorage persistence
// Smooth transitions
<ThemeToggle />
```

## 🛠️ Development

### Project Structure
```
src/
├── components/
│   ├── ui/           # Core UI components
│   ├── chat/         # Chat system components
│   └── sedona/       # Sedona-specific components
├── lib/              # Utilities and helpers
└── app/              # Next.js app directory
```

### Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

### Component Development
```tsx
// Follow this pattern for new components
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

## 📱 Responsive Design

All components are built mobile-first with responsive breakpoints:

```css
sm: 640px   # Small tablets
md: 768px   # Tablets  
lg: 1024px  # Laptops
xl: 1280px  # Desktops
2xl: 1400px # Large screens
```

## ♿ Accessibility

- **Keyboard Navigation** - Full keyboard support for all interactive elements
- **Screen Reader Support** - Proper ARIA labels and semantic HTML
- **Focus Management** - Visible focus indicators and logical tab order
- **Color Contrast** - WCAG AA compliant contrast ratios
- **Motion Preferences** - Respects `prefers-reduced-motion`

## 🚀 Performance

- **Tree Shaking** - Import only the components you need
- **Code Splitting** - Automatic route-based code splitting with Next.js
- **Optimized Bundle** - Minimal runtime overhead
- **CSS-in-JS** - Compile-time style generation with Tailwind

## 🧪 Testing

```bash
# Run component tests
npm run test

# Run e2e tests  
npm run test:e2e

# Visual regression tests
npm run test:visual
```

## 📖 Documentation

Visit our [Storybook documentation](https://sedona-ui-storybook.vercel.app) for:
- Interactive component playground
- Design system guidelines  
- Usage examples
- Accessibility notes

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm run test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zeus Design System** - Comprehensive design tokens and patterns
- **shadcn/ui** - Excellent component architecture and patterns  
- **Radix UI** - Accessible primitive components
- **Tailwind CSS** - Utility-first CSS framework
- **Next.js** - React framework for production

## 📞 Support

- 📧 **Email**: support@sedona-ui.dev
- 💬 **Discord**: [Join our community](https://discord.gg/sedona-ui)
- 📖 **Documentation**: [docs.sedona-ui.dev](https://docs.sedona-ui.dev)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/sedona-ui/issues)

---

Built with ❤️ by the Sedona team