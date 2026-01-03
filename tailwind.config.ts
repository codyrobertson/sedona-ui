import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "Source Code Pro", "Fira Code", "ui-monospace", "monospace"],
      },
      fontWeight: {
        regular: '400',
        medium: '500', 
        semibold: '600',
        bold: '700',
      },
      fontSize: {
        // Sedona typography scale
        'caption-s': ['10px', { lineHeight: '14px', letterSpacing: '0' }],
        'caption-m': ['12px', { lineHeight: '16px', letterSpacing: '0' }],
        'caption-l': ['14px', { lineHeight: '20px', letterSpacing: '-0.1px' }],
        'body-s': ['16px', { lineHeight: '24px', letterSpacing: '-0.2px' }],
        'body-m': ['18px', { lineHeight: '26px', letterSpacing: '-0.2px' }],
      },
      colors: {
        // Zeus color system - COMPLETE palette from Figma
        zeus: {
          // Surface colors
          "surface-default": "#141310",
          "surface-elevated": "#1e1c17",
          "surface-neutral": "#2e2b24",
          "surface-neutral-subtle": "#3e3a31",
          "surface-warning": "#2e2319",
          "surface-warning-accent": "#fb9704",
          "surface-destructive": "#2e1b19",
          "surface-destructive-accent": "#ea1e04",
          "surface-info": "#1e2228",
          "surface-info-accent": "#397fb2",
          "surface-success": "#1e2821",
          "surface-success-accent": "#21a65e",
          // Text colors (complete set)
          "text-primary": "#ffffff",
          "text-secondary": "#ffffff99", // 60% opacity
          "text-tertiary": "#ffffff75", // 46% opacity
          "text-quaternary": "#ffffff40", // 25% opacity
          "text-inverted": "#1e1c17",
          "text-inverted-secondary": "#1e1c1799", // 60% opacity
          "text-disabled": "#ffffff1a", // 10% opacity
          // Icon colors (complete set)
          "icon-primary": "#ffffff",
          "icon-secondary": "#ffffff99", // 60% opacity
          "icon-tertiary": "#ffffff75", // 46% opacity
          "icon-inverted": "#1e1c17",
          "icon-disabled": "#ffffff1a", // 10% opacity
          // Border colors (complete set)
          "border-normal": "#ffffff2e", // 18% opacity
          "border-alpha": "#ffffff24", // 14% opacity  
          "border-divider": "#ffffff24", // 14% opacity
          "border-neutral-subtle": "#ffffff3d", // 24% opacity
          "border-surface": "#1e1c17",
          "border-focused": "#ffffff4d", // 30% opacity
          "border-disabled": "#ffffff0d", // 5% opacity
          // Button backgrounds (complete set)
          "button-secondary": "#2e2b24",
          "button-tertiary": "#ffffff14", // 8% opacity
          "button-ghost": "#ffffff00", // transparent
          "button-disabled": "#ffffff0d", // 5% opacity
          // Badge/accent backgrounds
          "badge-surface": "#1f2228",
          "badge-neutral": "#2e2b24",
          "badge-warning": "#2e2319",
          "badge-destructive": "#2e1b19",
          "badge-info": "#1e2228",
          "badge-success": "#1e2821",
          // Accent colors (complete set)
          "accent-red": "#d9281c",
          "accent-red-secondary": "#ffffff80",
          "accent-red-accent": "#e6483d",
          "accent-red-subtle": "#2e1b19",
          "accent-orange": "#fb9704",
          "accent-orange-secondary": "#ffffff80",
          "accent-orange-subtle": "#2e2319",
          "accent-yellow": "#fdd835",
          "accent-yellow-secondary": "#ffffff80",
          "accent-yellow-subtle": "#2e2b19",
          "accent-green": "#21a65e",
          "accent-green-secondary": "#ffffff80",
          "accent-green-accent": "#26bd6c",
          "accent-green-subtle": "#1e2821",
          "accent-blue": "#397fb2",
          "accent-blue-secondary": "#ffffff80",
          "accent-blue-accent": "#4778f5",
          "accent-blue-subtle": "#1e2228",
          "accent-purple": "#8b5cf6",
          "accent-purple-secondary": "#ffffff80",
          "accent-purple-subtle": "#251e2e",
          "accent-pink": "#ec4899",
          "accent-pink-secondary": "#ffffff80",
          "accent-pink-subtle": "#2e1e28",
          "accent-gray": "#6b7280",
          "accent-gray-secondary": "#ffffff80",
          "accent-gray-subtle": "#1f2228",
          // Status colors (complete set)
          "status-success": "#339965",
          "status-success-secondary": "#33996599",
          "status-success-subtle": "#1e2821",
          "status-warning": "#f48e2f",
          "status-warning-secondary": "#f48e2f99",
          "status-warning-subtle": "#2e2319",
          "status-destructive": "#e6483d",
          "status-destructive-secondary": "#e6483db2",
          "status-destructive-subtle": "#2e1b19",
          "status-info": "#397fb2",
          "status-info-secondary": "#397fb299",
          "status-info-subtle": "#1e2228",
          // Overlay colors
          "overlay-light": "#ffffff0d", // 5% opacity
          "overlay-medium": "#ffffff1a", // 10% opacity
          "overlay-heavy": "#ffffff40", // 25% opacity
          "overlay-backdrop": "#000000b3", // 70% black
          // Gradient colors
          "gradient-start": "#1e1c17",
          "gradient-middle": "#2e2b24",
          "gradient-end": "#3e3a31",
        },
        // Sedona design system colors from Figma
        sedona: {
          50: "#fef7ed",
          100: "#fdead5", 
          200: "#fbd1aa",
          300: "#f7b174",
          400: "#f2883c",
          500: "#de7001", // Primary Sedona orange
          600: "#c25e00",
          700: "#a14800", 
          800: "#833b02",
          900: "#6c3108",
          // Design system semantic colors
          primary: "#de7001",
        },
        // Button colors from design tokens  
        'button-secondary': "#14151a", 
        'button-tertiary': "rgba(10, 15, 41, 0.04)", // From Figma exactly
        'button-ghost': "transparent",
        // Status colors from design
        success: {
          DEFAULT: "#10b981",
          foreground: "#065f46",
        },
        warning: {
          DEFAULT: "#f59e0b", 
          foreground: "#92400e",
        },
        danger: {
          DEFAULT: "#e6483d", // From Figma disconnect button
          foreground: "#991b1b",
        },
        // Semantic colors using CSS variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Button-specific theme colors
        'button-primary': {
          DEFAULT: "hsl(var(--button-primary-bg))",
          foreground: "hsl(var(--button-primary-text))",
        },
        'button-brand': {
          foreground: "hsl(var(--button-brand-text))",
        },
        'button-danger': {
          foreground: "hsl(var(--button-danger-text))",
        },
      },
      spacing: {
        // Sedona spacing scale from design tokens
        '0': '0',
        '1': '4px',
        '2': '8px', 
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '36': '144px',
      },
      borderRadius: {
        none: '0',
        xs: '4px',
        sm: '4px',
        md: '8px', 
        lg: 'var(--radius)',
        xl: '10px', // Sedona button radius
        full: '999px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-33.33%)" },
        },
        "scan-x": {
          "0%": { left: "0%" },
          "100%": { left: "100%" },
        },
        "scan-y": {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee 20s linear infinite",
        "scan-x": "scan-x 1.5s ease-in-out infinite alternate",
        "scan-y": "scan-y 2s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config