// Simplified React to Figma component conversion
import componentData from './component-data.json';
import { VariableHelper } from './variable-helper';

export interface FigmaComponentConfig {
  name: string;
  variants: string[];
  states: string[];
  sizes: string[];
  hasProps: boolean;
}

export class ReactFigmaConverter {
  private tailwindConfig: any;
  private components: FigmaComponentConfig[];
  private textStyles: Map<string, TextStyle> = new Map();

  constructor() {
    this.tailwindConfig = (componentData as any).tailwindConfig;
    this.components = (componentData as any).components;
  }

  async createAllComponents(): Promise<ComponentSetNode[]> {
    console.log('🚀 Starting simplified component creation with variable linking...');
    
    // Initialize variable helper
    await VariableHelper.initialize();
    
    // Index text styles
    const allTextStyles = figma.getLocalTextStyles();
    for (const textStyle of allTextStyles) {
      this.textStyles.set(textStyle.name, textStyle);
    }
    console.log(`📊 Indexed ${this.textStyles.size} text styles`);
    
    console.log('Loading fonts...');
    
    // Load all required fonts
    const fontsToLoad = [
      { family: 'Inter', style: 'Regular' },
      { family: 'Inter', style: 'Medium' },
      { family: 'Inter', style: 'SemiBold' },
      { family: 'Inter', style: 'Bold' }
    ];
    
    for (const font of fontsToLoad) {
      try {
        await figma.loadFontAsync(font);
        console.log(`Loaded font: ${font.family} ${font.style}`);
      } catch (error) {
        console.warn(`Failed to load font ${font.family} ${font.style}:`, error);
        try {
          if (font.style === 'SemiBold') {
            await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
            console.log(`Using Medium as fallback for SemiBold`);
          } else {
            await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
            console.log(`Using Regular as fallback for ${font.style}`);
          }
        } catch (fallbackError) {
          console.warn(`Fallback font also failed, using default`);
        }
      }
    }
    
    const componentSets: ComponentSetNode[] = [];
    
    // Create a main components page
    let componentsPage = figma.root.children.find(page => page.name === 'Sedona Components') as PageNode;
    if (!componentsPage) {
      componentsPage = figma.createPage();
      componentsPage.name = 'Sedona Components';
    }
    
    figma.currentPage = componentsPage;
    
    // Clear existing content
    componentsPage.children.forEach(node => node.remove());
    
    let yOffset = 0;
    const sectionSpacing = 120;
    
    for (const component of this.components) {
      console.log(`Creating component set: ${component.name}`);
      
      const componentSet = await this.createComponentSet(component);
      if (componentSet) {
        componentSet.y = yOffset;
        componentSet.x = 0;
        yOffset += componentSet.height + sectionSpacing;
        componentSets.push(componentSet);
      }
    }
    
    return componentSets;
  }

  private async createComponentSet(config: FigmaComponentConfig): Promise<ComponentSetNode | null> {
    const { name, variants, states, sizes } = config;
    
    // Create component set
    const componentSet = (figma as any).createComponentSet ? (figma as any).createComponentSet() : figma.createFrame();
    componentSet.name = `Sedona/${name}`;
    
    let createdComponents = 0;
    
    // Create variants
    if (variants.length > 0) {
      for (const variant of variants) {
        if (sizes.length > 0) {
          for (const size of sizes) {
            const component = await this.createSingleComponent(name, { variant, size });
            if (component) {
              componentSet.appendChild(component);
              createdComponents++;
            }
          }
        } else {
          const component = await this.createSingleComponent(name, { variant });
          if (component) {
            componentSet.appendChild(component);
            createdComponents++;
          }
        }
      }
    } else {
      const component = await this.createSingleComponent(name, {});
      if (component) {
        componentSet.appendChild(component);
        createdComponents++;
      }
    }
    
    if (createdComponents === 0) {
      componentSet.remove();
      return null;
    }
    
    // Set up auto-layout for component set
    this.setupComponentSetLayout(componentSet);
    
    return componentSet;
  }

  private async createSingleComponent(
    componentName: string,
    properties: { variant?: string; size?: string; state?: string }
  ): Promise<ComponentNode | null> {
    const component = figma.createComponent();
    
    // Build component name with properties
    const nameParts: string[] = [];
    if (properties.variant) nameParts.push(`variant=${properties.variant}`);
    if (properties.size) nameParts.push(`size=${properties.size}`);
    if (properties.state) nameParts.push(`state=${properties.state}`);
    
    component.name = nameParts.length > 0 ? nameParts.join(', ') : 'default';
    
    // Create component based on type
    const componentFrame = await this.createComponentFrame(componentName, properties);
    if (!componentFrame) return null;
    
    component.appendChild(componentFrame);
    
    // Resize component to fit content
    component.resizeWithoutConstraints(componentFrame.width, componentFrame.height);
    
    return component;
  }

  private async createComponentFrame(
    componentName: string,
    properties: { variant?: string; size?: string; state?: string }
  ): Promise<FrameNode | null> {
    const lowerName = componentName.toLowerCase();
    
    switch (lowerName) {
      case 'button':
        return this.createButtonFrame(properties);
      case 'input':
        return this.createInputFrame(properties);
      case 'card':
        return this.createCardFrame(properties);
      case 'badge':
      case 'badgegroup':
        return this.createBadgeFrame(properties);
      case 'avatar':
      case 'agentavatar':
        return this.createAvatarFrame(properties);
      default:
        return this.createGenericFrame(componentName, properties);
    }
  }

  private createButtonFrame(properties: { variant?: string; size?: string; state?: string }): FrameNode {
    const frame = figma.createFrame();
    frame.name = 'Button';
    
    const variant = properties.variant || 'default';
    const size = properties.size || 'default';
    const state = properties.state;
    
    // Get dimensions
    const dimensions = this.getButtonDimensions(size);
    frame.resize(dimensions.width, dimensions.height);
    
    // Set background with variable linking if available
    const backgroundColor = this.getButtonBackgroundColor(variant);
    const opacity = state === 'disabled' ? 0.5 : 1;
    
    // Try to use variables for semantic colors
    const variableName = this.getSemanticVariableName(variant);
    if (VariableHelper.hasVariables() && variableName) {
      VariableHelper.applyVariableFill(frame, variableName, backgroundColor);
    } else {
      frame.fills = [{ type: 'SOLID' as const, color: backgroundColor, opacity }];
    }
    
    frame.cornerRadius = 8;
    
    // Add text
    const text = figma.createText();
    const textStyle = this.textStyles.get(this.getButtonTextStyleName(size));
    
    if (textStyle) {
      text.textStyleId = textStyle.id;
    } else {
      text.fontName = { family: 'Inter', style: 'Medium' };
      text.fontSize = this.getButtonFontSize(size);
    }
    
    text.characters = variant.charAt(0).toUpperCase() + variant.slice(1) + ' Button';
    
    // Set text color
    const textColor = this.getButtonTextColor(variant);
    text.fills = [{ type: 'SOLID' as const, color: textColor, opacity }];
    
    frame.appendChild(text);
    
    // Set up auto-layout
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    frame.paddingLeft = dimensions.paddingX;
    frame.paddingRight = dimensions.paddingX;
    frame.paddingTop = dimensions.paddingY;
    frame.paddingBottom = dimensions.paddingY;
    
    return frame;
  }

  private createInputFrame(properties: { variant?: string; size?: string; state?: string }): FrameNode {
    const frame = figma.createFrame();
    frame.name = 'Input';
    
    const variant = properties.variant || 'default';
    const size = properties.size || 'default';
    const state = properties.state;
    
    // Get dimensions based on size
    const dimensions = this.getInputDimensions(size);
    frame.resize(dimensions.width, dimensions.height);
    frame.cornerRadius = 8;
    
    // Set background and border with variables
    const surfaceColor = this.getZeusColor('surface-default');
    const borderColor = this.getInputBorderColor(variant, state);
    
    if (VariableHelper.hasVariables()) {
      VariableHelper.applyVariableFill(frame, 'semantic/surface-default', surfaceColor);
      VariableHelper.applyVariableStroke(frame, this.getInputBorderVariableName(variant, state), borderColor);
    } else {
      frame.fills = [{ type: 'SOLID' as const, color: surfaceColor }];
      frame.strokes = [{ type: 'SOLID' as const, color: borderColor }];
    }
    
    frame.strokeWeight = 1;
    
    // Add placeholder text
    const placeholder = figma.createText();
    const textStyleName = this.getInputTextStyleName(size);
    const textStyle = this.textStyles.get(textStyleName);
    
    if (textStyle) {
      placeholder.textStyleId = textStyle.id;
    } else {
      placeholder.fontName = { family: 'Inter', style: 'Regular' };
      placeholder.fontSize = this.getInputFontSize(size);
    }
    
    placeholder.characters = this.getInputPlaceholder(variant, state);
    placeholder.fills = [{ type: 'SOLID' as const, color: this.getZeusColor('text-tertiary') }];
    
    frame.appendChild(placeholder);
    
    // Auto-layout
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.paddingLeft = dimensions.paddingX;
    frame.paddingRight = dimensions.paddingX;
    
    return frame;
  }

  private createCardFrame(properties: { variant?: string; size?: string }): FrameNode {
    const frame = figma.createFrame();
    frame.name = 'Card';
    
    const variant = properties.variant || 'default';
    const size = properties.size || 'default';
    
    // Get dimensions based on size
    const dimensions = this.getCardDimensions(size);
    frame.resize(dimensions.width, dimensions.height);
    frame.cornerRadius = 12;
    
    // Set background based on variant
    const backgroundColor = this.getCardBackgroundColor(variant);
    const borderColor = this.getZeusColor('border-normal');
    
    if (variant === 'outline') {
      frame.fills = [];
      if (VariableHelper.hasVariables()) {
        VariableHelper.applyVariableStroke(frame, 'semantic/border-default', borderColor);
      } else {
        frame.strokes = [{ type: 'SOLID' as const, color: borderColor }];
      }
      frame.strokeWeight = 1;
    } else {
      if (VariableHelper.hasVariables()) {
        VariableHelper.applyVariableFill(frame, this.getCardBackgroundVariableName(variant), backgroundColor);
      } else {
        frame.fills = [{ type: 'SOLID' as const, color: backgroundColor }];
      }
      
      // Add subtle border for elevated cards
      if (variant === 'elevated') {
        if (VariableHelper.hasVariables()) {
          VariableHelper.applyVariableStroke(frame, 'semantic/border-default', borderColor);
        } else {
          frame.strokes = [{ type: 'SOLID' as const, color: borderColor, opacity: 0.1 }];
        }
        frame.strokeWeight = 1;
      }
    }
    
    // Add header
    const header = figma.createText();
    const headerStyle = this.textStyles.get('Body/Medium');
    
    if (headerStyle) {
      header.textStyleId = headerStyle.id;
    } else {
      try {
        header.fontName = { family: 'Inter', style: 'SemiBold' };
      } catch {
        header.fontName = { family: 'Inter', style: 'Medium' };
      }
      header.fontSize = 18;
    }
    
    header.characters = `${variant.charAt(0).toUpperCase() + variant.slice(1)} Card`;
    header.fills = [{ type: 'SOLID' as const, color: this.getZeusColor('text-primary') }];
    
    // Add content
    const content = figma.createText();
    const contentStyle = this.textStyles.get('Body/Small');
    
    if (contentStyle) {
      content.textStyleId = contentStyle.id;
    } else {
      content.fontName = { family: 'Inter', style: 'Regular' };
      content.fontSize = 14;
    }
    
    content.characters = 'Card content goes here. This is a description or body text.';
    content.fills = [{ type: 'SOLID' as const, color: this.getZeusColor('text-secondary') }];
    content.resize(dimensions.width - 32, 40);
    
    frame.appendChild(header);
    frame.appendChild(content);
    
    // Auto-layout
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.itemSpacing = 8;
    frame.paddingTop = 16;
    frame.paddingBottom = 16;
    frame.paddingLeft = 16;
    frame.paddingRight = 16;
    
    return frame;
  }

  private createBadgeFrame(properties: { variant?: string; size?: string }): FrameNode {
    const frame = figma.createFrame();
    frame.name = 'Badge';
    
    const variant = properties.variant || 'default';
    const size = properties.size || 'default';
    const badgeHeight = size === 'sm' ? 20 : size === 'lg' ? 32 : 24;
    
    frame.resize(80, badgeHeight);
    frame.cornerRadius = badgeHeight / 2;
    
    // Set background
    const backgroundColor = this.getBadgeBackgroundColor(variant);
    frame.fills = [{ type: 'SOLID' as const, color: backgroundColor }];
    
    // Add text
    const text = figma.createText();
    const textStyle = this.textStyles.get(this.getBadgeTextStyleName(size));
    
    if (textStyle) {
      text.textStyleId = textStyle.id;
    } else {
      text.fontName = { family: 'Inter', style: 'Medium' };
      text.fontSize = size === 'sm' ? 10 : size === 'lg' ? 14 : 12;
    }
    
    text.characters = variant.toUpperCase();
    text.fills = [{ type: 'SOLID' as const, color: this.getBadgeTextColor(variant) }];
    
    frame.appendChild(text);
    
    // Auto-layout
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    
    return frame;
  }

  private createAvatarFrame(properties: { size?: string }): FrameNode {
    const frame = figma.createFrame();
    frame.name = 'Avatar';
    
    const size = this.getAvatarSize(properties.size || 'md');
    frame.resize(size, size);
    frame.cornerRadius = size / 2;
    
    // Set background and border
    if (VariableHelper.hasVariables()) {
      VariableHelper.applyVariableFill(frame, 'semantic/surface-elevated', this.getZeusColor('surface-neutral'));
      VariableHelper.applyVariableStroke(frame, 'semantic/border-default', this.getZeusColor('border-normal'));
    } else {
      frame.fills = [{ type: 'SOLID' as const, color: this.getZeusColor('surface-neutral') }];
      frame.strokes = [{ type: 'SOLID' as const, color: this.getZeusColor('border-normal') }];
    }
    frame.strokeWeight = 1;
    
    // Add initials
    const text = figma.createText();
    const textStyle = this.textStyles.get(this.getAvatarTextStyleName(properties.size || 'md'));
    
    if (textStyle) {
      text.textStyleId = textStyle.id;
    } else {
      text.fontName = { family: 'Inter', style: 'Medium' };
      text.fontSize = size * 0.4;
    }
    
    text.characters = 'SU';
    text.fills = [{ type: 'SOLID' as const, color: this.getZeusColor('text-primary') }];
    
    frame.appendChild(text);
    
    // Auto-layout
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    
    return frame;
  }

  private createGenericFrame(componentName: string, properties: { variant?: string; size?: string }): FrameNode {
    const frame = figma.createFrame();
    frame.name = componentName;
    
    frame.resize(200, 60);
    frame.cornerRadius = 8;
    
    // Set background
    if (VariableHelper.hasVariables()) {
      VariableHelper.applyVariableFill(frame, 'semantic/surface-elevated', this.getZeusColor('surface-neutral'));
    } else {
      frame.fills = [{ type: 'SOLID' as const, color: this.getZeusColor('surface-neutral') }];
    }
    
    // Add text
    const text = figma.createText();
    const textStyle = this.textStyles.get('Caption/Large');
    
    if (textStyle) {
      text.textStyleId = textStyle.id;
    } else {
      text.fontName = { family: 'Inter', style: 'Medium' };
      text.fontSize = 14;
    }
    
    text.characters = `${componentName} - ${properties.variant || 'default'}`;
    text.fills = [{ type: 'SOLID' as const, color: this.getZeusColor('text-primary') }];
    
    frame.appendChild(text);
    
    // Auto-layout
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    frame.paddingLeft = 16;
    frame.paddingRight = 16;
    frame.paddingTop = 8;
    frame.paddingBottom = 8;
    
    return frame;
  }

  // Helper methods
  private getButtonDimensions(size: string) {
    switch (size) {
      case 'xs': return { width: 60, height: 28, paddingX: 8, paddingY: 4 };
      case 'sm': return { width: 80, height: 32, paddingX: 12, paddingY: 6 };
      case 'lg': return { width: 140, height: 48, paddingX: 20, paddingY: 12 };
      case 'icon': return { width: 32, height: 32, paddingX: 8, paddingY: 8 };
      default: return { width: 120, height: 40, paddingX: 16, paddingY: 8 };
    }
  }

  private getButtonFontSize(size: string): number {
    switch (size) {
      case 'xs': return 10;
      case 'sm': return 12;
      case 'lg': return 16;
      case 'icon': return 12;
      default: return 14;
    }
  }

  private getButtonBackgroundColor(variant: string): RGB {
    switch (variant) {
      case 'brand': return this.getSedonaColor(500);
      case 'secondary': return this.getZeusColor('surface-neutral');
      case 'destructive': case 'risk': return this.getZeusColor('accent-red');
      case 'safe': return this.getZeusColor('accent-green');
      case 'close': return this.getZeusColor('accent-orange');
      case 'outline': case 'ghost': case 'link': return { r: 0, g: 0, b: 0 };
      default: return { r: 0.2, g: 0.2, b: 0.2 };
    }
  }

  private getButtonTextColor(variant: string): RGB {
    switch (variant) {
      case 'outline': case 'ghost': return this.getZeusColor('text-primary');
      case 'link': return this.getSedonaColor(500);
      default: return { r: 1, g: 1, b: 1 };
    }
  }

  private getBadgeBackgroundColor(variant: string): RGB {
    switch (variant) {
      case 'success': case 'safe': return this.getZeusColor('badge-success');
      case 'warning': case 'close': return this.getZeusColor('badge-warning');
      case 'danger': case 'destructive': case 'risk': return this.getZeusColor('badge-destructive');
      case 'info': return this.getZeusColor('badge-info');
      case 'brand': return this.getZeusColor('badge-neutral');
      case 'outline': return { r: 0, g: 0, b: 0 };
      default: return this.getZeusColor('badge-neutral');
    }
  }

  private getBadgeTextColor(variant: string): RGB {
    switch (variant) {
      case 'success': case 'safe': return this.getZeusColor('accent-green');
      case 'warning': case 'close': return this.getZeusColor('accent-orange');
      case 'danger': case 'destructive': case 'risk': return this.getZeusColor('accent-red');
      case 'info': return this.getZeusColor('accent-blue');
      case 'brand': return this.getSedonaColor(500);
      default: return this.getZeusColor('text-primary');
    }
  }

  private getSemanticVariableName(variant: string): string | null {
    switch (variant) {
      case 'brand': return 'brand/primary';
      case 'secondary': return 'semantic/surface-elevated';
      case 'destructive': case 'risk': return 'semantic/error';
      case 'safe': return 'semantic/success';
      case 'close': return 'semantic/warning';
      default: return 'semantic/surface-elevated';
    }
  }

  private getButtonTextStyleName(size: string): string {
    switch (size) {
      case 'xs': return 'Caption/Small';
      case 'sm': return 'Caption/Medium';
      case 'lg': return 'Body/Medium';
      default: return 'Caption/Large';
    }
  }

  private getBadgeTextStyleName(size: string): string {
    switch (size) {
      case 'sm': return 'Caption/Small';
      case 'lg': return 'Caption/Large';
      default: return 'Caption/Medium';
    }
  }

  private getAvatarTextStyleName(size: string): string {
    switch (size) {
      case 'sm': return 'Caption/Small';
      case 'lg': return 'Body/Small';
      case 'xl': return 'Body/Medium';
      default: return 'Caption/Large';
    }
  }

  private getAvatarSize(size: string): number {
    switch (size) {
      case 'sm': return 32;
      case 'lg': return 56;
      case 'xl': return 72;
      default: return 40;
    }
  }

  private getInputDimensions(size: string) {
    switch (size) {
      case 'sm': return { width: 200, height: 36, paddingX: 10 };
      case 'lg': return { width: 300, height: 52, paddingX: 16 };
      default: return { width: 240, height: 44, paddingX: 12 };
    }
  }

  private getInputFontSize(size: string): number {
    switch (size) {
      case 'sm': return 12;
      case 'lg': return 16;
      default: return 14;
    }
  }

  private getInputTextStyleName(size: string): string {
    switch (size) {
      case 'sm': return 'Caption/Medium';
      case 'lg': return 'Body/Medium';
      default: return 'Body/Small';
    }
  }

  private getInputBorderVariableName(variant?: string, state?: string): string {
    if (variant === 'error') return 'semantic/error';
    if (variant === 'success') return 'semantic/success';
    if (state === 'focused') return 'brand/primary';
    return 'semantic/border-default';
  }

  private getCardDimensions(size: string) {
    switch (size) {
      case 'sm': return { width: 240, height: 160 };
      case 'lg': return { width: 400, height: 280 };
      default: return { width: 300, height: 200 };
    }
  }

  private getCardBackgroundColor(variant: string): RGB {
    switch (variant) {
      case 'elevated': return this.getZeusColor('surface-neutral-subtle');
      case 'outline': return { r: 0, g: 0, b: 0 }; // Transparent
      default: return this.getZeusColor('surface-neutral');
    }
  }

  private getCardBackgroundVariableName(variant: string): string {
    switch (variant) {
      case 'elevated': return 'semantic/surface-elevated';
      case 'outline': return 'semantic/surface-default';
      default: return 'semantic/surface-default';
    }
  }

  private getInputBorderColor(variant?: string, state?: string): RGB {
    if (variant === 'error') return { r: 0.9, g: 0.28, b: 0.24 };
    if (variant === 'success') return { r: 0.13, g: 0.65, b: 0.37 };
    if (state === 'focused') return this.getSedonaColor(500);
    return this.getZeusColor('border-normal');
  }

  private getInputPlaceholder(variant?: string, state?: string): string {
    if (state === 'disabled') return 'Disabled input';
    if (variant === 'error') return 'Error state';
    if (variant === 'success') return 'Success state';
    return 'Placeholder text';
  }

  private getZeusColor(colorName: string): RGB {
    const zeusColors = this.tailwindConfig.colors?.zeus || {};
    const colorValue = zeusColors[colorName];
    
    if (colorValue) {
      return this.hexToRgb(colorValue) || { r: 1, g: 1, b: 1 };
    }
    
    // Fallback colors
    const fallbacks: Record<string, RGB> = {
      'surface-default': { r: 0.12, g: 0.11, b: 0.09 },
      'surface-neutral': { r: 0.18, g: 0.17, b: 0.14 },
      'text-primary': { r: 1, g: 1, b: 1 },
      'text-secondary': { r: 1, g: 1, b: 1 },
      'text-tertiary': { r: 1, g: 1, b: 1 },
      'border-normal': { r: 1, g: 1, b: 1 },
      'accent-red': { r: 0.85, g: 0.16, b: 0.11 },
      'accent-orange': { r: 0.98, g: 0.59, b: 0.02 },
      'accent-green': { r: 0.13, g: 0.65, b: 0.37 },
      'accent-blue': { r: 0.22, g: 0.5, b: 0.7 },
      'badge-success': { r: 0.12, g: 0.16, b: 0.13 },
      'badge-warning': { r: 0.18, g: 0.14, b: 0.10 },
      'badge-destructive': { r: 0.18, g: 0.11, b: 0.10 },
      'badge-info': { r: 0.12, g: 0.13, b: 0.16 },
      'badge-neutral': { r: 0.18, g: 0.17, b: 0.14 }
    };
    
    return fallbacks[colorName] || { r: 0.5, g: 0.5, b: 0.5 };
  }

  private getSedonaColor(shade: number): RGB {
    const sedonaColors = this.tailwindConfig.colors?.sedona || {};
    const colorValue = sedonaColors[shade.toString()];
    
    if (colorValue) {
      return this.hexToRgb(colorValue) || { r: 0.87, g: 0.44, b: 0.01 };
    }
    
    return { r: 0.87, g: 0.44, b: 0.01 };
  }

  private hexToRgb(hex: string): RGB | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : null;
  }

  private setupComponentSetLayout(componentSet: ComponentSetNode): void {
    componentSet.layoutMode = 'HORIZONTAL';
    componentSet.primaryAxisSizingMode = 'AUTO';
    componentSet.counterAxisSizingMode = 'AUTO';
    componentSet.itemSpacing = 24;
    componentSet.paddingTop = 32;
    componentSet.paddingBottom = 32;
    componentSet.paddingLeft = 32;
    componentSet.paddingRight = 32;
    
    // Wrap to multiple rows if too many variants
    const children = componentSet.children as ComponentNode[];
    if (children.length > 6) {
      componentSet.layoutMode = 'VERTICAL';
      componentSet.itemSpacing = 16;
    }
  }
}