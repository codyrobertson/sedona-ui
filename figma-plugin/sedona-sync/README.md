# Sedona Sync - Figma Plugin

Seamlessly sync your React components and Tailwind CSS variables with Figma design tokens.

## 🚀 Features

- **🎨 Design Token Sync**: Convert all Tailwind CSS variables to Figma design tokens
- **🧩 Component Sync**: Transform React components into Figma components with proper variants
- **⚡ Zeus Color System**: Full support for 140+ Zeus design system colors  
- **🔧 Auto-Layout**: Components use Figma's auto-layout for responsive behavior
- **📝 Proper Naming**: Components follow Figma naming conventions with variants
- **🎯 Type Safety**: Built with TypeScript for robust development

## 🛠 Installation

### 1. Build the Plugin

```bash
cd figma-plugin/sedona-sync
npm install
npm run build
```

### 2. Install in Figma

1. Open Figma
2. Go to **Menu > Plugins > Development > Import plugin from manifest...**
3. Select the `manifest.json` file from this directory
4. The plugin will now be available in your Plugins menu

## 📖 Usage

### Quick Start

1. **Run Component Analysis** (optional but recommended):
   ```bash
   npm run analyze-components
   ```

2. **Open the Plugin**: 
   - In Figma: **Menu > Plugins > Development > Sedona Sync**

3. **Choose Sync Option**:
   - **Sync Design Tokens**: Creates Figma variables from Tailwind config
   - **Sync Components**: Creates Figma components from React components  
   - **Create Full Design System**: Does both + creates documentation pages

### Sync Options

#### 🎨 Design Token Sync
- Creates `Sedona Design Tokens` variable collection
- Supports Light/Dark modes
- Syncs:
  - Zeus colors (140+ semantic colors)
  - Sedona brand colors
  - Typography scale
  - Spacing values
  - Border radius variants

#### 🧩 Component Sync  
- Creates `Sedona Components` page
- Generates component sets with variants
- Supports:
  - Button variants (primary, secondary, tertiary, ghost)
  - Input states (default, focused, error, success, disabled)
  - Card types (default, outline)
  - Badge variants (default, success, warning, destructive)
  - Avatar sizes (sm, md, lg)
  - All other detected components

#### 🚀 Full Design System
- Creates comprehensive design system
- Includes cover page with branding
- Organizes components by category
- Sets up proper documentation structure

## 🎯 Component Support

The plugin automatically detects and converts these component types:

| Component | Variants | States | Sizes |
|-----------|----------|---------|--------|
| Button | primary, secondary, tertiary, ghost | default, hover, pressed, disabled | sm, md, lg |
| Input | default, error, success | default, focused, disabled | - |
| Card | default, outline | default | - |
| Badge | default, success, warning, destructive | default | - |
| Avatar | default | default | sm, md, lg |
| Select | default | default, focused, disabled | - |
| Checkbox | default | default, checked | - |
| Progress | default | default | - |
| Separator | default | default | - |
| Tooltip | default | default | - |

## 🔧 Development

### Project Structure

```
figma-plugin/sedona-sync/
├── manifest.json           # Figma plugin manifest
├── src/
│   ├── code.ts            # Main plugin logic
│   ├── ui.html            # Plugin UI
│   ├── component-data.json # Component definitions
│   ├── react-to-figma.ts  # React → Figma converter
│   └── sync/
│       ├── tailwind-sync.ts    # Tailwind → Figma variables
│       └── component-sync.ts   # Component utilities
├── package.json
├── webpack.config.js
└── tsconfig.json
```

### Build Commands

```bash
# Development build with watch
npm run dev

# Production build
npm run build

# Build with file watching
npm run build:watch
```

### Adding New Components

1. **Add to `component-data.json`**:
   ```json
   {
     "name": "NewComponent",
     "variants": ["variant1", "variant2"],
     "states": ["default", "hover"],
     "sizes": ["sm", "md", "lg"],
     "hasProps": true
   }
   ```

2. **Add converter in `react-to-figma.ts`**:
   ```typescript
   case 'newcomponent':
     return this.createNewComponentFrame(properties);
   ```

3. **Implement the frame creator**:
   ```typescript
   private createNewComponentFrame(properties: {...}): FrameNode {
     // Component creation logic
   }
   ```

## 🎨 Design System Integration

### Zeus Color System
The plugin fully supports the Zeus design system with 140+ semantic colors:
- Surface colors (default, neutral, subtle)
- Text colors (primary, secondary, tertiary, quaternary)
- Icon colors with proper opacity
- Border colors (normal, alpha, divider)
- Button backgrounds (secondary, tertiary, ghost)
- Badge/accent backgrounds
- Status colors (success, warning, destructive, info)

### Tailwind Integration
Automatically syncs these Tailwind configuration sections:
- `colors` → Figma color variables
- `fontSize` → Figma typography variables  
- `spacing` → Figma spacing variables
- `borderRadius` → Figma radius variables

## 📚 Examples

### Button Component Output
```
Sedona/Button
├── variant=primary, size=sm
├── variant=primary, size=md  
├── variant=primary, size=lg
├── variant=secondary, size=sm
├── variant=secondary, size=md
├── variant=secondary, size=lg
└── ...
```

### Variable Collection Output
```
Sedona Design Tokens
├── Colors/
│   ├── zeus/surface-default
│   ├── zeus/text-primary
│   ├── sedona/500
│   └── ...
├── Typography/
│   ├── size/caption-s
│   ├── line-height/caption-s
│   └── ...
└── Spacing/
    ├── spacing/1 (4px)
    ├── spacing/2 (8px)  
    └── ...
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test with the plugin
5. Submit a pull request

## 📄 License

MIT License - see the full project LICENSE file.

## 🆘 Support

- **Issues**: Report bugs or request features in the main repository
- **Documentation**: Check the main Sedona UI documentation
- **Community**: Join our Discord for support and discussions

---

**Built with ❤️ by the Sedona Team**