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
        sans: ["var(--font-geist-sans)", "Geist", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "Source Code Pro", "Fira Code", "ui-monospace", "monospace"],
        souvenir: ["Souvenir", "Georgia", "serif"],
        grotesk: ["Monument Grotesk", "Geist", "ui-sans-serif", "system-ui"],
      },
      fontWeight: {
        regular: '400',
        medium: '500', 
        semibold: '600',
        bold: '700',
      },
      fontSize: {
        // Sedona typography scale - Complete hierarchy
        // Captions
        'caption-s': ['10px', { lineHeight: '14px', letterSpacing: '0' }],
        'caption-m': ['12px', { lineHeight: '16px', letterSpacing: '0' }],
        'caption-l': ['14px', { lineHeight: '20px', letterSpacing: '-0.1px' }],
        // Body
        'body-s': ['16px', { lineHeight: '24px', letterSpacing: '-0.2px' }],
        'body-m': ['18px', { lineHeight: '26px', letterSpacing: '-0.2px' }],
        // Headings
        'heading-xs': ['18px', { lineHeight: '24px', letterSpacing: '-0.3px', fontWeight: '600' }],
        'heading-sm': ['20px', { lineHeight: '28px', letterSpacing: '-0.3px', fontWeight: '600' }],
        'heading-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.4px', fontWeight: '600' }],
        'heading-lg': ['30px', { lineHeight: '36px', letterSpacing: '-0.5px', fontWeight: '700' }],
        'heading-xl': ['36px', { lineHeight: '44px', letterSpacing: '-0.6px', fontWeight: '700' }],
        // Display (hero text)
        'display-sm': ['42px', { lineHeight: '48px', letterSpacing: '-0.8px', fontWeight: '700' }],
        'display-md': ['48px', { lineHeight: '56px', letterSpacing: '-1px', fontWeight: '700' }],
        'display-lg': ['60px', { lineHeight: '68px', letterSpacing: '-1.2px', fontWeight: '700' }],
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
          // Status colors (updated palette)
          "status-success": "#87d68a",
          "status-success-secondary": "#87d68a99",
          "status-success-subtle": "#1e2821",
          "status-warning": "#ffa55b",
          "status-warning-secondary": "#ffa55b99",
          "status-warning-subtle": "#2e2319",
          "status-destructive": "#e75d57",
          "status-destructive-secondary": "#e75d57b2",
          "status-destructive-subtle": "#2e1b19",
          "status-info": "#6b9dd0",
          "status-info-secondary": "#6b9dd099",
          "status-info-subtle": "#1e2228",
          // Highlight
          "highlight": "#f6e78a",
          "highlight-secondary": "#f6e78a99",
          "highlight-gold": "#ECD89B",
          "highlight-gold-secondary": "#ECD89B99",
          // Landing page surfaces
          "surface-nutshell": "#2A1610",
          // Special accents
          "accent-purple-new": "#aa97d3",
          "accent-cyan": "#81d9c3",
          "accent-pink-new": "#fd5a91",
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
          50: "#fef6ed",
          100: "#fde8d6",
          200: "#fbcdab",
          300: "#f8aa76",
          400: "#f4803e",
          500: "#D56B12", // Primary Sedona orange - warm, balanced
          600: "#c26012",
          700: "#a24d10",
          800: "#833f0e",
          900: "#6b340c",
          // Design system semantic colors
          primary: "#D56B12",
        },
        // 5-step color scales for design system
        neutral: {
          50: "#4a463d",   // lightest
          100: "#3e3a31",  // surface-neutral-subtle
          200: "#363229",  //
          300: "#2e2b24",  // surface-neutral
          400: "#262320",  //
          500: "#1e1c17",  // surface-elevated (default)
          600: "#1a1915",  //
          700: "#171512",  // dark
          800: "#141210",  //
          900: "#141310",  // surface-default
          950: "#0d0c0a",  // darkest
          DEFAULT: "#1e1c17",
        },
        success: {
          50: "#f0fdf4",   // lightest
          100: "#dcfce7",  // very light bg
          200: "#bbf7d0",  //
          300: "#86efac",  // light
          400: "#4ade80",  //
          500: "#22c55e",  // default
          600: "#16a34a",  //
          700: "#15803d",  // darker
          800: "#166534",  //
          900: "#14532d",  // darkest
          950: "#052e16",  // near black
          DEFAULT: "#22c55e",
          foreground: "#ffffff",
        },
        warning: {
          50: "#fefce8",   // lightest
          100: "#fef9c3",  // very light yellow
          200: "#fef08a",  //
          300: "#fde047",  // bright yellow
          400: "#facc15",  //
          500: "#eab308",  // yellow (default)
          600: "#ca8a04",  //
          700: "#a16207",  // amber
          800: "#854d0e",  //
          900: "#713f12",  // dark amber
          950: "#422006",  // near black
          DEFAULT: "#eab308",
          foreground: "#000000",
        },
        error: {
          50: "#fef2f2",   // lightest
          100: "#fee2e2",  // very light bg
          200: "#fecaca",  //
          300: "#fca5a5",  // light red
          400: "#f87171",  //
          500: "#ef4444",  // red (default)
          600: "#dc2626",  //
          700: "#b91c1c",  // darker
          800: "#991b1b",  //
          900: "#7f1d1d",  // darkest
          950: "#450a0a",  // near black
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        info: {
          50: "#eff6ff",   // lightest
          100: "#dbeafe",  // very light bg
          200: "#bfdbfe",  //
          300: "#93c5fd",  // light blue
          400: "#60a5fa",  //
          500: "#3b82f6",  // blue (default)
          600: "#2563eb",  //
          700: "#1d4ed8",  // darker
          800: "#1e40af",  //
          900: "#1e3a8a",  // darkest
          950: "#172554",  // near black
          DEFAULT: "#3b82f6",
          foreground: "#ffffff",
        },
        // Keep danger as alias for error
        danger: {
          DEFAULT: "#d9281c",
          foreground: "#ffffff",
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
        // Sedona spacing scale - Complete 4px grid system
        '0': '0',
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '3.5': '14px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
        '36': '144px',
        '40': '160px',
      },
      boxShadow: {
        // Sedona elevation system
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'DEFAULT': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        // Glow effects for interactive states
        'glow-sm': '0 0 10px 0 rgb(222 112 1 / 0.3)',
        'glow': '0 0 20px 0 rgb(222 112 1 / 0.4)',
        'glow-lg': '0 0 30px 0 rgb(222 112 1 / 0.5)',
        // Inset shadows
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'inner-lg': 'inset 0 4px 8px 0 rgb(0 0 0 / 0.1)',
        'none': 'none',
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
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee 20s linear infinite",
        "scan-x": "scan-x 1.5s ease-in-out infinite alternate",
        "scan-y": "scan-y 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 3s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config