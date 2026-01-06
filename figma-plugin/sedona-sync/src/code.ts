// Figma plugin code that runs in the main thread
import { createVariablesFromTailwind, syncComponentsToFigma, createVariablesFromTailwindTokensOnly, createTextStylesFromVariables } from './sync/tailwind-sync';
import { createFigmaComponents } from './sync/component-sync';
import { ReactFigmaConverter } from './react-to-figma-simple';
import { getTailwindConfig } from './tailwind-reader';

// Show the plugin UI
figma.showUI(__html__, { 
  width: 400, 
  height: 600,
  title: 'Sedona Sync'
});

// Handle messages from the UI
figma.ui.onmessage = async (msg) => {
  console.log('Received message:', msg);

  try {
    switch (msg.type) {
      case 'get-tailwind-config':
        // Send the actual Tailwind config to the UI
        const tailwindConfig = getTailwindConfig();
        figma.ui.postMessage({
          type: 'tailwind-config',
          config: tailwindConfig
        });
        break;

      case 'sync-tokens':
        await syncTokens();
        figma.ui.postMessage({ 
          type: 'sync-complete', 
          success: true, 
          message: 'Design tokens synced successfully!' 
        });
        break;

      case 'sync-styles':
        await syncStyles();
        figma.ui.postMessage({ 
          type: 'sync-complete', 
          success: true, 
          message: 'Text styles created successfully!' 
        });
        break;

      case 'sync-components':
        await syncComponents(msg.components);
        figma.ui.postMessage({ 
          type: 'sync-complete', 
          success: true, 
          message: 'Components synced successfully!' 
        });
        break;

      case 'create-design-system':
        await createDesignSystem(msg.config);
        figma.ui.postMessage({ 
          type: 'sync-complete', 
          success: true, 
          message: 'Design system created successfully!' 
        });
        break;

      case 'close':
        figma.closePlugin();
        break;

      default:
        console.log('Unknown message type:', msg.type);
    }
  } catch (error: any) {
    console.error('Plugin error:', error);
    figma.ui.postMessage({ 
      type: 'sync-complete', 
      success: false, 
      message: `Error: ${error.message}` 
    });
  }
};

async function syncTokens() {
  console.log('Syncing design tokens...');
  
  // Load required fonts first
  await loadRequiredFonts();
  
  // Create or get the design tokens collection
  let collection = figma.variables.getLocalVariableCollections().find(
    col => col.name === 'Sedona Design Tokens'
  );
  
  if (!collection) {
    collection = figma.variables.createVariableCollection('Sedona Design Tokens');
  } else {
    // Clear existing variables to avoid duplicates
    console.log('Clearing existing variables to avoid duplicates...');
    const existingVariables = figma.variables.getLocalVariables();
    const collectionVariables = existingVariables.filter(variable => variable.variableCollectionId === collection!.id);
    
    console.log(`Found ${collectionVariables.length} existing variables to remove`);
    collectionVariables.forEach(variable => {
      try {
        variable.remove();
      } catch (error: any) {
        console.warn(`Could not remove variable ${variable.name}:`, error.message);
      }
    });
  }

  // Add modes for light/dark themes
  const modes = collection.modes;
  let lightMode = modes.find(mode => mode.name === 'Light');
  let darkMode = modes.find(mode => mode.name === 'Dark');
  
  if (!lightMode) {
    lightMode = collection.modes[0];
    collection.renameMode(lightMode.modeId, 'Light');
  }
  
  if (!darkMode) {
    const newModeId = collection.addMode('Dark');
    darkMode = collection.modes.find(mode => mode.modeId === newModeId);
  }

  // Get Tailwind config and create variables (excluding text styles)
  const tailwindConfig = getTailwindConfig();
  await createVariablesFromTailwindTokensOnly(collection, tailwindConfig);
  
  console.log('Design tokens synced successfully');
}

async function syncStyles() {
  console.log('Creating text styles...');
  
  // Load required fonts first
  await loadRequiredFonts();
  
  // Find the design tokens collection
  const collection = figma.variables.getLocalVariableCollections().find(
    col => col.name === 'Sedona Design Tokens'
  );
  
  if (!collection) {
    throw new Error('Design tokens must be synced first! Please run "Sync Tokens" before creating styles.');
  }

  // Create text styles using the variables
  await createTextStylesFromVariables(collection);
  
  console.log('Text styles created successfully');
}

async function syncComponents(components: any[]) {
  console.log('Syncing components...');
  
  // Use the advanced React to Figma converter
  const converter = new ReactFigmaConverter();
  await converter.createAllComponents();
  
  console.log('Components synced successfully');
}

async function createDesignSystem(config: any) {
  console.log('Creating design system...');
  
  // Load required fonts
  await loadRequiredFonts();
  
  // First sync tokens
  await syncTokens();
  
  // Then sync components
  await syncComponents(config.components);
  
  // Create a cover page
  let coverPage = figma.root.children.find(page => page.name === 'Sedona Design System');
  if (!coverPage) {
    coverPage = figma.createPage();
    coverPage.name = 'Sedona Design System';
    figma.root.insertChild(0, coverPage);
  }

  figma.currentPage = coverPage as PageNode;
  
  // Clear existing content
  coverPage.children.forEach(node => node.remove());
  
  // Create title
  const title = figma.createText();
  title.characters = 'Sedona UI Design System';
  title.fontSize = 48;
  title.fontName = { family: 'Inter', style: 'Bold' };
  title.fills = [{ type: 'SOLID' as const, color: { r: 0.87, g: 0.44, b: 0.01 } }]; // Sedona orange
  title.x = 100;
  title.y = 100;
  
  // Create description
  const description = figma.createText();
  description.characters = 'Production-ready UI components built with React, Tailwind CSS, and Zeus design system.\nOptimized for AI agent trading platforms.';
  description.fontSize = 16;
  description.fontName = { family: 'Inter', style: 'Regular' };
  description.fills = [{ type: 'SOLID' as const, color: { r: 1, g: 1, b: 1 }, opacity: 0.75 }];
  description.resize(600, 50);
  description.x = 100;
  description.y = 180;
  
  console.log('Design system created successfully');
}

async function loadRequiredFonts() {
  console.log('Loading required fonts...');
  
  const fontsToLoad = [
    { family: 'Inter', style: 'Regular' },
    { family: 'Inter', style: 'Medium' },
    { family: 'Inter', style: 'Semibold' },
    { family: 'Inter', style: 'Bold' }
  ];
  
  for (const font of fontsToLoad) {
    try {
      await figma.loadFontAsync(font);
      console.log(`Loaded font: ${font.family} ${font.style}`);
    } catch (error) {
      console.warn(`Failed to load font ${font.family} ${font.style}:`, error);
      // Try fallback font
      try {
        await figma.loadFontAsync({ family: 'Roboto', style: font.style });
      } catch (fallbackError) {
        console.warn(`Fallback font also failed, using system default`);
      }
    }
  }
}

// Initialize plugin
console.log('Sedona Sync plugin initialized');