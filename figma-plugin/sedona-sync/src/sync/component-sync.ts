// React component to Figma component synchronization
import * as React from 'react';
import { render } from 'react-figma';

export async function createFigmaComponents(componentConfig: any) {
  const { name, variants, states, sizes, props } = componentConfig;
  
  console.log(`Creating Figma component: ${name}`);
  
  // Create a component set for all variants
  const componentSet = (figma as any).createComponentSet ? (figma as any).createComponentSet() : figma.createFrame();
  componentSet.name = `Sedona/${name}`;
  
  let xOffset = 0;
  let yOffset = 0;
  const componentWidth = 160;
  const componentHeight = 80;
  const spacing = 24;
  const maxColumns = 4;
  let currentColumn = 0;
  
  // Create base component structure based on component type
  switch (name.toLowerCase()) {
    case 'button':
      await createButtonComponents(componentSet, variants, states, sizes);
      break;
    case 'input':
      await createInputComponents(componentSet, variants, states);
      break;
    case 'card':
      await createCardComponents(componentSet, variants);
      break;
    case 'badge':
      await createBadgeComponents(componentSet, variants);
      break;
    case 'avatar':
      await createAvatarComponents(componentSet, sizes);
      break;
    default:
      await createGenericComponent(componentSet, name, variants);
  }
  
  // Set up auto-layout
  componentSet.layoutMode = 'HORIZONTAL';
  componentSet.primaryAxisSizingMode = 'AUTO';
  componentSet.counterAxisSizingMode = 'AUTO';
  componentSet.itemSpacing = spacing;
  componentSet.paddingTop = 32;
  componentSet.paddingBottom = 32;
  componentSet.paddingLeft = 32;
  componentSet.paddingRight = 32;
  
  return componentSet;
}

async function createButtonComponents(
  componentSet: ComponentSetNode,
  variants: string[] = ['primary', 'secondary', 'tertiary', 'ghost'],
  states: string[] = ['default', 'hover', 'pressed', 'disabled'],
  sizes: string[] = ['sm', 'md', 'lg']
) {
  console.log('Creating button components...');
  
  for (const variant of variants) {
    for (const state of states) {
      for (const size of sizes) {
        const component = figma.createComponent();
        component.name = `variant=${variant}, state=${state}, size=${size}`;
        
        // Create button frame
        const buttonFrame = figma.createFrame();
        buttonFrame.name = 'Button';
        
        // Set size based on size variant
        const dimensions = getButtonDimensions(size);
        buttonFrame.resize(dimensions.width, dimensions.height);
        
        // Set background based on variant and state
        const fills = getButtonFills(variant, state);
        buttonFrame.fills = fills;
        
        // Set border radius
        buttonFrame.cornerRadius = 8;
        
        // Add text
        const text = figma.createText();
        text.characters = `${variant.charAt(0).toUpperCase() + variant.slice(1)} Button`;
        text.fontSize = getButtonFontSize(size);
        text.fontName = { family: 'Inter', style: 'Medium' };
        
        // Set text color based on variant
        text.fills = getButtonTextFills(variant, state);
        
        // Center text
        text.textAlignHorizontal = 'CENTER';
        text.textAlignVertical = 'CENTER';
        text.resize(dimensions.width - 24, dimensions.height);
        text.x = 12;
        text.y = 0;
        
        buttonFrame.appendChild(text);
        component.appendChild(buttonFrame);
        
        // Auto-layout
        buttonFrame.layoutMode = 'HORIZONTAL';
        buttonFrame.primaryAxisAlignItems = 'CENTER';
        buttonFrame.counterAxisAlignItems = 'CENTER';
        buttonFrame.paddingLeft = 16;
        buttonFrame.paddingRight = 16;
        
        componentSet.appendChild(component);
      }
    }
  }
}

async function createInputComponents(
  componentSet: ComponentSetNode,
  variants: string[] = ['default', 'error', 'success'],
  states: string[] = ['default', 'focused', 'disabled']
) {
  console.log('Creating input components...');
  
  for (const variant of variants) {
    for (const state of states) {
      const component = figma.createComponent();
      component.name = `variant=${variant}, state=${state}`;
      
      // Create input frame
      const inputFrame = figma.createFrame();
      inputFrame.name = 'Input';
      inputFrame.resize(240, 44);
      
      // Set background
      inputFrame.fills = [{ type: 'SOLID' as const, color: { r: 0.18, g: 0.17, b: 0.15 } }];
      
      // Set border based on variant and state
      const strokes = getInputStrokes(variant, state);
      inputFrame.strokes = strokes;
      inputFrame.strokeWeight = 1;
      inputFrame.cornerRadius = 8;
      
      // Add placeholder text
      const text = figma.createText();
      text.characters = state === 'disabled' ? 'Disabled input' : 'Placeholder text';
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Regular' };
      text.fills = [{ 
        type: 'SOLID' as const, 
        color: state === 'disabled' 
          ? { r: 1, g: 1, b: 1 }
          : { r: 1, g: 1, b: 1 }
      }];
      
      text.x = 12;
      text.y = 15;
      
      inputFrame.appendChild(text);
      component.appendChild(inputFrame);
      
      // Auto-layout
      inputFrame.layoutMode = 'HORIZONTAL';
      inputFrame.primaryAxisAlignItems = 'CENTER';
      inputFrame.paddingLeft = 12;
      inputFrame.paddingRight = 12;
      
      componentSet.appendChild(component);
    }
  }
}

async function createCardComponents(
  componentSet: ComponentSetNode,
  variants: string[] = ['default', 'outline']
) {
  console.log('Creating card components...');
  
  for (const variant of variants) {
    const component = figma.createComponent();
    component.name = `variant=${variant}`;
    
    // Create card frame
    const cardFrame = figma.createFrame();
    cardFrame.name = 'Card';
    cardFrame.resize(280, 180);
    
    // Set background and border based on variant
    if (variant === 'outline') {
      cardFrame.fills = [];
      cardFrame.strokes = [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1 } }];
      cardFrame.strokeWeight = 1;
    } else {
      cardFrame.fills = [{ type: 'SOLID' as const, color: { r: 0.18, g: 0.17, b: 0.15 } }];
    }
    
    cardFrame.cornerRadius = 12;
    
    // Add content
    const title = figma.createText();
    title.characters = 'Card Title';
    title.fontSize = 18;
    title.fontName = { family: 'Inter', style: 'Semibold' };
    title.fills = [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1 } }];
    
    const description = figma.createText();
    description.characters = 'This is a card description that explains the content or purpose of this card component.';
    description.fontSize = 14;
    description.fontName = { family: 'Inter', style: 'Regular' };
    description.fills = [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1 } }];
    description.resize(248, 40);
    
    title.x = 16;
    title.y = 16;
    description.x = 16;
    description.y = 48;
    
    cardFrame.appendChild(title);
    cardFrame.appendChild(description);
    component.appendChild(cardFrame);
    
    // Auto-layout
    cardFrame.layoutMode = 'VERTICAL';
    cardFrame.primaryAxisSizingMode = 'AUTO';
    cardFrame.counterAxisSizingMode = 'FIXED';
    cardFrame.itemSpacing = 8;
    cardFrame.paddingTop = 16;
    cardFrame.paddingBottom = 16;
    cardFrame.paddingLeft = 16;
    cardFrame.paddingRight = 16;
    
    componentSet.appendChild(component);
  }
}

async function createBadgeComponents(
  componentSet: ComponentSetNode,
  variants: string[] = ['default', 'success', 'warning', 'destructive']
) {
  console.log('Creating badge components...');
  
  for (const variant of variants) {
    const component = figma.createComponent();
    component.name = `variant=${variant}`;
    
    // Create badge frame
    const badgeFrame = figma.createFrame();
    badgeFrame.name = 'Badge';
    
    // Set background based on variant
    const fills = getBadgeFills(variant);
    badgeFrame.fills = fills;
    badgeFrame.cornerRadius = 6;
    
    // Add text
    const text = figma.createText();
    text.characters = variant.charAt(0).toUpperCase() + variant.slice(1);
    text.fontSize = 12;
    text.fontName = { family: 'Inter', style: 'Medium' };
    
    // Set text color based on variant
    text.fills = getBadgeTextFills(variant);
    
    badgeFrame.appendChild(text);
    component.appendChild(badgeFrame);
    
    // Auto-layout
    badgeFrame.layoutMode = 'HORIZONTAL';
    badgeFrame.primaryAxisAlignItems = 'CENTER';
    badgeFrame.counterAxisAlignItems = 'CENTER';
    badgeFrame.primaryAxisSizingMode = 'AUTO';
    badgeFrame.counterAxisSizingMode = 'AUTO';
    badgeFrame.paddingTop = 4;
    badgeFrame.paddingBottom = 4;
    badgeFrame.paddingLeft = 8;
    badgeFrame.paddingRight = 8;
    
    componentSet.appendChild(component);
  }
}

async function createAvatarComponents(
  componentSet: ComponentSetNode,
  sizes: string[] = ['sm', 'md', 'lg']
) {
  console.log('Creating avatar components...');
  
  for (const size of sizes) {
    const component = figma.createComponent();
    component.name = `size=${size}`;
    
    // Get avatar dimensions
    const dimension = getAvatarSize(size);
    
    // Create avatar ellipse
    const avatar = figma.createEllipse();
    avatar.name = 'Avatar';
    avatar.resize(dimension, dimension);
    
    // Set background
    avatar.fills = [{ type: 'SOLID' as const, color: { r: 0.87, g: 0.44, b: 0.01 } }]; // Sedona primary
    
    // Add initials
    const initials = figma.createText();
    initials.characters = 'SU';
    initials.fontSize = Math.floor(dimension * 0.4);
    initials.fontName = { family: 'Inter', style: 'Medium' };
    initials.fills = [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1 } }];
    
    // Center initials
    initials.textAlignHorizontal = 'CENTER';
    initials.textAlignVertical = 'CENTER';
    initials.resize(dimension, dimension);
    
    // Note: Can't appendChild to EllipseNode, use positioning instead
    initials.x = (dimension - initials.width) / 2;
    initials.y = (dimension - initials.height) / 2;
    component.appendChild(avatar);
    
    componentSet.appendChild(component);
  }
}

async function createGenericComponent(
  componentSet: ComponentSetNode,
  name: string,
  variants: string[] = ['default']
) {
  console.log(`Creating generic component: ${name}...`);
  
  for (const variant of variants) {
    const component = figma.createComponent();
    component.name = `variant=${variant}`;
    
    // Create generic frame
    const frame = figma.createFrame();
    frame.name = name;
    frame.resize(160, 60);
    frame.fills = [{ type: 'SOLID' as const, color: { r: 0.18, g: 0.17, b: 0.15 } }];
    frame.cornerRadius = 8;
    
    // Add label
    const label = figma.createText();
    label.characters = `${name} - ${variant}`;
    label.fontSize = 14;
    label.fontName = { family: 'Inter', style: 'Medium' };
    label.fills = [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1 } }];
    
    label.textAlignHorizontal = 'CENTER';
    label.textAlignVertical = 'CENTER';
    label.resize(160, 60);
    
    frame.appendChild(label);
    component.appendChild(frame);
    
    componentSet.appendChild(component);
  }
}

// Utility functions
function getButtonDimensions(size: string) {
  switch (size) {
    case 'sm':
      return { width: 80, height: 32 };
    case 'lg':
      return { width: 140, height: 48 };
    default: // 'md'
      return { width: 120, height: 40 };
  }
}

function getButtonFontSize(size: string) {
  switch (size) {
    case 'sm':
      return 12;
    case 'lg':
      return 16;
    default: // 'md'
      return 14;
  }
}

function getButtonFills(variant: string, state: string) {
  const opacity = state === 'disabled' ? 0.5 : 1;
  
  switch (variant) {
    case 'default':
      return [{ type: 'SOLID' as const, color: { r: 0.2, g: 0.2, b: 0.2, a: opacity } }]; // Dark gray for light mode
    case 'brand':
      return [{ type: 'SOLID' as const, color: { r: 0.87, g: 0.44, b: 0.01, a: opacity } }]; // Sedona orange #de7001
    case 'secondary':
      return [{ type: 'SOLID' as const, color: { r: 0.18, g: 0.17, b: 0.15, a: opacity } }]; // Zeus surface-neutral #2e2b24
    case 'destructive':
      return [{ type: 'SOLID' as const, color: { r: 0.9, g: 0.28, b: 0.24, a: opacity } }]; // Zeus status-destructive #e6483d
    case 'safe':
      return [{ type: 'SOLID' as const, color: { r: 0.2, g: 0.6, b: 0.37, a: opacity } }]; // Zeus status-success #339965
    case 'close':
      return [{ type: 'SOLID' as const, color: { r: 0.98, g: 0.59, b: 0.02, a: opacity } }]; // Zeus accent-orange #fb9704
    case 'risk':
      return [{ type: 'SOLID' as const, color: { r: 0.9, g: 0.28, b: 0.24, a: opacity } }]; // Zeus status-destructive #e6483d
    case 'outline':
      return [{ type: 'SOLID' as const, color: { r: 0, g: 0, b: 0, a: 0 } }]; // Transparent background
    case 'ghost':
      return [{ type: 'SOLID' as const, color: { r: 0, g: 0, b: 0, a: 0 } }]; // Transparent
    case 'link':
      return [{ type: 'SOLID' as const, color: { r: 0, g: 0, b: 0, a: 0 } }]; // Transparent
    default:
      return [{ type: 'SOLID' as const, color: { r: 0.2, g: 0.2, b: 0.2, a: opacity } }];
  }
}

function getButtonTextFills(variant: string, state: string) {
  const opacity = state === 'disabled' ? 0.5 : 1;
  
  switch (variant) {
    case 'default':
      return [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1, a: opacity } }]; // White text
    case 'brand':
    case 'safe':
    case 'close':
    case 'risk':
    case 'destructive':
      return [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1, a: opacity } }]; // White text
    case 'secondary':
      return [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1, a: opacity } }]; // Zeus text-primary
    case 'outline':
    case 'ghost':
      return [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1, a: opacity } }]; // Zeus text-primary
    case 'link':
      return [{ type: 'SOLID' as const, color: { r: 0.87, g: 0.44, b: 0.01, a: opacity } }]; // Sedona brand color
    default:
      return [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1, a: opacity } }];
  }
}

function getInputStrokes(variant: string, state: string) {
  switch (variant) {
    case 'error':
      return [{ type: 'SOLID' as const, color: { r: 0.9, g: 0.28, b: 0.24 } }]; // Red
    case 'success':
      return [{ type: 'SOLID' as const, color: { r: 0.13, g: 0.65, b: 0.37 } }]; // Green
    default:
      if (state === 'focused') {
        return [{ type: 'SOLID' as const, color: { r: 0.87, g: 0.44, b: 0.01 } }]; // Sedona orange
      }
      return [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1 } }]; // Normal border
  }
}

function getBadgeFills(variant: string) {
  switch (variant) {
    case 'default':
      return [{ type: 'SOLID' as const, color: { r: 0.18, g: 0.17, b: 0.15 } }]; // Zeus surface-neutral #2e2b24
    case 'success':
    case 'safe':
      return [{ type: 'SOLID' as const, color: { r: 0.12, g: 0.16, b: 0.13 } }]; // Zeus badge-success #1e2821
    case 'warning':
    case 'close':
      return [{ type: 'SOLID' as const, color: { r: 0.18, g: 0.14, b: 0.10 } }]; // Zeus badge-warning #2e2319
    case 'danger':
    case 'destructive':
    case 'risk':
      return [{ type: 'SOLID' as const, color: { r: 0.18, g: 0.11, b: 0.10 } }]; // Zeus badge-destructive #2e1b19
    case 'info':
      return [{ type: 'SOLID' as const, color: { r: 0.12, g: 0.13, b: 0.16 } }]; // Zeus badge-info #1e2228
    case 'secondary':
      return [{ type: 'SOLID' as const, color: { r: 0.18, g: 0.17, b: 0.15 } }]; // Zeus surface-neutral
    case 'brand':
      return [{ type: 'SOLID' as const, color: { r: 0.18, g: 0.17, b: 0.15 } }]; // Zeus surface with brand accent
    case 'outline':
      return [{ type: 'SOLID' as const, color: { r: 0, g: 0, b: 0, a: 0 } }]; // Transparent
    default:
      return [{ type: 'SOLID' as const, color: { r: 0.18, g: 0.17, b: 0.15 } }]; // Zeus surface
  }
}

function getBadgeTextFills(variant: string) {
  switch (variant) {
    case 'default':
      return [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1 } }]; // Zeus text-primary white
    case 'success':
    case 'safe':
      return [{ type: 'SOLID' as const, color: { r: 0.13, g: 0.65, b: 0.37 } }]; // Zeus status-success #339965
    case 'warning':
    case 'close':
      return [{ type: 'SOLID' as const, color: { r: 0.96, g: 0.56, b: 0.18 } }]; // Zeus status-warning #f48e2f
    case 'danger':
    case 'destructive':
    case 'risk':
      return [{ type: 'SOLID' as const, color: { r: 0.9, g: 0.28, b: 0.24 } }]; // Zeus status-destructive #e6483d
    case 'info':
      return [{ type: 'SOLID' as const, color: { r: 0.22, g: 0.5, b: 0.7 } }]; // Zeus status-info #397fb2
    case 'secondary':
      return [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1 } }]; // Zeus text-primary
    case 'brand':
      return [{ type: 'SOLID' as const, color: { r: 0.87, g: 0.44, b: 0.01 } }]; // Sedona brand #de7001
    case 'outline':
      return [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1 } }]; // Zeus text-primary
    default:
      return [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1 } }]; // White
  }
}

function getAvatarSize(size: string) {
  switch (size) {
    case 'sm':
      return 32;
    case 'lg':
      return 56;
    default: // 'md'
      return 40;
  }
}